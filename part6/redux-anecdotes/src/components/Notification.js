import { useContext, useEffect, useReducer, useState } from "react"
import { useDispatch } from "react-redux"
import { toggleAndSetNotification } from "../slices/notificationSlice"
import { NotificationContext } from "../App"



const Notification = () => {
  const [state,dispatch] = useContext(NotificationContext)
  useEffect(() => {
    if(state.timeoutId != null) clearTimeout(state.timeoutId)
    const timeout = setTimeout(() => dispatch({type:'NONE'}),5000)
    return () => {
      clearTimeout(timeout)
    }
  },[state.message])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    backgroundColor: state.color,
    textColor:'white'
  }
  
  return(
    <div style={style}>
      {state.message}
    </div>
  )
}

export default Notification