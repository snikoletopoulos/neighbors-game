import styles from "./Title.module.scss";

import { getEmojiForCountry } from "../logic";
import type ICountry from "./types/country.interface";
import type { ILoadingCountry } from "../App";

const Title = ({ country }: Props) => (
  <section className={styles["selected-country"]}>
    <span className={styles["selected-country__flag"]}>
      {getEmojiForCountry(country.cca2)}
    </span>
    <h1 className={styles["selected-country__name"]}>{country.name.common}</h1>
  </section>
);

export default Title;

interface Props {
  country: ICountry | ILoadingCountry;
}
