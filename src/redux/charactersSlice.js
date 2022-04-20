import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const char_limit = 12;

export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async (page) => {
  const response = await axios(`${process.env.REACT_APP_API_BASE_URL}/characters?limit=${char_limit}&offset=${char_limit * page}`);
  return response.data;
});

export const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    items: [],
    status: "idle",
    page: 0,
    hasNextPage: true,
  },
  reducers: {},
  extraReducers: {
    [fetchCharacters.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchCharacters.fulfilled]: (state, action) => {
      state.items = [...state.items, ...action.payload];
      state.status = "succeeded";
      state.page += 1;
      state.hasNextPage = action.payload.length === char_limit;
    },
    [fetchCharacters.failed]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message || action.error;
    },
  },
});

export default charactersSlice.reducer;
