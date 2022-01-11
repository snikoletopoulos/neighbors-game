import { useState, useEffect, useContext, useCallback } from "react";
import styles from "./CountryCard.module.scss";
import GameInfoContext from "../../store/game-info-context";

import Card from "../UI/Card";
import { getEmojiForCountry } from "../../logic.js";
import type ICountry from "../../types/country.interface.js";

const cardStateOptions = {
  correct: "correct",
  incorrect: "incorrect",
  notFound: "not-found",
};

const CountryCard = (props: Props) => {
  const gameInfo = useContext(GameInfoContext);
  const [cardState, setCardState] = useState<string | null>(null);

  useEffect(() => {
    if (cardState === cardStateOptions.correct) return;

    // Validate card
    if (gameInfo.hasGameEnded && isCardCorrect) {
      setCardState(cardStateOptions.notFound);
    }
  }, [gameInfo.hasGameEnded]);

  const isCardCorrect = gameInfo.mainCountry?.borders.includes(
    props.country.cca3
  );

  const handleCardClick = () => {
    if (isCardCorrect) {
      gameInfo.correctAnswer();
      setCardState(cardStateOptions.correct);
    } else {
      gameInfo.incorrectAnswer();
      setCardState(cardStateOptions.incorrect );
    }
    // update progress
  };

  return (
    <Card
      className={`${styles["country-card"]} ${cardState ? styles[cardState] : null}`}
      onClick={!cardState ? handleCardClick : null}
    >
      <div className={styles["country-card__icon"]}>
        {getEmojiForCountry(props.country.cca2)}
      </div>
      <p className={styles["country-card__text"]}>
        {props.country.name.common}
      </p>
    </Card>
  );
};

export default CountryCard;

interface Props {
  country: ICountry;
}
