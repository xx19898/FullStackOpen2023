


const PersonInfo = ({person,deletePerson,setShouldRefetch}) => {

    return(
        <>
            {person.name} {person.number}<button onClick={async () => {
                await deletePerson(person.name,person.id)
            }}>delete</button>
        </>
        )
}

export default PersonInfo