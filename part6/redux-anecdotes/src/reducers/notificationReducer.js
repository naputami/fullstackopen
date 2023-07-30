import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
    name: 'notification',
    initialState: "",
    reducers: {
        setNotification(state, action){
            state = `You voted ${action.payload.content} `
            return state
        },
        removeNotification(state){
            state = ''
            return state
        }
    }

})

export const {setNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer