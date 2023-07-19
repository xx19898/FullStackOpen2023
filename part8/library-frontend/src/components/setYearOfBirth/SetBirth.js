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
    const [newBirthDate,setBirthDate] = useState(null)
    const [editAuthor] = useMutation(SET_BORN,{
        refetchQueries: [
            ALL_AUTHORS
        ]
    })

    if(!data) return <p>Loading authors...</p>

    const authors = data.allAuthors







    function getBirthDate(authorName,authorsparam){
        if(authorName === '') return undefined
        const authorWithSameName = authorsparam.find((author) => author.name === authorName)
        return authorWithSameName.born
    }

    const options = authors.map((author) => {
        return {label:author.name, value:author.name}})


    return(
        <div>
            <p>Current birth year of the chosen author: <strong>{!getBirthDate(selected,authors) ? 'undefined' : getBirthDate(selected,authors)}</strong></p>
        <Select value={{label:selected}} label={selected} onChange={(e) => setSelected(e.label)} options={options}/>
        <input onChange={(e) => setBirthDate(e.target.value)}></input>
        <button onClick={() => editAuthor({variables:{name:selected,setBornTo:parseInt(newBirthDate)}})}>Set birth year</button>
        </div>
    )
}

export default SetBirth