import { useState, useEffect, useContext } from "react";
import GameInfoContext from "./store/game-info-context";
import "./global.scss";

import Sidebar from "./components/Sidebar";
import Title from "./components/Title";
import ProgressBar from "./components/ProgressBar";
import CardArea from "./components/Neighbors/CardArea";
import CountryCard from "./components/Neighbors/CountryCard";

import { cardPick } from "./logic";
import ICountry from "./types/country.interface.js";

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
    ? "Κέρδισες! Συγχαριτήρια"
    : "Έχασες! Ξαναπροσπάθησε!";

  return (
    <div className="game-panel">
      <Sidebar />
      <main>
        <Title /> {/*TODO? have props so it renders for memo */}
        <ProgressBar />
        <CardArea showModal={gameInfo.hasGameEnded} message={modalMessage}>
          {countryCards.map(country => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </CardArea>
      </main>
    </div>
  );
};

export default App;
