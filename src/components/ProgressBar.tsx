import { useState, useEffect, useContext } from "react";
import styles from "./ProgressBar.module.scss";
import GameInfoContext from "../store/game-info-context";

const ProgressBar = () => {
  const gameState = useContext(GameInfoContext);
  const [progress, setProgress] = useState(0);

  const totalCorrectAnswers = gameState.mainCountry?.borders?.length ?? 0;

  useEffect(() => {
    const progress =
      (100 * gameState.roundInfo.rightAnswers) / totalCorrectAnswers;
    // console.log(progress);
    setProgress(progress);
  }, [gameState.mainCountry, gameState.roundInfo.rightAnswers]);

  return (
    <section id="progress" className={styles["progress-bar"]}>
      <div
        id="current-progress"
        style={{ width: progress + "%" }}
        className={styles["progress-bar__persentage"]}
      ></div>
    </section>
  );
};

export default ProgressBar;
