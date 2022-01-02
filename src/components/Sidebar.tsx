import styles from "./Sidebar.module.scss";
import Button from "./UI/Button";

const Sidebar = ({ round, score, gameState, reset, next }: Props) => (
  <aside className={styles["sidebar"]} id="sidebar">
    <h1>
      Βρες τους
      <br />
      γείτονες
    </h1>
    <div className="sidebar__info-container">
      <p className="sidebar__info-container__label">Γύρος:</p>
      <p className="sidebar__info-container__value">{round}</p>
      <p className="sidebar__info-container__label">Σκορ:</p>
      <p className="sidebar__info-container__value" id="score">
        {score}
      </p>
    </div>
    <Button active={gameState} onClick={next} id="btn-next-round">
      Επόμενη χώρα
    </Button>
    <Button id="btn-new-game" onClick={reset}>
      Νέο παιχνίδι
    </Button>
  </aside>
);

export default Sidebar;

interface Props {
  round: number;
  score: number;
  gameState: boolean;
  reset: () => void;
  next: () => void;
}
