import { Autocomplete, AutocompleteRenderInputParams, Button, Card, Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, TextField } from "@mui/material"
import { useContext,useMemo, useState } from "react"
import Select from 'react-select';
import '../../App.css'
import { v4 as uuidv4 } from 'uuid';
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { HealthCheckAddInfo, HospitalEntryAdditionalInfo, OccHealthEntryAddInfo } from "../../types";
import dayjs from "dayjs";
import { DiagContext } from "../../App";

type EntryType = 'NOT_SELECTED' | 'OCCUPATIONAL' | 'HOSPITAL' | 'HEALTHCHECK'

const AddEntryForm = () => {
    //Base info
    const [description,setDescription] = useState('')
    const [date,setDate] = useState('')
    const [specialist,setSpecialist] = useState('')
    const [diagnosis,setDiagnosis] = useState<{label:string,code:string}[]>([])
    const [addInfo,setAddInfo] = useState<HealthCheckAddInfo | OccHealthEntryAddInfo | HospitalEntryAdditionalInfo | null>(null)

    const [entryType,setEntryType] = useState<EntryType>('NOT_SELECTED')

    const entryTypeOptions:{value:EntryType,label:string}[] = [
        {
            value: 'OCCUPATIONAL', label:'Occupation Healthcare Entry'
        },
        {
            value:'HOSPITAL',label:'Hospital Entry'
        },
        {
            value:'HEALTHCHECK',label:'Healthcheck Entry'
        }
    ]

    return(
        <form className="add-entry-form" onSubmit={(e) => handleSubmit(e)}>
            <label><strong style={{fontSize:'36px'}}>Description</strong></label>
            <TextField style={{width:'100%'}} variant="filled" onChange={(e) => setDescription(e.target.value)}/>
            <label><strong style={{fontSize:'36px'}}>Date</strong></label>
            <DateCalendar onChange={(e:any) => setDate(dayjs(e['$d']).format('DD-MM-YYYY'))}/>
            <label><strong style={{fontSize:'36px'}}>Specialist</strong></label>
            <TextField style={{width:'100%'}} variant="filled" onChange={(e) => setSpecialist(e.target.value)}/>
            <label><strong style={{fontSize:'36px'}}>Entry type</strong></label>
            <Select
            className="select-field"
            styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  width:'100%',
                }),
              }}
            options={entryTypeOptions}
            defaultValue={{value:'NOT_SELECTED',label:'NOT SELECTED'}}
            onChange={(e) => {
                if(e != null) setEntryType(e.value as EntryType)
            }}
            />
            <DiagnosComp
            currDiagnosis={diagnosis}
            setDiagnosis={setDiagnosis}/>
            <AdditionalInfo type={entryType} addInfo={addInfo} setInfo={setAddInfo}/>
            <Button variant="contained" type="submit">Add Entry</Button>
        </form>
    )

    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const diagnosisCodes = diagnosis.map((diag) => diag.code)
        const newEntry = {
            id: uuidv4(),
            description: description,
            date: date,
            specialist: specialist,
            diagnosisCodes: diagnosisCodes,
            ...addInfo
        }
        console.log({newEntry})
    }
}

function DiagnosComp({
    setDiagnosis,
    currDiagnosis,
}:{
    setDiagnosis:(newDiagnosis:{label:string,code:string}[]) => void,
    currDiagnosis:{code:string,label:string}[],
}){
    const diagnosData = useContext(DiagContext)
    const diagnosOptions = useMemo(() => {
        return diagnosData.map((dataEntry) => {
            return {
                label:dataEntry.name,
                code:dataEntry.code,
            }
        })
    },[diagnosData])

    return(
        <>
        <ul>
            {
                currDiagnosis.map((diagnosEntry) => {
                    return(
                        <Card key={uuidv4()} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',padding:'2em'}}>
                            <label>Name</label>
                            <p><strong>{diagnosEntry.label}</strong></p>
                            <label>Code</label>
                            <p><strong>{diagnosEntry.code}</strong></p>
                            <Button
                            onClick={() => deleteDiagnos(diagnosEntry.code)}
                            variant="outlined">Delete</Button>
                        </Card>
                    )
                })
            }
        </ul>
        <Autocomplete
        style={{width:'100%'}}
        renderInput={(params) => <TextField {...params} label="Diagnosis" />}
        options={diagnosOptions} onChange={(event,value) => {
            if(value != null) addDiagnos(value)}}/>
        </>
    )

    function deleteDiagnos(code:string){
        const newDiagnos = currDiagnosis.filter((diagnosEntry) => diagnosEntry.code != code)
        setDiagnosis(newDiagnos)
    }

    function addDiagnos(newDiagnos:{code:string,label:string}){
        setDiagnosis(currDiagnosis.concat(newDiagnos))
    }
}

