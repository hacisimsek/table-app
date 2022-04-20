import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQuotes = createAsyncThunk('quotes/fetchQuotes', async () => {
    const response = await axios(`${process.env.REACT_APP_API_BASE_URL}/quotes`);
    return response.data;
});

const quotesSlice = createSlice({
  name: 'quotes',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: {
    [fetchQuotes.pending]: (state, action) => {
        state.status = 'loading';
    },
    [fetchQuotes.fulfilled]: (state, action) => {
        state.items = [...state.items, ...action.payload];
        state.status = 'succeeded';
    }
    ,
    [fetchQuotes.failed]: (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || action.error;
    }
  },
});

export default quotesSlice.reducer;