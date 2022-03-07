import { useState, useEffect, memo } from "react";
import "./global.scss";
import { useSelector, useDispatch } from "hooks/store";
import { countriesActions } from "store/countries-slice/reducers";

import ICountry from "types/country.types.js";
import { cardPick } from "helpers/country";
import { fetchAllCountries } from "store/countries-slice/actions";

import Sidebar from "components/Sidebar";
import Title from "components/Header/Title";
import ProgressBar from "components/Header/ProgressBar";
import CardArea from "components/Neighbors/CardArea";
import CountryCard from "components/Neighbors/CountryCard";

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
