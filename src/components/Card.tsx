import { useState } from "react";
import { getEmojiForCountry } from "../logic.js";

export default function Card({
  country,
  borders,
  progress,
  rightAnswers,
  setRigthAnswers,
}) {
  // function cardClick(e) {
  // 	if (borders.includes(card .code)) {

  // 		updateProgressBar(borders.length, gameState);

  // 		if (gameState.progressBarCounter === borders.length)

  // 			endGameState(borders, gameState);

  // 		gameState.score.textContent -= -5;

  // 	} else {

  // 		card.card.classList.add("neighbour-is-invalid");

  // 		gameState.wrongAnswersCounter++;

  // 		if (gameState.wrongAnswersCounter === borders.length)

  // 			endGameState(borders, gameState);

  // 		gameState.score.textContent -= 3;
  // 	}
  // }
  const [cardState, setCardState] = useState("");

  const handleCardClick = target => {
    if (borders.includes(country.code3)) {
      setCardState("neighbour-is-valid");
      setRigthAnswers(prevValue => prevValue + 1);
      progress((100 * rightAnswers) / borders.length);
    } else {
      setCardState("neighbour-is-invalid");
    }
  };

  return (
    <article className={cardState} onClick={handleCardClick}>
      <div>{getEmojiForCountry(country.code)}</div>
      <p>{country.name}</p>
    </article>
  );
}
