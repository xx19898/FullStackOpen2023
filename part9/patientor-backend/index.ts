import express, { Express, } from 'express';
import patientsData, { Gender, Patient } from './data/patients';
const app: Express = express();
const cors = require('cors');
import bodyParser from 'body-parser'
import { toPatient } from './inputValidation/patientValidation';
app.use(cors());
app.use(bodyParser.json())
const port = 3000;

 app.get('/ping', (req, res) => {
    return res.json({'ping':'ping'})
});

type PatientWithOutSSN = Omit<Patient,'ssn'>

app.get('/api/patients',(req,res) => {
  const soughtData:PatientWithOutSSN[] = patientsData

  return res.json([...soughtData])
})

app.post('/api/patients', (req,res) => {
  console.log({body:req.body})
    try{
      const patient = toPatient(req.body)
      patientsData.push(patient)
      return res.json({...patient})
    }catch(e){
      console.log({e})
      res.status(400).json({e})
    }
})


app.listen(port, () => {
    console.log(`Exercises app listening on port ${port}`);
  });