import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice.js";
import { AuthReducer } from "./auth/authReducer.js";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (prevMiddleware) =>
    prevMiddleware().concat([apiSlice.middleware]),
});
