import { configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";

import roundInfoReducer from "./round-info-slice/reducers";
import countryReducer from "./countries-slice/reducers";

const store = configureStore({
	reducer: {
		roundInfo: roundInfoReducer,
		countries: countryReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			immutableCheck: { ignoredPaths: ["countries/storeCountries"] },
			serializableCheck: { ignoredPaths: ["countries/storeCountries"] },
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppAsyncThunk<T = void> = ThunkAction<
	Promise<T>,
	RootState,
	unknown,
	Action
>;

export default store;
