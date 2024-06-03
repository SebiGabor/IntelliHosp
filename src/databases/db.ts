import pkg from 'pg';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';

const { Pool } = pkg;

dotenv.config();

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

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://white-grass-078bf751e.5.azurestaticapps.net'];

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

const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  secureConnection: false,
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    ciphers:'SSLv3'
  }
});

app.get('/get-hospital', async (_req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM ih_hospitals');
    const results = { 'results': (result) ? result.rows : null};
    client.release();
    res.json(results);
  } catch (err) {
    console.error("Error executing querry: ", err);
    res.status(500).json({error: "Internal error"});
  }
});

app.post('/add-hospital', async (req, res) => {
  const { hospitalName, county, adminEmail, adminPassword } = req.body;

  if (!hospitalName || !county || !adminEmail || !adminPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const client = await pool.connect();
    const queryText = 'INSERT INTO public.ih_hospitals ("Nume", "Judet", "AdminEmail", "AdminPassword") VALUES ($1, $2, $3, $4)';
    const result = await client.query(queryText, [hospitalName, county, adminEmail, adminPassword]);
    client.release();



    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: 'Hospital Registration Confirmation',
      text: `Dear ${hospitalName},\n\nYour hospital has been successfully registered.\n\nRegards,\nTeam`,
    };

    transporter.sendMail(mailOptions, (error: any, info: { response: string; }) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json(result.rows[0]);
    return;
  } catch (err) {
    console.error("Error executing query: ", (err as Error).message, (err as Error).stack);
    res.status(500).json({ error: "Internal error", details: (err as Error).message });
    return;
  }
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});

export { pool };
