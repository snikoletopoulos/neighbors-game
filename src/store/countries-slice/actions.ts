import { countriesActions } from "./reducers";
import { ActionCreatorThunk } from "store";

import { fetchCountries, pickMainCountry } from "helpers/country";
import { getAxiosError } from "helpers/axios";
import { AxiosError } from "axios";

export const fetchAllCountries: ActionCreatorThunk<
	ReturnType<typeof getAxiosError>
> = () => async dispatch => {
	try {
		const countries = await fetchCountries();

		dispatch(countriesActions.storeCountries(countries));
	} catch (error) {
		return getAxiosError(error as AxiosError);
	}
};

export const changeMainCountry: ActionCreatorThunk =
	() => async (dispatch, getState) => {
		const state = getState();

		pickMainCountry(state.countries.countries, state.countries.history);
	};
