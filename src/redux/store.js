import { configureStore } from '@reduxjs/toolkit';

import charactersSlice from './charactersSlice';
import casesSlice from './casesSlice';

export const store = configureStore({
	reducer: {
		// reducer,
		characters: charactersSlice,
		cases: casesSlice,
	},
	devTools: true,
});
