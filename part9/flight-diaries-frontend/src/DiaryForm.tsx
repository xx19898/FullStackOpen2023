import { useState } from "react"
import React from 'react'
import './index.css';

import { createDiary } from "./service"
import axios from "axios";
interface IDiaryForm {
    updateDiaries: () => void,
    setNotification: (status:boolean) => void,
    setNotificationMessage: (error:{status:string,message:string}) => void,
}
const DiaryForm =  ({updateDiaries,setNotification,setNotificationMessage}:IDiaryForm) => {
    const [weather,setWeather] = useState<'rainy' | 'sunny' | 'cloudy' | 'stormy' | 'windy' | undefined>(undefined)
    const [visibility,setVisibility] = useState<'great' | 'good' | 'ok' | 'poor' | undefined>(undefined)
    const [date,setDate] = useState<Date | undefined>(undefined)
    const [comment,setComment] = useState<string>('')

    return(
        <form className="diary-form-main" onSubmit={async (event) => {
            event.preventDefault()
            try{
                if(date != undefined && weather != undefined && visibility != undefined){
                    const response = await createDiary({
                        date: date,
                        visibility: visibility,
                        weather: weather,
                        comment: comment,
                    })
                }
                updateDiaries()
            }catch(e){
                if(axios.isAxiosError(e)){
                    console.log({e})
                    setNotification(true)
                    setNotificationMessage({status:String(e.status),message: e.response?.data})
                }
            }
        }}>
            <div className="diary-form">
            <label className="label">Date</label><input type='date' onChange={(event) => setDate(new Date(event.target.value)) }/>
            <label>Weather</label>
            <div className="radio-toggles">
                <label>Rainy</label>
                <input type='radio' value='rainy' name="weather" onClick={() => setWeather('rainy')}/>
                <label>Windy</label>
                <input type='radio' value='windy' name="weather" onClick={() => setWeather('windy')}/>
                <label>Sunny</label>
                <input type='radio' value='sunny' name="weather" onClick={() => setWeather('sunny')}/>
                <label>Stormy</label>
                <input type='radio' value='stormy' name="weather" onClick={() => setWeather('stormy')}/>
                <label>Cloudy</label>
                <input type='radio' value='cloudy' name="weather" onClick={() => setWeather('cloudy')}/>
            </div>
            <label>Visibility</label>
            <div className="radio-toggles">
                <label>Poor</label><input type='radio' name="visibility" value='poor' onChange={() => setVisibility('poor')}/>
                <label>Ok</label><input type='radio' name="visibility" value='ok' onChange={() => setVisibility('ok')}/>
                <label>Good</label><input type='radio' name="visibility" value='good' onChange={() => setVisibility('good')}/>
                <label>Great</label><input type='radio' name="visibility" value='great' onChange={() => setVisibility('great')}/>
            </div>
            <label>Comment</label><input onChange={(event) => setComment(event.target.value)}/>
            </div>
            <button className="button">Create new diary entry</button>
        </form>
    )
}

export default DiaryForm