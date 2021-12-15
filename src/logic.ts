import axios from "axios";
import type ICountry from "./components/types/country.interface";

export const fetchCountries = async () => {
  const response = await axios.get("https://restcountries.com/v3.1/all");
  if (response.status !== 200) {
    throw new Error(response.status.toString());
  }
  const countries = response.data;
  return countries.filter((country: ICountry) => country.borders.length > 0);
}

export const pickRandomCountryWithBorders = (noBorderCountries: ICountry[], history): ICountry => {
  const mainCountry = shuffleArray<ICountry>(noBorderCountries)[0];
  if (!history.includes(mainCountry)) {
    history.push(mainCountry);
    return mainCountry;
  } else {
    return pickRandomCountryWithBorders(noBorderCountries, history);
  }
}

export const cardPick = (mainCountry: ICountry): ICountry[] => {
  const neighbours = [
    ...countries.filter(country => mainCountry.borders.includes(country.code3)),
  ];
  const shuffledCountries = shuffleArray<ICountry>(countries);
  for (let i = 0; neighbours.length < mainCountry.borders.length * 3; i++) {
    if (
      !mainCountry.borders.includes(shuffledCountries[i].cca3) &&
      !(shuffledCountries[i] === mainCountry)
    )
      neighbours.push(shuffledCountries[i]);
  }
  return shuffleArray(neighbours);
}

const shuffleArray = <T>(array: Array<T>): Array<T> => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

// Returns a flag emoji from a 2-letter country code
export const getEmojiForCountry = (countryCode: string) => {
  const OFFSET = 127397;
  const codeArray = Array.from(countryCode.toUpperCase());
  return String.fromCodePoint(...codeArray.map(c => c.charCodeAt(0) + OFFSET));
};
