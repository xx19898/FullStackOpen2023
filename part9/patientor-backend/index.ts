import express, { Express, } from 'express';
import patientsData, { Patient } from './data/patients';
const app: Express = express();
const cors = require('cors');
import bodyParser from 'body-parser'
app.use(cors());
app.use(bodyParser.json())
const port = 3000;

 app.get('/ping', (req, res) => {
    return res.json({'ping':'ping'})
});

type PatientWithOutSSN = Omit<Patient, "ssn">
app.get('/api/patients',(req,res) => {
  const soughtData:PatientWithOutSSN[] = patientsData

  return res.json([...soughtData])
})


app.listen(port, () => {
    console.log(`Exercises app listening on port ${port}`);
  });