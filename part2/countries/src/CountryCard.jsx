import { useState } from "react"
import './App.css'

const CountryCard = ({country,name}) => {

    const [countryInfoVisible,setCountryInfoVisible] = useState(false)

    return(
        <li className="country-card">
            <p>{name}</p><button onClick={() => setCountryInfoVisible(!countryInfoVisible)}>{countryInfoVisible ? 'Hide' : 'Show'}</button>
            {
                countryInfoVisible ? <>{country}</> : null
            }
        </li>
    )
}

export default CountryCard