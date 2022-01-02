import { useState, useEffect } from "react";
import "./global.scss";

import Sidebar from "./components/Sidebar";
import Title from "./components/Title";
import ProgressBar from "./components/ProgressBar";
import CardArea from "./components/Neighbors/CardArea";
import Card from "./components/Neighbors/Card";

import {
  fetchCountries,
  pickRandomCountryWithBorders,
  cardPick,
  filterCountries
} from "./logic";

import type ICountry from "./components/types/country.interface";

let mainCountryHistory: ICountry[] = [];
let noBorderCountries: ICountry[] = [];
let countries: ICountry[] = [];

const App = () => {
  const [progress, setProgress] = useState(0);
  const [countryCards, setCountryCards] = useState<ICountry[]>([]);
  const [gameState, setGameState] = useState<IGameState>({
    round: 1,
    score: 0,
    mainCountry: {
      name: { official: "Loading", common: "Loading" },
      cca2: "",
      borders: [],
    },
    hasGameEnded: false,
    rightAnswers: 0,
  });

  //Fetching all the countries data
  useEffect(() => {
    (async () => {
      countries = await fetchCountries();
      noBorderCountries = filterCountries(countries);
      setGameState(
        (prevValue: IGameState): IGameState => ({
          ...prevValue,
          mainCountry: pickRandomCountryWithBorders(
            noBorderCountries,
            mainCountryHistory
          ),
        })
      );
    })();
  }, []);

  // Updating the cards when the title changes
  useEffect(() => {
    setCountryCards(cardPick(gameState.mainCountry as ICountry, countries));
  }, [gameState.mainCountry]);

  // Reseting the game
  const gameReset = () => {
    if (!confirm("Σίγουρα; Θα χάσετε όλο σας το σκορ!")) return;
    setProgress(0);
    setGameState(prevValue => ({
      ...prevValue,
      mainCountry: pickRandomCountryWithBorders(
        noBorderCountries,
        mainCountryHistory
      ),
      round: 1,
      hasGameEnded: false,
    }));
    mainCountryHistory = [];
  };

  // Going to the next round
  const nextRound = () => {
    setProgress(0);
    setGameState(prevValue => ({
      ...prevValue,
      mainCountry: pickRandomCountryWithBorders(
        noBorderCountries,
        mainCountryHistory
      ),
      round: ++prevValue.round,
      hasGameEnded: false,
    }));
  };

  const handleRightAnswer = () => {
    setGameState(prevValue => ({
      ...prevValue,
      rightAnswers: prevValue.rightAnswers + 1,
    }));
  };

  return (
    <div>
      <div className="game-panel">
        <Sidebar
          round={gameState.round}
          score={gameState.score}
          gameState={gameState.hasGameEnded}
          reset={gameReset}
          next={nextRound}
        />
        <main>
          <Title country={gameState.mainCountry} />
          <ProgressBar progress={progress} />
          <CardArea>
            {countryCards.map((card, index) => (
              <Card
                key={index}
                country={card}
                borders={gameState.mainCountry.borders as string[] ?? []}
                progress={setProgress}
                rightAnswers={gameState.rightAnswers}
                setRigthAnswers={handleRightAnswer}
              />
            ))}
          </CardArea>
        </main>
      </div>
    </div>
  );
};

export default App;

interface IGameState {
  round: number;
  score: number;
  mainCountry: ICountry | ILoadingCountry;
  hasGameEnded: boolean;
  rightAnswers: number;
}

export interface ILoadingCountry {
  name: {
    official: string;
    common: string;
  };
  cca2: string;
  borders: ICountry[];
}
