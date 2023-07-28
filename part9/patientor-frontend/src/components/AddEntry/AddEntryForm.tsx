import { Autocomplete, AutocompleteRenderInputParams, Button, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material"
import { useContext,useMemo, useState } from "react"
import Select from 'react-select';
import '../../App.css'
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
    console.log({
        description,
        date,
        specialist,
        diagnosis,
        addInfo})
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
            <DateCalendar onChange={(e) => console.log({e})}/>
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
            <AdditionalInfo type={entryType} addÍnfo={addInfo} setInfo={setAddInfo}/>
            <Button variant="contained">Add Esntry</Button>
        </form>
    )

    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()

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

        </ul>
        <Autocomplete
        style={{width:'100%'}}
        renderInput={(params) => <TextField {...params} label="Diagnosis" />}
        options={diagnosOptions} onChange={(event,value) => console.log({value})}/>
        </>
    )
}

function AdditionalInfo({addÍnfo,setInfo,type}:{setInfo: (
    addInfo:HealthCheckAddInfo | OccHealthEntryAddInfo | HospitalEntryAdditionalInfo) => void,
    addÍnfo:HealthCheckAddInfo | OccHealthEntryAddInfo | HospitalEntryAdditionalInfo | null,
    type:EntryType}){

    switch(type){
        case 'HOSPITAL':
            return(<HospitalForm addÍnfo={addÍnfo} setInfo={setInfo}/>)
        case 'OCCUPATIONAL':
            return(<OccHealthEntryAddInfoForm addÍnfo={addÍnfo} setInfo={setInfo} />)
        case 'HEALTHCHECK':
            return(<HealthCheckAddInfoForm addÍnfo={addÍnfo} setInfo={setInfo} />)
        default:
            return(<></>)
    }
}

function HospitalForm({addÍnfo,setInfo}:{
    setInfo: (addInfo:HealthCheckAddInfo | OccHealthEntryAddInfo | HospitalEntryAdditionalInfo) => void,
    addÍnfo:HealthCheckAddInfo | OccHealthEntryAddInfo | HospitalEntryAdditionalInfo | null}){
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
        <TextField onChange={(e) => {
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
            console.log({date})
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
            console.log({date})
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



    function HealthCheckAddInfoForm({addÍnfo,setInfo}:{
        setInfo: (addInfo:HealthCheckAddInfo | OccHealthEntryAddInfo | HospitalEntryAdditionalInfo) => void,
        addÍnfo:HealthCheckAddInfo | OccHealthEntryAddInfo | HospitalEntryAdditionalInfo | null}){
            return(
                <FormGroup style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Healthy" onClick={() => handleCheck(0)} />
                    <FormControlLabel control={<Checkbox />} label="Low Risk" onClick={() => handleCheck(1)} />
                    <FormControlLabel disabled control={<Checkbox />} label="High Risk" onClick={() => handleCheck(2)} />
                    <FormControlLabel disabled control={<Checkbox />} label="Critical Risk" onClick={() => handleCheck(3)} />
                </FormGroup>
            )

            function handleCheck(newVal:number){
                setInfo({type:'HealthCheck',healthCheckRating:newVal})
            }
        }



export default AddEntryForm