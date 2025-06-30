
import express from 'express';
import cors from 'cors';
import { tasksRouter } from './tasks';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use('/tasks', tasksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
