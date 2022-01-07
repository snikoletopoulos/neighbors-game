import { useReducer, useEffect, useContext, useCallback } from "react";
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

  const cardStateReducer = useCallback(
    (_: string | null, action: { type: string }) => {
      switch (action.type) {
        case cardStateOptions.correct:
          return styles[cardStateOptions.correct];
        case cardStateOptions.incorrect:
          return styles[cardStateOptions.incorrect];
        case cardStateOptions.notFound:
          return styles[cardStateOptions.notFound];
        default:
          return null;
      }
    },
    []
  );

  const [cardState, dispatch] = useReducer(cardStateReducer, null);

  useEffect(() => {
    if (cardState === cardStateOptions.correct) return;

    // validate card
    if (gameInfo.hasGameEnded && isCardCorrect()) {
      dispatch({ type: cardStateOptions.notFound });
    }
  }, [gameInfo.hasGameEnded]);

  const isCardCorrect = useCallback(
    () => gameInfo.mainCountry?.borders.includes(props.country.cca3),
    [gameInfo.mainCountry, props.country]
  );

  const handleCardClick = () => {
    dispatch({
      type: isCardCorrect()
        ? cardStateOptions.correct
        : cardStateOptions.incorrect,
    });
    // update progress
  };

  return (
    <Card
      className={`${styles["country-card"]} ${cardState}`}
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
