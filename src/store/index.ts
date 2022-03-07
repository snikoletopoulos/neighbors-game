import { configureStore } from "@reduxjs/toolkit";

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

export default store;
