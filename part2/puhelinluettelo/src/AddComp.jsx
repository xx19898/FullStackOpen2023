import "./App.css"

const AddComponent = ({
    setNewName,setNewNumber,checkForNameExistsInList,
    currentList,newName,newNumber,setPersons,addToServer,setShouldRefetch,replaceNumber}) => {
    return(
      <>
        <div className="add-form">
          <label className="add-form-label">Name</label> <input onChange={(e) => setNewName(e.target.value)}/>
          <label className="add-form-label">Number</label> <input onChange={(e) => setNewNumber(e.target.value)}/>

        </div>
          <button type="submit" className="form-button" onClick={async (e) => {
            e.preventDefault()
            if(checkForNameExistsInList(newName,currentList)){
              const userResponse = confirm(`${newName} is already in the list. Press \'OK\' if you would like to replace its current number with the new one and \'Cancel\' otherwise`)
              if(userResponse){
                const id = getIdFromName(newName)
                await replaceNumber(newName,newNumber,id)
              }
            }
            else {
                await addToServer(newName,newNumber)
            }
          }}>add</button>
        </>
    )

    function getIdFromName(soughtName){
      return currentList.find((person) => person.name === soughtName).id
    }
}

export default AddComponent