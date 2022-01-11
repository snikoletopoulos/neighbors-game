import { useContext } from "react";
import styles from "./Title.module.scss";
import GameInfoContext from "../store/game-info-context";

import { getEmojiForCountry } from "../logic";

const Title = () => {
  const { mainCountry } = useContext(GameInfoContext);

  return (
    <section className={styles["selected-country"]}>
      <span className={styles["selected-country__flag"]}>
        {mainCountry?.cca2 && getEmojiForCountry(mainCountry?.cca2)}
      </span>
      <h1 className={styles["selected-country__name"]}>
        {mainCountry?.name.common ?? "Loading..."}
      </h1>
    </section>
  );
};

export default Title;
