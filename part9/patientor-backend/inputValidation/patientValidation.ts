
import { v1 as uuid } from 'uuid';
import { Gender, Patient } from '../data/types';

export const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

export const isDate = (date: string) : boolean => {
    return Boolean(Date.parse(date))
  }

export const parseStringParam = (id:unknown,propertyName:string) : string => {
    if(!id || !isString(id)){
      throw new Error(
        `incorrect or missing property ${propertyName}`
      )
    }
    return id
  }

export const parseDateParam = (date: unknown) => {
    if(!date || !isString(date) || !isDate(date)){
      throw new Error('Incorrect or missing date')
    }
    return date;
  }


  function isValidGender(str:string): str is Gender{
    return str in Gender
  }

  const parseGender = (gender: unknown): Gender => {
    if(!gender || !isString(gender) || !isValidGender(gender)){
      throw new Error('Incorrect or missing gender')
    }
    return gender
  }

  export function toPatient(patientObj:unknown): Patient{
    if(!patientObj || typeof patientObj != 'object'){
      throw new Error('Incorrect or missing patient data')
    }
    if( 'name' in patientObj && 'dateOfBirth' in patientObj && 'ssn' in patientObj && 'gender' in patientObj && 'occupation' in patientObj){
      const newPatient:Patient = {
        id: uuid(),
        dateOfBirth: parseDateParam(patientObj.dateOfBirth),
        gender: parseGender(patientObj.gender),
        name: parseStringParam(patientObj.name,'name'),
        occupation: parseStringParam(patientObj.occupation,'occupation'),
        ssn: parseStringParam(patientObj.ssn,'ssn'),
        entries: []
      }
      return newPatient
    }
    throw new Error('Some params missing in the post request')
}