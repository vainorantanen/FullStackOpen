import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());

app.use(cors());

import diagnoseRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);

app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
