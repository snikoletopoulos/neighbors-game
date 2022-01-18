import { useContext } from "react";
import styles from "./Sidebar.module.scss";
import GameInfoContext from "../../store/game-info-context";

import Button from "../UI/Button";

const Sidebar = () => {
  const gameInfo = useContext(GameInfoContext);

  const { roundInfo, resetGame, nextRound } = gameInfo;

  return (
    <aside className={styles["sidebar"]} id="sidebar">
      <h1>
        Βρες τους
        <br />
        γείτονες
      </h1>
      <div className={styles['sidebar__info-container']}>
        <p className={styles['sidebar__info-container__label']}>Round:</p>
        <p className={styles['sidebar__info-container__value']}>{roundInfo.round}</p>
        <p className={styles['sidebar__info-container__label']}>Score:</p>
        <p className={styles['sidebar__info-container__value']} id="score">
          {roundInfo.score}
        </p>
      </div>
      <Button
        className={styles["sidebar__btn"]}
        active={gameInfo.hasGameEnded}
        onClick={nextRound}
      >
        Επόμενη χώρα
      </Button>
      <Button className={styles["sidebar__btn"]} onClick={resetGame}>
        Νέο παιχνίδι
      </Button>
    </aside>
  );
};

export default Sidebar;
