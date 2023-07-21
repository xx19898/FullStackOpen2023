import express, { Express, } from 'express';
import { Gender, Patient } from './data/types';
const app: Express = express();
const cors = require('cors');
import bodyParser from 'body-parser'
import { toPatient } from './inputValidation/patientValidation';
import patientsData, { getPatientById } from './data/patients';
import diagnoseData, { Diagnosis } from './data/diagnoses';
app.use(cors());
app.use(bodyParser.json())
const port = 3000;

 app.get('/ping', (req, res) => {
    return res.json({'ping':'ping'})
});

type NonSensitivePatient = Omit<Patient,'ssn' | 'entries'>

app.get('/api/patients',(req,res) => {
  const soughtData:NonSensitivePatient[] = patientsData

  return res.json([...soughtData])
})

app.get('/api/diagnosis',(req,res) => {
  const soughtData:Diagnosis[] = diagnoseData
  return res.json([...soughtData])
})

app.get('/api/patients/:id',(req,res) => {
  const id = req.params.id
  const patients = patientsData
  const patient = getPatientById(id,patients)
  return res.json(patient)
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