import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: ''
}

export const histogramsSlice = createSlice({
    name: 'histograms',
    initialState,
    reducers: {
     setHistograms: (state, action) => {
        state.value = action.payload
     }
    }
 })
 
export const { setHistograms } = histogramsSlice.actions
 
export default histogramsSlice.reducer;