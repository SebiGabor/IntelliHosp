import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import pkg from 'pg';
import generator from 'generate-password';
import nodemailer from 'nodemailer';
import loggedInData from './logged-in-data.js';

dotenv.config();

const app = express();
const { Pool } = pkg;

const allowedOrigins = ['http://localhost:5173', 'https://white-grass-078bf751e.5.azurestaticapps.net'];

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const DB_PORT = process.env.DB_PORT || 5432;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(DB_PORT),
  ssl: true
});

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(bodyParser.json());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  secureConnection: false,
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

app.post('/add-hospital', async (req, res) => {
  const { hospitalName, county, adminEmail } = req.body;

  if (!hospitalName || !county || !adminEmail) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const client = await pool.connect();
    const { rows } = await client.query("SELECT nextval('public.ih_hospitals_id_seq');");
    const sequenceValue = rows[0].nextval;
    const username = `admin_${sequenceValue}`;
    const password = generator.generate({
      length: 12,
      numbers: true
    });

    const insertQuery = 'INSERT INTO public.ih_hospitals ("Nume", "Judet", "AdminEmail", "AdminUsername", "AdminPassword") VALUES ($1, $2, $3, $4, $5)';
    const result = await client.query(insertQuery, [hospitalName, county, adminEmail, username, password]);
    client.release();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: 'Confirmare înregistrare spital - IntelliHosp',
      text: `Bine ați venit în aplicația IntelliHosp!\n\n Credențialele de logare pentru ${hospitalName} sunt:\nUsername: ${username}\nParolă: ${password}\n\nVă mulțumim pentru alegerea făcută!`,
    };

    transporter.sendMail(mailOptions, (error: any, info: { response: string; }) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error("Error executing query: ", err.message, err.stack);
    res.status(500).json({ error: "Internal error", details: err.message });
  }
});

app.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT "ID", "Nume", "AdminPassword" FROM public.ih_hospitals WHERE "AdminUsername" = $1', [username]);
    client.release();

    if (result.rows.length === 0) {
      console.log(`Username not found: ${username}`);
      res.status(401).json({ error: "Username not found" });
      return;
    }

    const hospital = result.rows[0];
    if (hospital.AdminPassword !== password) {
      console.log(`Incorrect password for username: ${username}`);
      res.status(401).json({ error: "Incorrect password" });
      return;
    }

    loggedInData.setHospitalName(hospital.Nume);
    loggedInData.setHospitalID(hospital.ID);

    res.status(200).json({ hospitalName: hospital.Nume });
    return;
  } catch (err: any) {
    console.error("Error executing query:", (err as Error).message, (err as Error).stack);
    res.status(500).json({ error: "Internal error", details: (err as Error).message });
    return;
  }
});

app.get('/get-personnel', async (_req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT "Calificare", "Nume", "Prenume", "Email" FROM public.ih_personnel WHERE "IDspital" = $1', [loggedInData.getHospitalID()]);
    client.release();
    res.status(200).json(result.rows);
    return;
  } catch (err: any) {
    console.error('Error fetching personnel data:', err.message);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
    return;
  }
});


app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Logout failed');
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
    return res.status(200).send('Logged out');
  });
});

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    res.redirect('/');
    res.status(401).send('Unauthorized');
    return;
  }
}

app.use('/protected', isAuthenticated, (_req, res) => {
  res.send('This is a protected route');
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});

export default app;
