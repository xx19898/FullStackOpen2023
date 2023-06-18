import './App.css'

const Error = ({errorMessage,type}) => {
    const x = type === 'PLAIN'
    return(
        <div className={type === 'PLAIN' ? "notification-container-plain" : "notification-container-error"}>
            <p><strong>{errorMessage}</strong></p>
        </div>
    )
}


export default Error