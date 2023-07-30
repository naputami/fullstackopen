import { createSlice } from "@reduxjs/toolkit"


const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        setKeyword(state, action) {
            return state = action.payload
        }
    }


})

export const {setKeyword} = filterSlice.actions
export default filterSlice.reducer