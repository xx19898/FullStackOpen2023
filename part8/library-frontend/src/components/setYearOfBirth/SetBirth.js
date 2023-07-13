import { gql, useQuery, useMutation } from "@apollo/client"
import Select from 'react-select';
import {useState} from 'react';


const ALL_AUTHORS = gql`
  query {
    allAuthors{
      name
      born
    }
  }`

const SET_BORN = gql`
    mutation editAuthor($name: String!,$setBornTo: Int!){
        editAuthor(name: $name,setBornTo: $setBornTo){
            born
            name
            id
        }
    }
    `

const SetBirth = () => {
    const {data} = useQuery(ALL_AUTHORS)
    const [selected,setSelected] = useState('')
    const [editAuthor] = useMutation(SET_BORN)
    
    if(!data) return <p>Loading authors...</p>

    const authors = data.allAuthors

    

    

    console.log({authors})

    function getBirthDate(authorName,authorsparam){
        console.log({authorsparam})
        if(authorName === '') return undefined
        return authors.find((author) => author.name === authorName).born
    }

    const options = authors.map((author) => {
        return {label:author.name, value:author.name}})

    
    return(
        <div>
            <p>Current birth year of the chosen author: <strong>{getBirthDate(selected,authors) === undefined ? 'undefined' : getBirthDate(selected,authors)}</strong></p>
        <Select value={selected} onChange={(e) => setSelected(e)} options={options}/>
        <button onClick={() => editAuthor({variables:{name:selected,setBornTo:getBirthDate(selected,authors)}})}>Set birth year</button>
        </div>
    )
}

export default SetBirth