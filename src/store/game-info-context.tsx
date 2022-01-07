import { createContext, useState, useEffect, useReducer, useRef } from "react";

import { pickMainCountry, fetchCountries } from "../logic";

import type ICountry from "../types/country.interface";

const defaultValeus: IGameInfoContext = {
  countries: [],
  roundInfo: {
    round: 1,
    score: 0,
    hasGameEnded: false,
    rightAnswers: 0,
  },
  mainCountry: null,
  resetGame: () => {},
  nextRound: () => {},
  correctAnswer: () => {},
  incorrectAnswer: () => {},
};

const GameInfoContext = createContext(defaultValeus);

enum roundActions {
  "NEXT_ROUND",
  "RESET_ROUND",
  "CORRECT_ANSWER",
  "INCORRECT_ANSWER",
}

const roundInfoReducer = (
  state: IRoundInfo,
  action: { type: roundActions }
) => {
  switch (action.type) {
    case roundActions.NEXT_ROUND:
      return {
        ...state,
        round: state.round + 1,
        rightAnswers: 0,
        hasGameEnded: false,
      };
    case roundActions.RESET_ROUND:
      return {
        ...state,
        round: 1,
        score: 0,
        rightAnswers: 0,
        hasGameEnded: false,
      };
    case roundActions.CORRECT_ANSWER:
      return {
        ...state,
        rightAnswers: state.rightAnswers + 1,
        score: state.score + 3,
      };
    case roundActions.INCORRECT_ANSWER:
      return {
        ...state,
        score: state.score - 3,
      };
    default:
      return state;
  }
};

export const GameInfoProvider = (props: Props) => {
  const [roundInfo, dispatch] = useReducer(
    roundInfoReducer,
    defaultValeus.roundInfo
  );

  const [mainCountry, setMainCountry] = useState<IMainCountry | null>(null);
  const countries = useRef<ICountry[]>([]);
  const history = useRef<string[]>([]);

  //Fetching all the countries data
  useEffect(() => {
    (async () => {
      countries.current = await fetchCountries();
      setMainCountry(countries.current.find(country => country.name.common === 'Vietnam') as IMainCountry);//pickMainCountry(countries.current, history.current));
    })();
  }, []);

  // Reseting the game
  const resetGame = () => {
    if (!confirm("Σίγουρα; Θα χάσετε όλο σας το σκορ!")) return;

    dispatch({ type: roundActions.RESET_ROUND });
    setMainCountry(pickMainCountry(countries.current, history.current));
  };

  // Going to the next round
  const nextRound = () => {
    dispatch({ type: roundActions.NEXT_ROUND });
    setMainCountry(pickMainCountry(countries.current, history.current));
  };

  const correctAnswer = () => {
    dispatch({ type: roundActions.CORRECT_ANSWER });
  };

  const incorrectAnswer = () => {
    dispatch({ type: roundActions.INCORRECT_ANSWER });
  };

  return (
    <GameInfoContext.Provider
      value={{
        roundInfo,
        countries: countries.current,
        mainCountry,
        resetGame,
        nextRound,
        correctAnswer,
        incorrectAnswer,
      }}
    >
      {props.children}
    </GameInfoContext.Provider>
  );
};

export default GameInfoContext;

interface Props {
  children: React.ReactNode;
}

interface IGameInfoContext {
  countries: ICountry[] | null;
  roundInfo: IRoundInfo;
  mainCountry: IMainCountry | null;
  resetGame(): void;
  nextRound(): void;
  correctAnswer(): void;
  incorrectAnswer(): void;
}

interface IRoundInfo {
  round: number;
  score: number;
  rightAnswers: number;
  hasGameEnded: boolean;
}

export interface IMainCountry extends ICountry {
  borders: string[];
}
