import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import bodyParser from 'body-parser';
import cors from 'cors';

// Import routes from compiled JavaScript files
import backendRoutes from './dist/backend/database.js'; // Adjust the path if needed

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();

  // Use body-parser and cors
  app.use(bodyParser.json());
  app.use(cors());

  // Serve the backend API
  app.use('/api', backendRoutes);

  if (process.env.NODE_ENV === 'production') {
    const staticMiddleware = express.static(path.resolve(__dirname, 'dist'));
    app.use(staticMiddleware);

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: 'html' },
    });

    app.use(vite.middlewares);
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    if (process.env.NODE_ENV === 'production') {
      const open = require('open');
      open(`http://localhost:${port}`);
    }
  });
}

startServer();
