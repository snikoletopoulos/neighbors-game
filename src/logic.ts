import axios from "axios";
import type ICountry from "./types/country.types";
import { IMainCountry } from "./types/store.types";

export const fetchCountries = async () => {
  const response = await axios.get<ICountry[]>(
    "https://restcountries.com/v3.1/all"
  );

  if (response.status !== 200) {
    throw new Error(response.status.toString());
  }

  return response.data;
};

export const filterCountries = (countries: ICountry[]): ICountry[] =>
  countries.filter((country: ICountry) =>
    Array.isArray(country.borders) ? country.borders.length > 0 : false
  );

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

const shuffleArray = <T>(array: T[]): T[] => {
  for (let length = array.length - 1; length > 0; length--) {
    const elementToBeSwaped = Math.floor(Math.random() * length);
    const temp = array[length];
    array[length] = array[elementToBeSwaped];
    array[elementToBeSwaped] = temp;
  }
  return array;
};

// Returns a flag emoji from a 2-letter country code
export const getEmojiForCountry = (countryCode: string) => {
  const OFFSET = 127397;
  const codeArray = Array.from(countryCode.toUpperCase());
  return String.fromCodePoint(...codeArray.map(c => c.charCodeAt(0) + OFFSET));
};
