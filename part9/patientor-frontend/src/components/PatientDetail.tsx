import { useParams } from "react-router-dom"
import { Diagnosis, Entry, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry, Patient } from "../types"
import { getPatientDetail } from "../services/patients"
import { useEffect, useState } from "react"
import '../App.css'
import { getDiagnosis } from "../services/diagnosis"
import AddEntryForm from "./AddEntry/AddEntryForm"
import { Button } from "@mui/material"


export const PatientDetail = () => {
    const patientId = useParams().id
    const [patients,setPatients] = useState<Patient | undefined>(undefined)
    const [diagnosis,setDiagnosis] = useState<Diagnosis[] | undefined>(undefined)
    const [addEntryOpen,setAddEntryOpen] = useState<boolean>(false)

    useEffect(() => {
        async function fetchData(){
            if(patientId !== undefined){
                const patientsData = await getPatientDetail(patientId)
                const diagnosisData = await getDiagnosis()
                setPatients(patientsData)
                setDiagnosis(diagnosisData)
            }else{
                throw new Error('Could not extract patient id from slug param')
            }
        }
        fetchData()
    },[])

    return(
        <div className="patient-container">
            {
                patients ? patientVisualisation(patients) : <p>Sorry, user information is unavailable for the moment</p>
            }
            <Button variant="contained" onClick={() => setAddEntryOpen(!addEntryOpen)}>Add new entry</Button>
            {
                addEntryOpen && <AddEntryForm />
            }
        </div>

    )

    function patientVisualisation(patient:Patient){
        return(
            <>
                <h2>{patient.name}</h2>
                <p>{patient.dateOfBirth}</p>
                <p>{patient.gender}</p>
                <p>{patient.occupation}</p>
                <p>{patient.ssn}</p>
                <h3>Entries</h3>
                <ul>{patient.entries.map((entry) => {
                    return entryVisualisation(entry)
                })}</ul>
            </>
        )
    }

    function entryVisualisation(entry:Entry){
        switch(entry.type){
            case 'HealthCheck':
                return healthcheckEntry(entry)
            case 'Hospital':
                return hospitalEntry(entry)
            case 'OccupationalHealthcare':
                return occupationalHealthcareEntry(entry)
            default:
                return null
        }
    }

    function healthcheckEntry(healthCheckEntry:HealthCheckEntry){
        return(
        <li className="healthcheck-entry-container" key={healthCheckEntry.id}>
            <p>{healthCheckEntry.date}</p>
            <p>{healthCheckEntry.description}</p>
            <p>{`Health Check Rating: ${healthCheckEntry.healthCheckRating}`}</p>
            <p>{`Diagnosis by ${healthCheckEntry.specialist}`}</p>
            {
                healthCheckEntry.diagnosisCodes ? diagnosisDescription(healthCheckEntry.diagnosisCodes) : null
            }
        </li>)
    }

    function hospitalEntry(hospitalEntry: HospitalEntry){
        return(
            <li className="hospital-entry-container" key={hospitalEntry.id}>
                <p>{hospitalEntry.date}</p>
                <p>{hospitalEntry.description}</p>
                <p>{`Diagnosis by ${hospitalEntry.specialist}`}</p>
                {
                    hospitalEntry.diagnosisCodes ? diagnosisDescription(hospitalEntry.diagnosisCodes) : null
                }
            </li>
        )
    }

    function occupationalHealthcareEntry(occHealthEntry: OccupationalHealthcareEntry){
        return(
            <li className="occ-healthcare-entry-container" key={occHealthEntry.id}>
                <p>{occHealthEntry.date}</p>
                <p>{occHealthEntry.description}</p>
                <p>{`Diagnosis by ${occHealthEntry.specialist}`}</p>
                {
                    occHealthEntry.diagnosisCodes ? diagnosisDescription(occHealthEntry.diagnosisCodes) : null
                }
            </li>
        )
    }

    function diagnosisDescription(diagnosisCodes: Array<Diagnosis['code']>){
        if(!diagnosis){
            return(<p>Sorry, diagnosis description is unavailable</p>)
        }

        const rightDiagnosisArray = diagnosis.filter((diag) => diagnosisCodes.includes(diag.code))


        return(
            <ul className="diagnosis-descript-container">
                {
                    rightDiagnosisArray.map((diag) =>
                        <li key={diag.code}>
                            <p>{`Code: ${diag.code}`}</p>
                            <p>{`Name: ${diag.name}`}</p>
                            {
                                diag.latin ? <p>{`Name in Latin: ${diag.latin}`}</p> : null
                            }
                        </li>
                    )
                }
            </ul>
        )
    }

    function findDiagnosisNameByCode(code:string){
        const name = diagnosis?.find((diag) => diag.code === code)
        return name
    }
}