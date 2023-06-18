import PersonInfo from "./PersonInfo"



const Persons = ({persons,filter,deletePerson,setShouldRefetch,setNotification}) => {
    return(
        <ul>
        {
          persons.filter((person) => person.name.toLowerCase().includes(filter) ).map((person) => {
            return(
                <li key={person.name}>
                    <PersonInfo person={person} deletePerson={deletePerson} setShouldRefetch={setShouldRefetch}/>
                </li>
            )
          })
        }
      </ul>
    )
}
export default Persons