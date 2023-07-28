import axios from "axios";
import { Entry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAllPatients = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/api/patients`
  );

  return data;
};

const createPatient = async (object: PatientFormValues) => {
  console.log({object})
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/api/patients`,
    object
  );

  return data;
};

const getPatientDetail = async (id: string) => {
  const {data} = await axios.get<Patient>(
    `${apiBaseUrl}/api/patients/${id}`
  )

  return data;
}

export async function addNewEntry(patientId:number, newEntry: Entry){
  const {data,status} = await axios.post(`${apiBaseUrl}/api/patients/${patientId}`)
  return {data,status}
}

// eslint-disable-next-line import/no-anonymous-default-export
export {
  getAllPatients, createPatient, getPatientDetail
};

