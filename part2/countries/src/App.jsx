/* eslint-disable react/jsx-key */
import { useState, useEffect, useMemo } from 'react'
import './App.css'
import axios from 'axios'
import Country from './Country'
import CountryCard from './CountryCard'

function App() {
  const [countryName,setCountryName] = useState('')
  const [allCountriesData,setAllCountriesData] = useState([])

  useEffect(() => {
    async function fetchCountriesData(){
        const url = `${import.meta.env.VITE_SOME_ALL_COUNTRIES_INFO_URL}`
        console.log({url})
        try{
          const data = await axios(url)
          console.log({data})
          setAllCountriesData(data.data)
        }catch(e){
          //pass
        }
    }
    fetchCountriesData()
  },[])

  const soughtCountriesData = useMemo(() => {
    if(countryName.length === 0 || countryName === '') return []
    const searchStringLength = countryName.length
    console.log({searchStringLength})
    return allCountriesData.filter(
      (countryData) => countryData.name.common.toLowerCase().slice(0,searchStringLength) === countryName.toLowerCase()
    )}
    ,[countryName,allCountriesData])

  console.log({soughtCountriesData})

  if(soughtCountriesData.length === 0 || soughtCountriesData.length === 0) return(
    <div>
      <input onChange={(e) => setCountryName(e.target.value)} />
      <p>Nothing to show here</p>
    </div>
  )

  if(soughtCountriesData.length > 10) return(
    <div>
      <input onChange={(e) => setCountryName(e.target.value)} />
      <p>Found total of {soughtCountriesData.length} hits of countries with that name, please make ur search more specific :)</p>
    </div>
  )

  if(soughtCountriesData.length === 1) return(
    <div className='container'>
      <input onChange={(e) => setCountryName(e.target.value)} />
      <Country
            flagUrl={soughtCountriesData[0].flags.svg}
            capital={soughtCountriesData[0].capital}
            languages={soughtCountriesData[0].languages}
            area={soughtCountriesData[0].area}
            name={soughtCountriesData[0].name.common}
      />
    </div>
  )
  return (
    <div className='container'>
      <input onChange={(e) => setCountryName(e.target.value)} />
      <ul className='country-card-list'>
        {
          soughtCountriesData.map((country) =>
          <CountryCard country={
            <Country
            flagUrl={country.flags.svg}
            capital={country.capital}
            languages={country.languages}
            area={country.area}
            name={country.name.common} />
          }
          name={country.name.common}
          key={country.name.official}
          />)
        }
      </ul>
    </div>
  )
}

export default App
