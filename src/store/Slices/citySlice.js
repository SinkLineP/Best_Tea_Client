import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {HTTP, DOMAIN_SERVER, PORT} from "Variables/ServerConfig";
import {initialState} from "../States/InitialStateCity";

export const fetchCities = createAsyncThunk(
  "allCitiesRussia/fetchCity",
  async function(_, {rejectWithValue}) {
    try {
      const response = await fetch(`${HTTP}://${DOMAIN_SERVER}:${PORT}/allCitiesRussia`);
      if (!response.ok) {
        throw new Error("Server Error!");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
}

const citySlice = createSlice({
  name: "citySlice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCities.pending]: (state) => {
      state.status = "loading";
      state.error = "null";
    },
    [fetchCities.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.cityData = action.payload;
    },
    [fetchCities.rejected]: setError,
  }
});

export default citySlice.reducer;