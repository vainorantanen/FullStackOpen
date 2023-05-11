import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
    const { height, weight} = _req.query;

    if (!height || !weight) {
        res.status(400).send({ error: "missing parameters" });
        return;
      }

    const h = Number(height);
    const w = Number(weight);

    if (isNaN(h) || isNaN(w)) {
        res.status(400).send({ error: "malformatted parameters" });
        return;
      }

    const obj = {
            "weight": w,
            "height": h,
            "bmi": calculateBmi(h, w)
    };

    res.send(obj);
});

app.post('/exercises', (req, res) => {
  //sconsole.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { daily_exercises, target } = req.body;

if (!daily_exercises || !target ) {
  return res.status(400).send({ error: 'missing parameters' });
}

if ( daily_exercises.some(isNaN)  || isNaN(Number(target)) ) {
  return res.status(400).send({ error: "malformatted parameters"});
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const result = calculateExercises(daily_exercises, target);
return res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});