import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
    name: 'notification',
    initialState: "",
    reducers: {
        setNotification(state, action){
            return action.payload
        },
        removeNotification(state, action){
            return ''
        }
    }

})

export const showNotification = (content, time) => {
    return dispatch => {
        dispatch(setNotification(content))
        setTimeout(()=> {
            dispatch(removeNotification())
        }, time * 1000)
    }
}

export const {setNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer