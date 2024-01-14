import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //Sign In Page
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //Profile Page Update
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    //Profile Page Delete
    deleteUserStart: (state) => {
        state.loading = true;
    },
    deleteUserSuccess: (state) => {
        state.loading = false;
        state.currentUser = null;
        state.error = null;
    },
    deleteUserFailure: (state) => {
        state.error = action.payload;
        state.loading = false;
    },

    //Profile Page SignOut/LogOut
    signOutUserStart: (state) => {
        state.loading = true;
    },
    signOutUserSuccess: (state) => {
        state.loading = false;
        state.currentUser = null;
        state.error = null;
    },
    signOutUserFailure: (state) => {
        state.error = action.payload;
        state.loading = false;
    },

  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
