import styles from "./Sidebar.module.scss";
import { useSelector, useDispatch } from "helpers/store";
import { roundActions } from "store/round-info-slice/reducers";
import { changeMainCountry } from "store/countries-slice/actions";

import { useTranslation } from "react-i18next";

import Button from "components/UI/Button";

const Sidebar = () => {
	const { t } = useTranslation();
	const roundInfoSlice = useSelector(state => state.roundInfo);
	const dispatch = useDispatch();

	const handleNextRoundClick = () => {
		dispatch(roundActions.nextRound());
		dispatch(changeMainCountry());
	};

	const handleNewGameClick = () => {
		if (!confirm("Are you sure? You will lose all your progress!")) return;

		dispatch(roundActions.resetRound());
		dispatch(changeMainCountry());
	};

	return (
		<aside className={styles["sidebar"]} id="sidebar">
			<h1>
				Find
				<br />
				the Neighbors
			</h1>
			<div className={styles["sidebar__info-container"]}>
				<p className={styles["sidebar__info-container__label"]}>
					{t("round")}:
				</p>
				<p className={styles["sidebar__info-container__value"]}>
					{roundInfoSlice.round}
				</p>
				<p className={styles["sidebar__info-container__label"]}>
					{t("score")}:
				</p>
				<p className={styles["sidebar__info-container__value"]} id="score">
					{roundInfoSlice.score}
				</p>
			</div>
			<Button
				className={styles["sidebar__btn"]}
				active={roundInfoSlice.hasGameEnded}
				onClick={handleNextRoundClick}
			>
				{t("next_round")}
			</Button>
			<Button className={styles["sidebar__btn"]} onClick={handleNewGameClick}>
				{t("new_game")}
			</Button>
		</aside>
	);
};

export default Sidebar;
