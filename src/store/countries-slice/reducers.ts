import { createSlice } from "@reduxjs/toolkit";
import { IMainCountry } from "../../types/store.types";
import type ICountry from "../../types/country.types";

interface InitialState {
	mainCountry: IMainCountry | null;
	countries: ICountry[];
	history: ICountry[];
}

const initialState: InitialState = {
	mainCountry: null,
	countries: [],
	history: [],
};

const countriesSlice = createSlice({
	name: "countries",
	initialState,
	reducers: {
		pickMainCountry(state) {},

		getNeighboursOptions(state) {},
	},
});

export const actions = countriesSlice.actions;
export default countriesSlice.reducer;