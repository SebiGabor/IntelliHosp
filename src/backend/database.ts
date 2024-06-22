import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import pkg from 'pg';
import generator from 'generate-password';
import nodemailer from 'nodemailer';
import loggedInData from './logged-in-data.js';
import multer from 'multer';

dotenv.config();

const app = express();
const { Pool } = pkg;
const upload = multer({
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

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

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

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
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/personnel-login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT "IDspital", "Parola" FROM public.ih_personnel WHERE "Username" = $1', [username]);
    client.release();

    if (result.rows.length === 0) {
      console.log(`Username not found: ${username}`);
      res.status(401).json({ error: "Username not found" });
      return;
    }

    const personnel = result.rows[0];
    if (personnel.Parola !== password) {
      console.log(`Incorrect password for username: ${username}`);
      res.status(401).json({ error: "Incorrect password" });
      return;
    }

    const clientHosp = await pool.connect();
    const result2Hosp = await client.query('SELECT "Nume" FROM public.ih_hospitals WHERE "ID" = $1', [personnel.IDspital]);
    clientHosp.release();

    const hospital = result2Hosp.rows[0];

    loggedInData.setHospitalName(hospital.Nume);
    loggedInData.setHospitalID(personnel.IDspital);

    res.status(200).json({ hospitalName: hospital.Nume });
    return;
  } catch (err: any) {
    console.error("Error executing query:", (err as Error).message, (err as Error).stack);
    res.status(500).json({ error: "Internal error", details: (err as Error).message });
    return;
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

app.get('/get-patients', async (_req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT "ID", "Nume", "CNP" FROM public.ih_patients WHERE "IDspital" = $1', [loggedInData.getHospitalID()]);
    client.release();
    res.status(200).json(result.rows);
    return;
  } catch (err: any) {
    console.error('Error fetching personnel data:', err.message);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
    return;
  }
});

app.post('/personnel-add-patient', async (req, res) => {
  const { nume, cnp } = req.body;

  if (!nume || !cnp) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const client = await pool.connect();

    const selectQuery = 'SELECT "TextBoxes" FROM public.ih_hospitals WHERE "ID" = $1';
    const selectResult = await client.query(selectQuery, [loggedInData.getHospitalID()]);

    if (selectResult.rows.length === 0) {
      throw new Error('No hospital found with the given ID');
    }

    let textBoxes = {};
    if (selectResult.rows[0].TextBoxes) {
      textBoxes = selectResult.rows[0].TextBoxes;
    }

    const insertQuery = 'INSERT INTO public.ih_patients ("IDspital", "Nume", "CNP", "TextFields") VALUES ($1, $2, $3, $4)';
    const result = await client.query(insertQuery, [loggedInData.getHospitalID(), nume, cnp, JSON.stringify(textBoxes)]);
    client.release();

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error executing query: ", (err as Error).message, (err as Error).stack);
    res.status(500).json({ error: "Internal error", details: (err as Error).message });
  }
});

