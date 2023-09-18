/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express, { Express, } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app: Express = express();
const cors = require('cors');
import bodyParser from 'body-parser';
app.use(cors());
app.use(bodyParser.json());
const port = 3000;

 app.get('/exercise', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if(!req.body.target || !req.body.data){
        return res.status(400).json({ error: 'params missing'});
    }
    if(isNaN(Number(req.body.target))){
        return res.status(400).json({ error: 'malformatted params'});
    }
    else{
        const target = Number(req.body.target);
        const dataNum = req.body.data;
        const dataNumChecked = dataNum.map((data: any) => {
            if(isNaN(Number(data))){
                res.status(400).json({error: 'malformatted params'});
            }
            return Number(data);
        });
        const result = calculateExercises(target,dataNumChecked);
        return res.json({result});
        }
});

app.get('/bmi', (req, res) => {

    if(
        isNaN(Number(req.query.weight)) ||
        !req.query.weight ||
        isNaN(Number(req.query.height)) ||
        !req.query.height){
            return res.status(400).json({ error: 'malformatted params'});

    }else{
        const weight = Number(req.query.weight);
        const height = Number(req.query.height);
        const bmiResponse = calculateBmi(height ,weight);
        return res.json({bmiResponse});
    }
});

app.listen(port, () => {
  console.log(`Exercises app listening on port ${port}`);
});