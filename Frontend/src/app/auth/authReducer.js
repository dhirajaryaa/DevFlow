import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: true,
  isAuthorized: false,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthorized = true;
      state.isLoading = false;
    },
    logoutUser: () => {
      initialState;
    },
  },
});

export const { setUser, logoutUser } = authReducer.actions;
export const AuthReducer =  authReducer.reducer;
