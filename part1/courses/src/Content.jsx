import Part from "./Part"

export default ({parts}) => {
    return(
        <>
        <Part name={parts[0].name} number={parts[0].exercises}/>
        <Part name={parts[1].name} number={parts[1].exercises}/>
        <Part name={parts[2].name} number={parts[2].exercises}/>
        </>
    )
}