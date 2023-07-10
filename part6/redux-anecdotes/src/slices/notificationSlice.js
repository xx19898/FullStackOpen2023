import { createSlice } from "@reduxjs/toolkit"

const initialState = {notificationMessage:'',notificationStatus: false,timeoutId:null}

export const notificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers:{
        setNotificationMessage(state,action){
            state.notificationMessage = action.payload
        },
        toggleNotification(state,action){
            state.notificationStatus = action.payload
        },
        toggleAndSetNotification(state,action){
            state.notificationMessage = action.payload.notificationMessage
            state.notificationStatus = action.payload.notificationStatus
        },
        setTimeOutId(state,action){
            state.timeoutId = action.payload
        }
    }
})


export const setNotificationThunk = (text,time) => {
    return async (dispatch,getState) => {
        if(getState().notification.timeoutId != null) clearTimeout(getState().notification.timeoutId)
        dispatch(toggleAndSetNotification({notificationMessage:text,notificationStatus:true}))
        let timeoutId = setTimeout(() => dispatch(toggleAndSetNotification({notificationMessage:'',notificationStatus:false}))
        ,time)
        dispatch(setTimeOutId(timeoutId))
    }
}



export const {setNotificationMessage,toggleNotification,toggleAndSetNotification,setTimeOutId} = notificationSlice.actions

export const notificationReducer = notificationSlice.reducer

