import { useDispatch } from "react-redux"
import { createChangeFilterAction } from "./reducers/filterReducer"

const AnecdoteFilter = () => {
    const dispatch = useDispatch()

    const handleChange = (e) => {
        dispatch(createChangeFilterAction(e.target.value))
    }

    return(
        <>
        <h3>Filter</h3>
        <input onChange={(e) => handleChange(e)}/>
        </>
    )
}

export default AnecdoteFilter