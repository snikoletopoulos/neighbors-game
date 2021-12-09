import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Title from "./Title";
import ProgressBar from "./ProgressBar";
import CardArea from "./CardArea";
import Card from "./Card";
import {
  fetchCountries,
  countries,
  pickRandomCountry,
  cardPick,
} from "../logic";

let mainCountryHistory = [];
let noBorderCountries = [];

const App = () => {
  const [progress, setProgress] = useState(0);
  const [countryCards, setCountryCards] = useState([]);
  const [gameState, setGameState] = useState({
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
      setGameState(prevValue => ({
        ...prevValue,
        mainCountry: pickRandomCountry(noBorderCountries, mainCountryHistory),
      }));
    })();
  }, []);

  // Updating the cards when the title changes
  useEffect(() => {
    setCountryCards(cardPick(gameState.mainCountry));
  }, [gameState.mainCountry]);

  // Reseting the game
  const gameReset = () => {
    //eslint-disable-next-line
    if (!confirm("Σίγουρα; Θα χάσετε όλο σας το σκορ!")) return;
    setProgress(0);
    setGameState(prevValue => ({
      ...prevValue,
      mainCountry: pickRandomCountry(noBorderCountries, mainCountryHistory),
      round: 1,
      hasGameEnded: false,
    }));
    mainCountryHistory = [];
  }

  // Going to the next round
  const Round = () => {
    setProgress(0);
    setGameState(prevValue => {
      return {
        ...prevValue,
        mainCountry: pickRandomCountry(noBorderCountries, mainCountryHistory),
        round: ++prevValue.round,
        hasGameEnded: false,
      };
    });
  }

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
                borders={gameState.mainCountry.borders}
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