app.post('/admin-add-personnel', async (req, res) => {
  const { calificare, nume, prenume, email } = req.body;

  if (!calificare || !nume || !prenume || !email) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const client = await pool.connect();
    const extractedNume = nume.split(/[ \-]/)[0].toLowerCase();
    const extractedPrenume = prenume.split(/[ \-]/)[0].toLowerCase();

    let username = `${extractedPrenume}.${extractedNume}_${loggedInData.getHospitalID()}`;
    let counter = 1;

    while (true) {
      const usernameCheckQuery = 'SELECT COUNT(*) FROM public.ih_personnel WHERE "Username" = $1';
      const { rows } = await client.query(usernameCheckQuery, [username]);

      if (parseInt(rows[0].count) === 0) {
        break;
      }

      username = `${extractedPrenume}.${extractedNume}${counter}_${loggedInData.getHospitalID()}`;
      counter++;
    }

    const password = generator.generate({
      length: 12,
      numbers: true
    });

    const insertQuery = 'INSERT INTO public.ih_personnel ("IDspital", "Calificare", "Prenume", "Nume", "Username", "Email", "Parola") VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const result = await client.query(insertQuery, [loggedInData.getHospitalID(), calificare, prenume, nume, username, email, password]);
    client.release();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirmare înregistrare în IntelliHosp',
      text: `Bine ați venit în aplicația IntelliHosp!\n\n Ați fost adăugat în aplicația IntelliHosp ca făcând parte din ${loggedInData.getHospitalName()}\n\n Credențialele dumneavoastră de logare pentru sunt:\nUsername: ${username}\nParolă: ${password}\n\nVă mulțumim pentru alegerea făcută!`,
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

app.post('/save-config', upload.single('pdfFile'), async (req, res) => {
  try {
    const { pdfBytes, textBoxes } = req.body;

    if (!pdfBytes || !Array.isArray(pdfBytes)) {
      return res.status(400).json({ error: 'pdfBytes is required and must be an array' });
    }
    if (!textBoxes || !Array.isArray(textBoxes)) {
      return res.status(400).json({ error: 'textBoxes is required and must be an array' });
    }

    const hospitalID = loggedInData.getHospitalID();
    const pdfContent = Buffer.from(pdfBytes);
    const textBoxesJson = JSON.stringify(textBoxes);

    const query = 'UPDATE public.ih_hospitals SET "PDF" = $1, "TextBoxes" = $2 WHERE "ID" = $3';
    await pool.query(query, [pdfContent, textBoxesJson, hospitalID]);

    res.sendStatus(200);
    return;
  } catch (error) {
    console.error('Error saving configuration:', error);
    res.sendStatus(500);
    return;
  }
});

app.post('/fetch-config', async (_req, res) => {
  try {
    const query = 'SELECT encode("PDF", \'base64\') as pdf_content, "TextBoxes" as saved_text_boxes FROM public.ih_hospitals WHERE "ID" = $1 ORDER BY "ID" DESC LIMIT 1';
    const result = await pool.query(query, [loggedInData.getHospitalID()]);

    if (result.rows.length > 0) {
      const { pdf_content, saved_text_boxes } = result.rows[0];
      res.json({ pdf_content, saved_text_boxes });
    } else {
      res.status(404).json({ error: 'Configuration not found' });
    }
  } catch (err) {
    console.error('Error fetching configuration:', err);
    res.sendStatus(500);
  }
});

app.post('/fetch-patient-paln', async(_req, res) => {
  try {
    const query = 'SELECT encode("PDF", \'base64\') as pdf_content FROM public.ih_hospitals WHERE "ID" = $1 ORDER BY "ID" DESC LIMIT 1';
    const result = await pool.query(query, [loggedInData.getHospitalID()]);

    const query2 = 'SELECT "TextFields" FROM public.ih_patients WHERE "IDspital" = $1';
    const result2 = await pool.query(query2, [loggedInData.getHospitalID()]);

    if (result.rows.length > 0 && result2.rows.length > 0) {
      const pdf_content = result.rows[0].pdf_content;
      const saved_text_boxes = result2.rows[0].TextFields;

      res.json({ pdf_content, saved_text_boxes });
    } else {
      res.status(404).json({ error: 'Configuration not found' });
    }
  } catch (err) {
    console.error('Error fetching configuration:', err);
    res.sendStatus(500);
  }
});


app.post('/update-patient-plan', async (req, res) => {
  try {
    const { patientID, textBoxes } = req.body;

    if (!patientID || !textBoxes) {
      return res.status(400).json({ error: 'patientID and textBoxes are required' });
    }

    const query = 'UPDATE public.ih_patients SET "TextFields" = $1 WHERE "ID" = $2';
    await pool.query(query, [JSON.stringify(textBoxes), patientID]);

    res.sendStatus(200);
    return;
  } catch (error) {
    console.error('Error updating patient plan:', error);
    res.sendStatus(500);
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
