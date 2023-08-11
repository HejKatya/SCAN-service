import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: ''
}

export const documentIds = createSlice({
    name: 'documentIds',
    initialState,
    reducers: {
        setDocumentIds: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setDocumentIds } = documentIds.actions

export default documentIds.reducer