function AdditionalInfo({addInfo,setInfo,type}:{setInfo: (
    addInfo:HealthCheckAddInfo | OccHealthEntryAddInfo | HospitalEntryAdditionalInfo) => void,
    addInfo:HealthCheckAddInfo | OccHealthEntryAddInfo | HospitalEntryAdditionalInfo | null,
    type:EntryType}){

    switch(type){
        case 'HOSPITAL':
            return(<HospitalForm addInfo={addInfo} setInfo={setInfo}/>)
        case 'OCCUPATIONAL':
            return(<OccHealthEntryAddInfoForm addÍnfo={addInfo} setInfo={setInfo} />)
        case 'HEALTHCHECK':
            return(<HealthCheckAddInfoForm addInfo={addInfo} setInfo={setInfo} />)
        default:
            return(<></>)
    }
}

function HospitalForm({addInfo,setInfo}:{
    setInfo: (addInfo:HealthCheckAddInfo | OccHealthEntryAddInfo | HospitalEntryAdditionalInfo) => void,
    addInfo:HealthCheckAddInfo | OccHealthEntryAddInfo | HospitalEntryAdditionalInfo | null}){
    const [dischargeDate,setDischargeDate] = useState<string>('')
    const [dischargeCriteria,setDischargeCriteria] = useState<string>('')


    return(
        <>
        <label>Discharge</label>
        <DateCalendar
        onChange={(e:any) => {
            const date = dayjs(e['$d']).format('DD-MM-YYYY')
            setDischargeDate(date)
            setInfo({type:'Hospital',discharge:{criteria:dischargeCriteria,date:date}})
            if(typeof e === 'string') console.log({e})
            }}/>

        <label>Criteria</label>
        <TextField
        style={{width:'100%'}}
        onChange={(e) => {
            setInfo({type:'Hospital',discharge:{criteria:dischargeCriteria,date:dischargeDate}})
            setDischargeCriteria(e.target.value)}}/>
        </>
    )
}

function OccHealthEntryAddInfoForm({addÍnfo,setInfo}:{
    setInfo: (addInfo:HealthCheckAddInfo | OccHealthEntryAddInfo | HospitalEntryAdditionalInfo) => void,
    addÍnfo:HealthCheckAddInfo | OccHealthEntryAddInfo | HospitalEntryAdditionalInfo | null}){
        const [employerName,setEmployerName] = useState('')
        const [sickLeaveStart,setSickLeaveStart] = useState('')
        const [sickLeaveEnd,setSickLeaveEnd] = useState('')

        return(
            <>
            <label>Employer name</label>
            <TextField onChange={(e) => {
                setEmployerName(e.target.value)
                setInfo({
                    type:'OccupationalHealthcare',
                    employerName:employerName,
                    sickLeave:{
                        endDate:sickLeaveEnd,
                        startDate:sickLeaveStart
                    }})
            }}/>
            <label>Sick leave start date</label>
            <DateCalendar
            onChange={(e:any) => {
            const date = dayjs(e['$d']).format('DD-MM-YYYY')
            setSickLeaveStart(date)
            setInfo({
                type:'OccupationalHealthcare',
                employerName:employerName,
                sickLeave:{
                    endDate:sickLeaveEnd,
                    startDate:date
                }})
            }}/>
            <label>Sick leave end date</label>
            <DateCalendar
            onChange={(e:any) => {
            const date = dayjs(e['$d']).format('DD-MM-YYYY')
            setSickLeaveEnd(date)
            setInfo({
                type:'OccupationalHealthcare',
                employerName:employerName,
                sickLeave:{
                    endDate: date,
                    startDate:sickLeaveStart
                }})
            }}/>
            </>

        )
    }



    function HealthCheckAddInfoForm({addInfo,setInfo}:{
        setInfo: (addInfo:HealthCheckAddInfo | OccHealthEntryAddInfo | HospitalEntryAdditionalInfo) => void,
        addInfo:HealthCheckAddInfo | OccHealthEntryAddInfo | HospitalEntryAdditionalInfo | null}){
            return(
                <RadioGroup style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <FormControlLabel control={<Radio />} checked={isToggled(0)} label="Healthy" onClick={() => handleCheck(0)} />
                    <FormControlLabel control={<Radio />} checked={isToggled(1)} label="Low Risk" onClick={() => handleCheck(1)} />
                    <FormControlLabel control={<Radio />} checked={isToggled(2)} label="High Risk" onClick={() => handleCheck(2)} />
                    <FormControlLabel control={<Radio />} checked={isToggled(3)} label="Critical Risk" onClick={() => handleCheck(3)} />
                </RadioGroup>
            )

            function isToggled(val:number){
                if(!addInfo){
                    if(val === 1) return true
                    return false
                }
                if((addInfo as  HealthCheckAddInfo).healthCheckRating === val) return true
                return false

            }

            function handleCheck(newVal:number){
                setInfo({type:'HealthCheck',healthCheckRating:newVal})
            }
        }



export default AddEntryForm