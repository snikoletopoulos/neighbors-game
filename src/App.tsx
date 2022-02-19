import { useState, useEffect, useContext, memo } from "react";
import GameInfoContext from "./store/Context/game-info-context";
import "./global.scss";

import Sidebar from "./components/Sidebar/Sidebar";
import Title from "./components/Title/Title";
import ProgressBar from "./components/Title/ProgressBar";
import CardArea from "./components/Neighbors/CardArea";
import CountryCard from "./components/Neighbors/CountryCard";

import { cardPick } from "./logic";
import ICountry from "./types/country.types.js";

const App = () => {
	const gameInfo = useContext(GameInfoContext);
	const [countryCards, setCountryCards] = useState<ICountry[]>([]);

	// Updating the cards when the title changes
	useEffect(() => {
		if (gameInfo.mainCountry && gameInfo.countries) {
			setCountryCards(cardPick(gameInfo.mainCountry, gameInfo.countries));
		}
	}, [gameInfo.mainCountry, gameInfo.countries]);

	const modalMessage = gameInfo.hasWon
		? "You won! Congratulations!"
		: "You lost. Try again!";

	return (
		<div className="game-panel">
			<Sidebar />
			<main>
				<Title country={gameInfo.mainCountry} />
				<ProgressBar />
				<CardArea showModal={gameInfo.hasGameEnded} message={modalMessage}>
					{countryCards.map(country => (
						<CountryCard
							key={`${gameInfo.roundInfo.round}-${country.cca3}`}
							country={country}
						/>
					))}
				</CardArea>
			</main>
		</div>
	);
};

export default memo(App);
