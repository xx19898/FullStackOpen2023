import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

const Country = ({name,flagUrl,capital,area,languages}) => {
    const langsParsed = Object.entries(languages).map(array => array[1])
    const [weatherData,setWeatherData] = useState(undefined)

    useEffect(() => {
        async function fetchWeatherData(){
            const coordinatesUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${import.meta.env.VITE_SOME_OPEN_WEATHER_KEY}`
            const coordinatesData = await axios(coordinatesUrl)
            const lat = coordinatesData.data[0].lat
            const lon = coordinatesData.data[0].lon
            const weatherDataUrl = `https://api.openweathermap.org/data/3.0/onecall?units=metric&lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_SOME_OPEN_WEATHER_KEY}`
            const weatherData = await axios(weatherDataUrl)
            setWeatherData(weatherData.data)
        }
        fetchWeatherData()
    },[])

    return(
        <div className="container">
            <div className='country'>
                <p><strong>Name</strong></p><p>{name}</p>
                <img style={{width:'100%',gridColumnStart:0,gridColumnEnd:3}} src={flagUrl}></img>
                <p><strong>Capital</strong></p><p>{capital}</p>
                <p><strong>Area</strong></p><p>{area}</p>
            </div>
            <p><strong>Languages</strong></p>
            <ul>
            {
                langsParsed.map(lang => <li key={lang}>{lang}</li>)
            }
            </ul>
            {
                weatherData
                ?
                <div className='container'>
                    <h2>Weather in {capital}</h2>
                    <p>Temperature</p><p>{weatherData.current.temp} C</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}></img>
                    <p>Wind</p><p>{weatherData.current.wind_speed}m/s</p>
                </div>
                :
                <p>Weather data is loading, please wait</p>
            }
        </div>
    )
}

export default Country