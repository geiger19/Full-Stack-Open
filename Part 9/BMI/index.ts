import express = require("express");
const app = express();
import { isArray, isNumber } from 'lodash';
import {calculateBMI} from './calculateBmi';
import {calculateExercises} from './exerciseCalculator';

app.use(express.json());

  app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
  });

  app.get('/bmi', (_req, res) => {
    const { height, weight } = _req.query;
    if (isNaN(Number(height)) || isNaN(Number(weight)) ){
      res.send(
        {
          error: "malformatted parameters"
        }
      ); 
    }
    const bmiMessage = calculateBMI(Number(height), Number(weight));
    res.send({height, weight, bmiMessage});
  });

  app.post('/exercises', (_req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target}: any  = _req.body;
    if (!isArray(daily_exercises)){
      return res.json(
        {
          error: "malformatted parameters"
        }
      );   
    }
    if (!isNumber(target)){
      return res.json(
        {
          error: "malformatted parameters"
        }
      );   
    }
    console.log("hello");
    //eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const calcMessage = calculateExercises(daily_exercises, Number(target));
    return res.json({calcMessage});
  });

  const PORT = 3003;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
