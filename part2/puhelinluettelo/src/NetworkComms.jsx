import { useEffect, useState } from "react"
import axios from 'axios';
import { BASE_URL } from "./App";


const NetworkComms = (setNotification) => {
    const [persons, setPersons] = useState([])
    const [shouldRefetch,setShouldRefetch] = useState(true)

    useEffect(() => {
        if(shouldRefetch){
            const fetchData = async () => await axios.get(BASE_URL + 'persons').then(function(response){
                setPersons(response.data)
              })
              .catch(function(err){
                console.log(err)
              })
              fetchData()
              setShouldRefetch(false)
        }
      },[shouldRefetch])

      async function addNewPersonToServer(newName,newNumber){
        await axios.post(BASE_URL + 'persons',{
          name: newName,
          number: newNumber,
        }).then(() => {
            setShouldRefetch(true)
            setNotification(5,`Added ${newName} to the phone book`,'PLAIN')
        }).catch((error) => {
            setNotification(5,error.message,'ERROR')
        })
      }

      async function replaceAlreadyExistingPersonInfo(name,newNumber,id){
        await axios.put(BASE_URL + `persons/${id}`,{
                name: name,
                number: newNumber,
        }).then(() => {
            setShouldRefetch(true)
            setNotification(5, `Updated phone number for ${name}`,'PLAIN')
        }).catch((err) => {
            setNotification(5, err.message,`ERROR`)
        })
      }

      async function deletePerson(name,id){
        await axios.delete(BASE_URL + 'persons/' + id,{ data:{name:name} }).then(() => {
            setShouldRefetch(true)
            setNotification(5, `Deleted ${name} from the phone book`,'PLAIN')
        }).catch((err) => {
            setNotification(5, err.message, 'ERROR')
        })
      }

      return {persons,setPersons,addNewPersonToServer,deletePerson,replaceAlreadyExistingPersonInfo,setShouldRefetch}
}

export default NetworkComms