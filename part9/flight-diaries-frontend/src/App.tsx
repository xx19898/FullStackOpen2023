/* eslint-disable no-inner-declarations */
import React from 'react';
import {useState,useEffect} from 'react';
import { Diary, getDiaries } from './service';
import DiaryComp from './Diary';
import DiaryForm from './DiaryForm';
import './index.css'

export const BASE_URL = 'http://localhost:3001';

function App() {
  const [shouldUpdateDiaries,setShouldUpdateDiaries] = useState<boolean>(true)
  const [diaries,setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    if(shouldUpdateDiaries){
      const fetchData = async () => {
        const {data} = await getDiaries()
        setDiaries(data)
      }
      fetchData()
      setShouldUpdateDiaries(false)
      }
    },[true])
    console.log({diaries})
  return (
    <>
    <h1>Flight Diaries</h1>
    {
      diaries.map((diary) => <DiaryComp {...diary} key={diary.id} />)
    }
    <DiaryForm />
    </>

  );
}

export default App;
