import axios from "axios";
import type { ICountry } from "./types";

export async function fetchCountries() {
  const response = await axios.get("https://restcountries.com/v3.1/all");
  if (response.status !== 200) {
    throw new Error(response.status.toString());
  }
  const countries = response.data;
  return countries.filter((country: ICountry) => country.borders.length > 0);
}

export function pickRandomCountryWithBorders(noBorderCountries, history) {
  const mainCountry = shuffleArray(noBorderCountries)[0];
  if (!history.includes(mainCountry)) {
    history.push(mainCountry);
    return mainCountry;
  } else {
    return pickRandomCountryWithBorders(noBorderCountries, history);
  }
}

export function cardPick(mainCountry: ICountry) {
  const neighbours = [
    ...countries.filter(country => mainCountry.borders.includes(country.code3)),
  ];
  const shuffledCountries = shuffleArray<ICountry[]>(countries);
  for (let i = 0; neighbours.length < mainCountry.borders.length * 3; i++) {
    if (
      !mainCountry.borders.includes(shuffledCountries[i]) &&
      !(shuffledCountries[i] === mainCountry)
    )
      neighbours.push(shuffledCountries[i]);
  }
  return shuffleArray(neighbours);
}

// shuffle array https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
// επιστρέφει τον πίνακα array με τα ίδια στοιχεία σε τυχαίες θέσεις
// χρειάζεται π.χ. για την επιλογή μιας τυχαίας χώρας ή τυχαίων γειτόνων
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
