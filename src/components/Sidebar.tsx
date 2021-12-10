const Sidebar = ({ round, score, gameState, reset, next }: Props) => (
  <aside id="sidebar">
    <h1>
      Βρες τους
      <br />
      γείτονες
    </h1>
    <div className="game-info-container">
      <p className="game-label">Γύρος:</p>
      <p className="game-value">{round}</p>
      <p className="game-label">Σκορ:</p>
      <p className="game-value" id="score">
        {score}
      </p>
    </div>
    <p
      className={"btn" + (gameState ? " btn-active" : "")}
      onClick={gameState ? next : undefined}
      id="btn-next-round"
    >
      Επόμενη χώρα
    </p>
    <p className="btn btn-active" id="btn-new-game" onClick={reset}>
      Νέο παιχνίδι
    </p>
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