import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RoundInfoState {
	round: number;
	score: number;
	rightAnswers: number;
	wrongAnswers: number;
	hasGameEnded: boolean;
	hasWon: boolean;
}

const initialState: RoundInfoState = {
	round: 1,
	score: 0,
	rightAnswers: 0,
	wrongAnswers: 0,
	hasGameEnded: false,
	hasWon: false,
};

const roundInfoSlice = createSlice({
	name: "roundInfo",
	initialState,
	reducers: {
		nextRound: state => {
			state.round++;
			state.rightAnswers = 0;
			state.wrongAnswers = 0;
			state.hasGameEnded = false;
			state.hasWon = false;
		},

		resetRound: state => {
			state.round = 1;
			state.score = 0;
			state.rightAnswers = 0;
			state.wrongAnswers = 0;
			state.hasGameEnded = false;
			state.hasWon = false;
		},

		correctAnswer: state => {
			state.score += 5;
			state.rightAnswers++;
		},

		incorrectAnswer: state => {
			state.score -= 3;
			state.wrongAnswers++;
		},

		gameEnded(state, { payload }: PayloadAction<boolean>) {
			state.hasGameEnded = true;
			state.hasWon = payload;
		},
	},
});

export const roundActions = roundInfoSlice.actions;
export default roundInfoSlice.reducer;
