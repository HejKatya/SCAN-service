import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: ''
}

export const searchParamsSlice = createSlice({
    name: 'searchParams',
    initialState,
    reducers: {
     setSearchParams: (state, action) => {
        state.value = action.payload
     }
    }
 })
 
export const { setSearchParams } = searchParamsSlice.actions
 
export default searchParamsSlice.reducer;