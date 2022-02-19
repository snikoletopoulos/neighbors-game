import styles from "./Sidebar.module.scss";

import { useSelector, useDispatch } from "src/hooks/store";

import Button from "../UI/Button";

const Sidebar = () => {
	// const gameInfo = useContext(GameInfoContext);
	const roundInfoSlice = useSelector(state => state.roundInfo);
	const dispatch = useDispatch();
	// const { roundInfo, resetGame, nextRound } = gameInfo;

	return (
		<aside className={styles["sidebar"]} id="sidebar">
			<h1>
				Find
				<br />
				the Neighbors
			</h1>
			<div className={styles["sidebar__info-container"]}>
				<p className={styles["sidebar__info-container__label"]}>Round:</p>
				<p className={styles["sidebar__info-container__value"]}>
					{roundInfoSlice.round}
				</p>
				<p className={styles["sidebar__info-container__label"]}>Score:</p>
				<p className={styles["sidebar__info-container__value"]} id="score">
					{roundInfoSlice.score}
				</p>
			</div>
			<Button
				className={styles["sidebar__btn"]}
				active={roundInfoSlice.hasGameEnded}
				onClick={() => dispatch()}
			>
				Next Country
			</Button>
			<Button className={styles["sidebar__btn"]} onClick={() => dispatch()}>
				New Game
			</Button>
		</aside>
	);
};

export default Sidebar;
