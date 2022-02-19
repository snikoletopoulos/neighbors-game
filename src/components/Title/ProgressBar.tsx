import { useState, useEffect, useContext } from "react";
import styles from "./ProgressBar.module.scss";
import GameInfoContext from "../../store/Context/game-info-context";

const ProgressBar = () => {
	const gameInfo = useContext(GameInfoContext);
	const [progress, setProgress] = useState(0);

	const totalCorrectAnswers = gameInfo.mainCountry?.borders?.length ?? 0;

	useEffect(() => {
		const progress =
			(100 * gameInfo.roundInfo.rightAnswers) / totalCorrectAnswers;
		setProgress(progress);
	}, [gameInfo.mainCountry, gameInfo.roundInfo.rightAnswers]);

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
