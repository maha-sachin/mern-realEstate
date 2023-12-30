import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSucess: (state, action) => {
      console.info(`signInSucess action ${JSON.stringify(action)}`);
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      console.info(`updateUserSuccess action ${JSON.stringify(action)}`);
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) =>{
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null
      state.loading = false;
      state.error = null
    },
    deleteUserFailure: (state,action) =>{
      state.error = action.payload
      state.loading = false
    },
    signoutUserStart: (state) =>{
      state.loading = true;
    },
    signoutUserSuccess: (state) => {
      state.currentUser = null
      state.loading = false;
      state.error = null
    },
    signoutUserFailure: (state,action) =>{
      state.error = action.payload
      state.loading = false
    }
  },
});

export const {
  signInFailure,
  signInStart,
  signInSucess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,signoutUserFailure,
  signoutUserStart,signoutUserSuccess
} = userSlice.actions;
export default userSlice.reducer;
