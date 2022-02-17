import type ICountry from "./country.types";

export interface IGameInfoContext {
  countries: ICountry[] | null;
  roundInfo: IRoundInfo;
  mainCountry: IMainCountry | null;
  hasGameEnded: boolean;
  hasWon: boolean;
  resetGame(): void;
  nextRound(): void;
  correctAnswer(): void;
  incorrectAnswer(): void;
}

export interface IRoundInfo {
  round: number;
  score: number;
  rightAnswers: number;
  wrongAnswers: number;
}

export interface IMainCountry extends ICountry {
  borders: string[];
}