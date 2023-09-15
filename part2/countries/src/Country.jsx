import './App.css'

const Country = ({name,flagUrl,capital,area,languages}) => {
    console.log({languages})
    const langsParsed = Object.entries(languages).map(array => array[1])
    console.log({langsParsed})
    return(
        <li key={name} className="country">
            <p><strong>Name</strong></p><p>{name}</p>
            <img style={{width:'100%',gridColumnStart:0,gridColumnEnd:3}} src={flagUrl}></img>
            <p><strong>Capital</strong></p><p>{capital}</p>
            <p><strong>Area</strong></p><p>{area}</p>
            <div style={{gridColumnStart:0,gridColumnEnd:-1,backgroundColor:'violet'}}>
                <p><strong>Languages</strong></p><ul>
                {
                    langsParsed.map(lang => <li key={lang}>{lang}</li>)
                }
                </ul>
            </div>
        </li>
    )
}

export default Country