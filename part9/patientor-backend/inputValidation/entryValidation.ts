import {BaseEntry, Entry,} from "../data/types";
import { isDate, isString, parseDateParam, parseStringParam } from "./patientValidation";


export function validateNewEntry(newEntry:unknown): newEntry is Entry{
    if(objectIsBaseEntry(newEntry) && 'type' in newEntry && typeof newEntry.type === 'string'){
        switch(newEntry.type){
            case 'HealthCheck':
                validateHealthCheckEntry(newEntry)
                return true
                break
            case 'OccupationalHealthcare':
                validateOccHealthEntry(newEntry)
                return true
                break
            case 'Hospital':
                validateHospitalEntry(newEntry)
                return true
                break
            default:
                throw new Error('Malformed entry')
        }
    }else{

        throw new Error('Malformed Entry - unknown type')
    }
}

function objectIsBaseEntry(entry:unknown): entry is BaseEntry{
    console.log({entry})
    if(!(entry != undefined &&
        typeof entry === 'object' &&
        'id' in entry &&
        'description' in entry &&
        'date' in entry &&
        'specialist' in entry)) throw new Error('Malformed entry')
        console.log('got here')
    parseStringParam(entry.id,'id')
    parseStringParam(entry.description,'description')
    parseDateParam(entry.date)
    parseStringParam(entry.specialist,'specialist')

    if(entry != undefined &&
       typeof entry === 'object' &&
       'diagnosisCodes' in entry){
              if(!(Array.isArray(entry.diagnosisCodes) &&
                  entry.diagnosisCodes.length > 0 &&
                  diagnosisCodesAreInCorrectForm(entry.diagnosisCodes))) throw new Error('Malformed diagnosisCodes field')
        }
        entry
     return true
    }

function diagnosisCodesAreInCorrectForm(diagnosisCodes: any[]){
    return diagnosisCodes.every(diagnosis => parseStringParam(diagnosis,'diagnosis code'))
}

function validateHealthCheckEntry(entry:unknown){
    if(!(entry != undefined && typeof entry === 'object' &&'healthCheckRating' in entry)) throw new Error('Malformed healthcheck part of the new entry in the request')
    const healthCheckRating = entry.healthCheckRating
    if(isInteger(healthCheckRating)){
        if(healthCheckRating > 5 || healthCheckRating < 0) throw new Error('Health check rating is of unallowed size, it should be lesser then 5 and bigger than 0')
    }
}

function validateOccHealthEntry(entry:unknown){
    if(!(entry != undefined && typeof entry === 'object' && 'employerName' in entry && isString(entry.employerName))) throw new Error('Missing employerName field in Occupational Healthcare Entry entry. That field is required')

    if('sickLeave' in entry){
        if(!(typeof entry.sickLeave === 'object' &&  entry.sickLeave != undefined)) throw new Error('Malformed sick leave field')
        if(!('startDate' in entry.sickLeave && 'endDate' in entry.sickLeave && entry.sickLeave.startDate != undefined && entry.sickLeave.endDate != undefined)) throw new Error('Sick leave field missing either start or end date')
        if(!(isDate(entry.sickLeave.startDate as string) && isDate(entry.sickLeave.endDate as string))) throw new Error('Either end date or start date of the sickleave field is malformed, it should be a date')
    }
}

function validateHospitalEntry(entry:unknown){
    if(!(entry != undefined && typeof entry === 'object' && 'discharge' in entry)) throw new Error('Malformed data inside fields related to hospital entry, it should contain valid discharge field')
    if(!(entry.discharge != undefined && typeof entry.discharge === 'object' && 'date' in entry.discharge && 'criteria' in entry.discharge)) throw new Error('Malformed data inside discharge field of the Hospital entry you are trying to add')
    if(!(isDate(entry.discharge.date as string) && isString(entry.discharge.criteria))) throw new Error('Malformed data inside discharge field, should contain a valid date and a valid criteria')
}

function isInteger(number:unknown): number is number {
    return Number.isInteger(number)
}