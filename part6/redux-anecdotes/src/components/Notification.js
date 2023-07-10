import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toggleAndSetNotification } from "../slices/notificationSlice"

const Notification = ({notificationMessage}) => {
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'pink',
    textColor:'white'
  }
  
  return(
    <div style={style}>
      {notificationMessage}
    </div>
  )
}

export default Notification