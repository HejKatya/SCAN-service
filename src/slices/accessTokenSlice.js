import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: ''
}

export const accessTokenSlice = createSlice({
   name: 'accessToken',
   initialState,
   reducers: {
    setAccessToken: (state, action) => {
        state.value = action.payload
    }
   }
})

export const { setAccessToken } = accessTokenSlice.actions

export default accessTokenSlice.reducer;