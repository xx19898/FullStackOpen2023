import axios from 'axios';
import { BASE_URL } from './App';

async function getDiaries() {
  const data = axios.get(`${BASE_URL}/api/diaries`);
  return data
}

export type Visibility = 'poor' | 'good'
export type Weather = 'rainy' | 'sunny' | 'windy' | 'cloudy'

export type Diary = {
  id: number,
  date: string,
  weather: string,
  visibility: string,
}


type IDiaryCreation = Omit<Diary,'id'>

async function createDiary(newDiary:IDiaryCreation){
    const {data} = await axios.post(`BASE_URL`,{data: [newDiary] })
    return data
}


export { createDiary, getDiaries}