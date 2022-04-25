import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCases = createAsyncThunk('cases/fetchCases', async () => {
	const response = await axios(`${process.env.REACT_APP_API_BASE_URL}/cases`);
	return response.data;
});

export const addCaseAsync = createAsyncThunk('cases/addCaseAsync', async (newCase) => {
	const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/cases`, newCase);
	return response.data;
});

export const removeCaseAsync = createAsyncThunk('cases/removeCaseAsync', async (id) => {
	const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/cases/${id}`);
	return response.data;
});

export const editCaseAsync = createAsyncThunk('cases/editCaseAsync', async (newCase) => {
	const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/cases/${newCase.id}`, newCase);
	return response.data;
});

const casesSlice = createSlice({
	name: 'cases',
	initialState: {
		items: [],
		status: 'idle',
	},
	reducers: {},
	extraReducers: {
		// get cases
		[fetchCases.pending]: (state, action) => {
			state.status = 'loading';
		},
		[fetchCases.fulfilled]: (state, action) => {
			state.items = [...state.items, ...action.payload];
			state.status = 'succeeded';
		},
		[fetchCases.failed]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message || action.error;
		},
		// Add case
		[addCaseAsync.pending]: (state, action) => {
			state.status = 'loading';
		},
		[addCaseAsync.fulfilled]: (state, action) => {
			state.items = [...state.items, action.payload];
			state.status = 'succeeded';
		},
		[addCaseAsync.failed]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message || action.error;
		},
		// Remove case
		[removeCaseAsync.pending]: (state, action) => {
			state.status = 'loading';
		},
		[removeCaseAsync.fulfilled]: (state, action) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
			state.status = 'succeeded';
		},
		[removeCaseAsync.failed]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message || action.error;
		},
		// Edit case
		[editCaseAsync.pending]: (state, action) => {
			state.status = 'loading';
		},
		[editCaseAsync.fulfilled]: (state, action) => {
			state.items = state.items.map((item) => {
				if (item.id === action.payload.id) {
					return action.payload;
				}
				return item;
			});
			state.status = 'succeeded';
		},
		[editCaseAsync.failed]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message || action.error;
		},
	},
});

export default casesSlice.reducer;
