import { useState } from "react";
import { getEmojiForCountry } from "../../logic.js";
import type ICountry from "../types/country.interface.js";

const Card = (props: Props) => {
  // function cardClick(e) {
  // 	if (props.borders.includes(card .code)) {

  // 		updateProgressBar(props.borders.length, gameState);

  // 		if (gameState.progressBarCounter === props.borders.length)

  // 			endGameState(props.borders, gameState);

  // 		gameState.score.textContent -= -5;

  // 	} else {

  // 		card.card.classList.add("neighbour-is-invalid");

  // 		gameState.wrongAnswersCounter++;

  // 		if (gameState.wrongAnswersCounter === props.borders.length)

  // 			endGameState(props.borders, gameState);

  // 		gameState.score.textContent -= 3;
  // 	}
  // }
  const [cardState, setCardState] = useState<string>("");

  const handleCardClick = () => {
    if (props.borders.includes(props.country.cca3)) {
      setCardState("neighbour-is-valid");
      props.setRigthAnswers();
      props.progress((100 * props.rightAnswers) / props.borders.length);
    } else {
      setCardState("neighbour-is-invalid");
    }
  };

  return (
    <article className={cardState} onClick={handleCardClick}>
      <div>{getEmojiForCountry(props.country.cca2)}</div>
      <p>{props.country.name.common}</p>
    </article>
  );
};

export default Card;

interface Props {
  country: ICountry;
  borders: string[];
  progress: (value: number) => void;
  rightAnswers: number;
  setRigthAnswers: () => void;
}
