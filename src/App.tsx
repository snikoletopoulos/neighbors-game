import { useState, useEffect, memo } from "react";
import "./global.scss";
import { useSelector, useDispatch } from "helpers/store";

import { changeMainCountry } from "store/countries-slice/actions";
import ICountry from "types/country-api.types.js";
import { cardPick } from "helpers/country";
import { fetchAllCountries } from "store/countries-slice/actions";

import Sidebar from "components/Sidebar";
import Title from "components/Header/Title";
import ProgressBar from "components/Header/ProgressBar";
import CardArea from "components/Neighbors/CardArea";
import CountryCard from "components/Neighbors/CountryCard";
import { roundActions } from "store/round-info-slice/reducers";

const App = () => {
	const countrySlice = useSelector(state => state.countries);
	const roundInfoSlice = useSelector(state => state.roundInfo);
	const dispatch = useDispatch();

	const [countryCards, setCountryCards] = useState<ICountry[]>([]);

	//Fetching all the countries data
	useEffect(() => {
		(async () => {
			const error = await dispatch(fetchAllCountries());

			if (error) {
				throw new Error("Error fetching countries");
			}

			dispatch(changeMainCountry());
		})();
	}, []);

	// Updating the cards when the title changes
	useEffect(() => {
		if (countrySlice.mainCountry && countrySlice.countries) {
			setCountryCards(
				cardPick(countrySlice.mainCountry, countrySlice.countries)
			);
		}
	}, [countrySlice.mainCountry, countrySlice.countries]);

	useEffect(() => {
		if (!countrySlice.mainCountry) return;

		const hasWon =
			roundInfoSlice.rightAnswers === countrySlice.mainCountry.borders.length;
		const hasLost =
			roundInfoSlice.wrongAnswers === countrySlice.mainCountry.borders.length;

		if (!hasWon && !hasLost) return;

		dispatch(roundActions.gameEnded(hasWon));
	}, [roundInfoSlice.rightAnswers, roundInfoSlice.wrongAnswers]);

	const modalMessage = roundInfoSlice.hasWon
		? "You won! Congratulations!"
		: "You lost. Try again!";

	return (
		<div className="game-panel">
			<Sidebar />
			<main>
				<Title country={countrySlice?.mainCountry} />
				<ProgressBar />
				<CardArea
					showModal={roundInfoSlice?.hasGameEnded}
					message={modalMessage}
				>
					{countryCards.map(country => (
						<CountryCard
							key={`${roundInfoSlice.round}-${country.cca3}`}
							country={country}
						/>
					))}
				</CardArea>
			</main>
		</div>
	);
};

export default memo(App);
