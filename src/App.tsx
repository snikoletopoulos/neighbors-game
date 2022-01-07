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
  const gameState = useContext(GameInfoContext);
  const [countryCards, setCountryCards] = useState<ICountry[]>([]);

  // Updating the cards when the title changes
  useEffect(() => {
    if (gameState.mainCountry && gameState.countries) {
      setCountryCards(cardPick(gameState.mainCountry, gameState.countries));
    }
  }, [gameState.mainCountry, gameState.countries]);

  return (
    <div className="game-panel">
      <Sidebar />
      <main>
        <Title /> {/*TODO? have props so it renders for memo */}
        <ProgressBar />
        <CardArea>
          {countryCards.map(country => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </CardArea>
      </main>
    </div>
  );
};

export default App;
