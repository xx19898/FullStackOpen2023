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
  const [notification,setNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState<{status:string,message:string}>({status:'',message:''})

  useEffect(() => {
    if(notification){
      const timeout = setTimeout(function(){
        setNotificationMessage({message:'',status:''})
        setNotification(false)
      },2000)
      return () => clearTimeout(timeout)
    }
  },[notification])

  useEffect(() => {
    if(shouldUpdateDiaries){
      const fetchData = async () => {
        const {data} = await getDiaries()
        console.log({NEW_DIARIES:data})
        setDiaries(data)
      }
      fetchData()
      setShouldUpdateDiaries(false)
      }
    },[shouldUpdateDiaries])
    console.log({diaries})
  return (
    <>
    {
      notification ? <div className="error">
      <p>{`Error status: ${notificationMessage.status}`}</p>
      <p>{`Error message: ${notificationMessage.message}`}</p>
      </div>
      :
      null
    }
    <h1>Flight Diaries</h1>
    <div className="diaries-container">
    {
      diaries.map((diary) => <DiaryComp {...diary} key={diary.id} />)
    }
    </div>
    <DiaryForm updateDiaries={() => setShouldUpdateDiaries(true)} setNotification={setNotification} setNotificationMessage={setNotificationMessage}/>
    </>

  );
}

export default App;
