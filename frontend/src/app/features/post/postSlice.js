import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

const initialState = {
  Posts: null,
  Post: null,
};

export const fetchSinglePost = createAsyncThunk(
  "post/fetchsiglepost",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/blog/posts/${id}`, {
        withCredentials: true,
      });
      console.log(response);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
  }
);
export const fetchAllPost = createAsyncThunk(
  "post/fetchpost",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/blog/posts`, data, {
        withCredentials: true,
      });
      console.log(response);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
  }
);
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${baseUrl}/blog/posts/${id}`, {
        withCredentials: true,
      });
      console.log(response);
      fetchAllPost();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
  }
);
export const updatePost = createAsyncThunk(
  "post/editpost",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${baseUrl}/blog/posts/edit/${id}`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // Or JSON, depending on your request
          },
        }
      );
      console.log(response);

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createPost = createAsyncThunk(
  "post/create",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/blog/add`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPost.fulfilled, (state, action) => {
        state.Posts = action.payload;
      })
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.Post = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {})
      .addCase(deletePost.fulfilled, (state, action) => {})
      .addCase(updatePost.fulfilled, (state, action) => {});
  },
});

export default postSlice.reducer;
