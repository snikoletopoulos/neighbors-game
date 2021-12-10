import { getEmojiForCountry } from "../logic";
import type { ICountry } from "../types";

const Title = ({ country }: Props) => (
  <section id="my-country">
    <span id="my-country-flag">{getEmojiForCountry(country.alpha2Code)}</span>
    <h1 id="my-country-name">{country.name}</h1>
  </section>
);

export default Title;

interface Props {
	country: ICountry;
}