

export default ({text,callback,currentValue}) => {

    return(
        <>
        <button onClick={() => callback(currentValue + 1)}>{text}</button>
        </>
    )
}