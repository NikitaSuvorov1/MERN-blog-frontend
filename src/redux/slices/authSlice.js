import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
  data: null,
  status: "loading",
};

export const fetchAuth = createAsyncThunk("/auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const fetchAuthMe = createAsyncThunk("/auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

export const fetchRegister = createAsyncThunk(
  "/auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuth.pending]: (state, action) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuth.rejected]: (state, action) => {
      state.status = "error";
      state.items = null;
    },

    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuthMe.pending]: (state, action) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuthMe.rejected]: (state, action) => {
      state.status = "error";
      state.items = null;
    },
  },
});

export const selectAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
