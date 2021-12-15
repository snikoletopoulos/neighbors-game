import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Title from "./Title";
import ProgressBar from "./ProgressBar";
import CardArea from "./Neighbors/CardArea";
import Card from "./Neighbors/Card";
import {
  fetchCountries,
  pickRandomCountryWithBorders,
  cardPick,
} from "../logic";
import type ICountry from "./types/country.interface";

let mainCountryHistory = [];
let noBorderCountries = [];

const App = () => {
  const [progress, setProgress] = useState(0);
  const [countryCards, setCountryCards] = useState([]);
  const [gameState, setGameState] = useState<IGameState>({
    round: 1,
    score: 0,
    mainCountry: {
      name: "Loading",
      alpha2Code: "",
      borders: [],
    },
    hasGameEnded: false,
    rightAnswers: 0,
  });

  //Fetching all the countries data
  useEffect(() => {
    (async () => {
      noBorderCountries = await fetchCountries();
      setGameState(( prevValue: IGameState ): IGameState => ({
        ...prevValue,
        mainCountry: pickRandomCountryWithBorders(noBorderCountries, mainCountryHistory),
      }));
    })();
  }, []);

  // Updating the cards when the title changes
  useEffect(() => {
    setCountryCards(cardPick(gameState.mainCountry as ICountry));
  }, [gameState.mainCountry]);

  // Reseting the game
  const gameReset = () => {
    //eslint-disable-next-line
    if (!confirm("Σίγουρα; Θα χάσετε όλο σας το σκορ!")) return;
    setProgress(0);
    setGameState(prevValue => ({
      ...prevValue,
      mainCountry: pickRandomCountryWithBorders(noBorderCountries, mainCountryHistory),
      round: 1,
      hasGameEnded: false,
    }));
    mainCountryHistory = [];
  }

  // Going to the next round
  const nextRound = () => {
    setProgress(0);
    setGameState(prevValue => ({
        ...prevValue,
        mainCountry: pickRandomCountryWithBorders(noBorderCountries, mainCountryHistory),
        round: ++prevValue.round,
        hasGameEnded: false,
  });
    )

  const handleRightAnswer = () => {
    setGameState(prevValue => ({
      ...prevValue,
      rightAnswers: prevValue.rightAnswers + 1,
    }));
  }

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
      <div>
        <pre>{JSON.stringify(gameState.mainCountry, null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;

interface IGameState {
    round: number;
    score: number;
    mainCountry: {
      name: string;
      alpha2Code: string;
      borders: string[];
    },
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
