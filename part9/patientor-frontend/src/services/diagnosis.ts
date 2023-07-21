import axios from "axios";
import { apiBaseUrl } from "../constants";


export async function getDiagnosis(){
    const {data} = await axios.get(`${apiBaseUrl}/api/diagnosis`)
    return data
}