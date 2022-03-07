import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IMainCountry } from "types/store.types";
import type ICountry from "types/country.types";

import { pickMainCountry } from "helpers/country";

interface CountriesState {
	mainCountry: IMainCountry | null;
	countries: ICountry[];
	history: string[];
}

const initialState: CountriesState = {
	mainCountry: null,
	countries: [],
	history: [],
};

const countriesSlice = createSlice({
	name: "countries",
	initialState,
	reducers: {
		storeCountries(store, action: PayloadAction<ICountry[]>) {
			store.countries = action.payload;
		},

		getNeighboursOptions(state) {},
	},
});

export const countriesActions = countriesSlice.actions;
export default countriesSlice.reducer;
