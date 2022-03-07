import styles from "./Sidebar.module.scss";

import { useSelector, useDispatch } from "hooks/store";
import { roundActions } from "store/round-info-slice/reducers";

import Button from "components/UI/Button";

const Sidebar = () => {
	const roundInfoSlice = useSelector(state => state.roundInfo);
	const dispatch = useDispatch();

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
				onClick={() => dispatch(roundActions.nextRound())}
			>
				Next Country
			</Button>
			<Button
				className={styles["sidebar__btn"]}
				onClick={() => dispatch(roundActions.resetRound())}
			>
				New Game
			</Button>
		</aside>
	);
};

export default Sidebar;
