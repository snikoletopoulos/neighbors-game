import { configureStore } from "@reduxjs/toolkit";

import roundInfoReducer from "./round-info-slice/reducers";
import countryReducer from "./countries-slice/reducers";

const store = configureStore({
	reducer: {
		roundInfo: roundInfoReducer,
		countries: countryReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
