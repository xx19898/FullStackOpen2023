import { useState } from "react"
import React from 'react'
import './index.css';

import { createDiary } from "./service"

const DiaryForm =  () => {
    const [weather,setWeather] = useState<string>('')
    const [visibility,setVisibility] = useState<string>('')
    const [date,setDate] = useState<string>('')

    return(
        <form className="diary-form-main" onSubmit={async (event) => {
            event.preventDefault()
            const response = await createDiary({
                date: date,
                visibility: visibility,
                weather: weather})
        }}>
            <div className="diary-form">
            <label className="label">Date</label><input onChange={(event) => setDate(event.target.value) }/>
            <label>Weather</label><input onChange={(event) =>  setWeather(event.target.value)}/>
            <label>Weather</label><input onChange={(event) =>  setWeather(event.target.value)}/>
            <label>Visibility</label><input onChange={(event) => setVisibility(event.target.value)}/>
            </div>
            <button className="button">Create new diary entry</button>
        </form>
    )
}

export default DiaryForm