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
	const countrySlice = useSelector(state => state.countries);
	const roundInfoSlice = useSelector(state => state.roundInfo);
	const dispatch = useDispatch();

	const [countryCards, setCountryCards] = useState<ICountry[]>([]);

	// Updating the cards when the title changes
	useEffect(() => {
		if (countrySlice.mainCountry && countrySlice.countries) {
			setCountryCards(
				cardPick(countrySlice.mainCountry, countrySlice.countries)
			);
		}
	}, [countrySlice.mainCountry, countrySlice.countries]);

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
