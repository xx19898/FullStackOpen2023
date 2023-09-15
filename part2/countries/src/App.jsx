/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Country from './Country'

function App() {
  const [countryName,setCountryName] = useState('')
  const [countryData,setCountryData] = useState([])
  console.log({countryData})
  useEffect(() => {
    async function fetchNewCountryData(){
        const url = `${import.meta.env.VITE_SOME_COUNTRIES_INFO_URL}${countryName}`
        console.log({url})
        try{
          const data = await axios(url)
          console.log({data})
          setCountryData(data.data)
        }catch(e){
          //pass
        }
    }
    if(countryName.length > 0 && countryName != '') fetchNewCountryData()
  },[countryName])
  if(countryName.length === 0 || countryData.length === 0) return(
    <div>
      <input onChange={(e) => setCountryName(e.target.value)} />
      <p><bold>Nothing to show here</bold></p>
    </div>
  )
  return (
    <div>
      <input onChange={(e) => setCountryName(e.target.value)} />
      <ul>
        {
          countryData.length > 1 ? countryData.map((country) =>
          <Country
          flagUrl={country.flags.svg}
          capital={country.capital}
          languages={country.languages}
          area={country.area}
          name={country.name.common} />)
          :
          <Country
          flagUrl={countryData.flags.svg}
          capital={countryData.capital}
          languages={countryData.languages}
          area={countryData.area}
          name={countryData.name.common} />
        }
      </ul>
    </div>
  )
}

export default App
