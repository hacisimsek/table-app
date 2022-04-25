import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async () => {
	const response = await axios(`${process.env.REACT_APP_API_BASE_URL}/agents`);
	return response.data;
});

export const charactersSlice = createSlice({
	name: 'characters',
	initialState: {
		items: [],
		status: 'idle',
	},
	reducers: {},
	extraReducers: {
		[fetchCharacters.pending]: (state, action) => {
			state.status = 'loading';
		},
		[fetchCharacters.fulfilled]: (state, action) => {
			state.items = [...state.items, ...action.payload];
			state.status = 'succeeded';
		},
		[fetchCharacters.failed]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message || action.error;
		},
	},
});

export default charactersSlice.reducer;
