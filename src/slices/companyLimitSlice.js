import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: ''
}

export const companyLimitSlice = createSlice({
    name: 'companyLimit',
    initialState,
    reducers: {
        setCompanyLimit: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setCompanyLimit } = companyLimitSlice.actions

export default companyLimitSlice.reducer