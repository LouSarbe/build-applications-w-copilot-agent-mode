import express from 'express';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use('/api', apiRouter);

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(400).json({ error: 'Request could not be completed' });
});

app.listen(port, async () => {
  console.log(`OctoFit Tracker API listening on port ${port}`);
  try { await connectDatabase(); } catch (error) { console.error('Database unavailable:', error); }
});
