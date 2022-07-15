import express from 'express';
import _ from 'lodash';
import {calculateBMI} from './calculateBmi'
const app = express();

  app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
  });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


  app.get('/bmi', (_req, res) => {
    const { height, weight } = _req.query;
    if (isNaN(Number(height)) || isNaN(Number(weight)) ){
      res.send(
        {
          error: "malformatted parameters"
        }
      )  
    }
    let bmiMessage = calculateBMI(Number(height), Number(weight))
    res.send({height, weight, bmiMessage});
  })


  const PORTBMI = 3002;

app.listen(PORTBMI, () => {
  console.log(`Server running on port ${PORT}`);
});