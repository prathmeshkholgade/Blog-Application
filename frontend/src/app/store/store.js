import { configureStore } from "@reduxjs/toolkit";
import postReducers from "../features/post/postSlice";
import authReducers from "../features/auth/authSlice";
export const store = configureStore({
  reducer: {
    Post: postReducers,
    Auth: authReducers,
  },
});
