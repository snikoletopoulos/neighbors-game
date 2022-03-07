import { countriesActions } from "./reducers";
import { AppAsyncThunk } from "store";

import { fetchCountries } from "helpers/country";
import { getAxiosError } from "helpers/axios";
import { AxiosError } from "axios";

export const fetchAllCountries =
	(): AppAsyncThunk<ReturnType<typeof getAxiosError>> => async dispatch => {
		try {
			const countries = await fetchCountries();

			dispatch(countriesActions.storeCountries(countries));
		} catch (error) {
			return getAxiosError(error as AxiosError);
		}
	};
