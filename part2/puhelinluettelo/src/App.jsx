import { useEffect, useState } from 'react'
import FilterComponent from './FilterComp'
import AddComponent from './AddComp'
import PersonInfo from './PersonInfo'
import Persons from './Persons'
import axios from 'axios';
import NetworkComms from './NetworkComms'
import Error from './ErrorComp'

export const BASE_URL = 'http://localhost:3001/'

const App = () => { 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter,setFilter] = useState('')
  const [showNotification,setShowNotification] = useState(false)
  const  [notificationMessage,setNotificationMessage] = useState('')
  const [notificatonType,setNotificationType] = useState('')

  const {
    addNewPersonToServer,
    persons,setPersons,
    deletePerson,setShouldRefetch,
    replaceAlreadyExistingPersonInfo
  } = NetworkComms(showNotificationMessage)

  function changeFilter(newFilter){
    setFilter(newFilter)
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        {
          showNotification ? <Error errorMessage={notificationMessage} type={notificatonType}/> : null
        }
        <FilterComponent setFilter={changeFilter}/>
        <AddComponent 
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        checkForNameExistsInList={checkIfNameAlreadyIsInList}
        currentList={persons}
        newName={newName}
        newNumber={newNumber}
        setPersons={setPersons}
        addToServer={addNewPersonToServer}
        setShouldRefetch={setShouldRefetch}
        replaceNumber={replaceAlreadyExistingPersonInfo}
        />
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} setShouldRefetch={setShouldRefetch}/>
    </div>
  )

  function checkIfNameAlreadyIsInList(name,persons){
    return persons.some((person) => person.name === name)
  }

  async function showNotificationMessage(secs,text,type){
      setNotificationMessage(text)
      setNotificationType(type)
      setShowNotification(true)
      await timeout(secs)
      setShowNotification(false)
  }

  function timeout(secs) {
    return new Promise( resolve => setTimeout(resolve, secs * 1000) );
}
}

export default App
