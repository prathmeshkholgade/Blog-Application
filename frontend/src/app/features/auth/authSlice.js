import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

const initialState = {
  user: null,
};

export const signUp = createAsyncThunk(
  "user/signup",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/user/register`, data, {
        withCredentials: true,
      });
      return response.data.registerUser;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
  }
);

export const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
  try {
    const response = await axios.post(`${baseUrl}/user/login`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data || err.message);
  }
});

export const authenticateUser = createAsyncThunk(
  "user/authenticate",
  async (data, thunkAPI) => {
    try {
      const res = await axios.get(
        `${baseUrl}/user/profile`,

        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      const res = await axios.post(`${baseUrl}/user/logout`, {
        withCredentials: true,
      });
      localStorage.clear("token");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
