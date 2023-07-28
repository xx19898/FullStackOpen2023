type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;


export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}
export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }

export  interface HealthCheckAddInfo{
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

  export  interface HealthCheckEntry extends BaseEntry,HealthCheckAddInfo {}

export  interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface OccHealthEntryAddInfo{
    type: 'OccupationalHealthcare',
    employerName: string,
    sickLeave?: {
        startDate: string,
        endDate: string,
    }
}

export interface OccupationalHealthcareEntry extends BaseEntry,OccHealthEntryAddInfo{
}


export interface HospitalEntryAdditionalInfo{
    type: 'Hospital',
    discharge:{
        date: string,
        criteria: string,
    }
}

export interface HospitalEntry extends BaseEntry,HospitalEntryAdditionalInfo{
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;