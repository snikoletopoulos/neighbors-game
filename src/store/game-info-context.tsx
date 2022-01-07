import {
  createContext,
  useState,
  useEffect,
  useReducer,
  useRef,
  useCallback,
} from "react";

import { pickMainCountry, fetchCountries } from "../logic";

import type ICountry from "../types/country.interface";

const defaultValeus: IGameInfoContext = {
  countries: [],
  roundInfo: {
    round: 1,
    score: 0,
    rightAnswers: 0,
    wrongAnswers: 0,
  },
  mainCountry: null,
  hasGameEnded: false,
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
      };
    case roundActions.RESET_ROUND:
      return {
        ...state,
        round: 1,
        score: 0,
        rightAnswers: 0,
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

  const countries = useRef<ICountry[]>([]);
  const history = useRef<string[]>([]);
  const [mainCountry, setMainCountry] = useState<IMainCountry | null>(null);
  const [hasGameEnded, setHasGameEnded] = useState(false);

  //Fetching all the countries data
  useEffect(() => {
    (async () => {
      countries.current = await fetchCountries();
      setMainCountry(countries.current.find(country => country.name.common === 'Vietnam') as IMainCountry);//pickMainCountry(countries.current, history.current));
    })();
  }, []);

  // Reseting the game
  const resetGame = useCallback(() => {
    if (!confirm("Σίγουρα; Θα χάσετε όλο σας το σκορ!")) return;

    dispatch({ type: roundActions.RESET_ROUND });
    setMainCountry(pickMainCountry(countries.current, history.current));
    setHasGameEnded(false);
  }, [countries.current, history.current]);

  // Going to the next round
  const nextRound = useCallback(() => {
    dispatch({ type: roundActions.NEXT_ROUND });
    setMainCountry(pickMainCountry(countries.current, history.current));
  }, [countries.current, history.current]);

  const correctAnswer = useCallback(() => {
    dispatch({ type: roundActions.CORRECT_ANSWER });

  }, []);

  const incorrectAnswer = useCallback(() => {
    dispatch({ type: roundActions.INCORRECT_ANSWER });
  };

  return (
    <GameInfoContext.Provider
      value={{
        roundInfo,
        countries: countries.current,
        mainCountry,
        hasGameEnded,
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
  hasGameEnded: boolean;
  resetGame(): void;
  nextRound(): void;
  correctAnswer(): void;
  incorrectAnswer(): void;
}

interface IRoundInfo {
  round: number;
  score: number;
  rightAnswers: number;
  wrongAnswers: number;
}

export interface IMainCountry extends ICountry {
  borders: string[];
}
