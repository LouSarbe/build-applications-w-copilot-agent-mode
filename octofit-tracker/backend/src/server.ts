import express from 'express';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use('/api', apiRouter);

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(400).json({ error: 'Request could not be completed' });
});

app.listen(port, '0.0.0.0', async () => {
  console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
  try { await connectDatabase(); } catch (error) { console.error('Database unavailable:', error); }
});
