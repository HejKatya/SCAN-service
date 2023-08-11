import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: ''
}

export const documentsSlice = createSlice({
   name: 'documents',
   initialState,
   reducers: {
    setDocuments: (state, action) => {
        state.value = action.payload
    }
   }
})

export const { setDocuments } = documentsSlice.actions

export default documentsSlice.reducer;