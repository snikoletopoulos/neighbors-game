import { getEmojiForCountry } from "../logic";
import type ICountry from "./types/country.interface";
import type { ILoadingCountry } from "./App";

const Title = ({ country }: Props) => (
  <section id="my-country">
    <span id="my-country-flag">{getEmojiForCountry(country.cca2)}</span>
    <h1 id="my-country-name">{country.name}</h1>
  </section>
);

export default Title;

interface Props {
  country: ICountry | ILoadingCountry;
}
