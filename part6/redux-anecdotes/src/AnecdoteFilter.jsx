import {useDispatch} from "react-redux"
import {changeFilter} from "./slices/filterSlice"

const AnecdoteFilter = () => {
    const dispatch = useDispatch()

    const handleChange = (e) => {
        dispatch(changeFilter(e.target.value))
    }

    return(
        <>
        <h3>Filter</h3>
        <input onChange={(e) => handleChange(e)}/>
        </>
    )
}

export default AnecdoteFilter