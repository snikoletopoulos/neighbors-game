import axios, { AxiosError } from "axios";
import { getAxiosError } from "helpers/axios";
import type ICountry from "types/country.types";
import { IMainCountry } from "types/store.types";
import { shuffleArray } from "helpers/util";

export const fetchCountries = async () => {
	try {
		const response = await axios.get<ICountry[]>(
			"https://restcountries.com/v3.1/all"
		);

		return response.data;
	} catch (error) {
		return getAxiosError(error as AxiosError);
	}
};

export const pickMainCountry = (
	countries: ICountry[],
	history: string[]
): IMainCountry => {
	const mainCountry = shuffleArray<ICountry>(countries)[0];

	if (Array.isArray(mainCountry.borders) && mainCountry.borders.length > 0) {
		const isInHistory = history.includes(mainCountry.name.common);
		if (!isInHistory) {
			history.push(mainCountry.name.common);

			return mainCountry as IMainCountry;
		}
	}

	return pickMainCountry(countries, history);
};

export const filterCountries = (countries: ICountry[]): ICountry[] =>
	countries.filter((country: ICountry) =>
		Array.isArray(country.borders) ? country.borders.length > 0 : false
	);

export const cardPick = (
	mainCountry: IMainCountry,
	countries: ICountry[]
): ICountry[] => {
	const selectedCountries = [
		...countries.filter(country => mainCountry.borders.includes(country.cca3)),
	];
	const shuffledCountries = shuffleArray<ICountry>(countries);

	for (
		let i = 0;
		selectedCountries.length < mainCountry.borders!.length * 3;
		i++
	) {
		if (
			!mainCountry.borders?.includes(shuffledCountries[i].cca3) &&
			!(shuffledCountries[i] === mainCountry)
		)
			selectedCountries.push(shuffledCountries[i]);
	}

	return shuffleArray(selectedCountries);
};
