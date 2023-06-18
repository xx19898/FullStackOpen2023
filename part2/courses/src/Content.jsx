import Part from "./Part"

export default ({parts}) => {
    return(
        <>
        {
            parts.map((part) => {
                return(
                    <Part name={part.name} number={part.exercises}/>            
                )
            })
        }
        <Part name="Total exercises: " number={ parts.reduce((sum,curr) => sum + curr.exercises,0) }/>
        </>
    )
}