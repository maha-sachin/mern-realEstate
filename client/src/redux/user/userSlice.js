import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    loading : false,
    error : null,
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state)=>{
            state.loading = true
        },
        signInSucess : (state,action)=>{
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        signInFailure: (state,action)=>{
            state.error  = action.payload
            state.loading = false
            
        },
    }
})

export const {signInFailure,signInStart,signInSucess} = userSlice.actions;
export default userSlice.reducer