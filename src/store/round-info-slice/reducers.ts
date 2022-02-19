import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
	round: number;
	score: number;
	rightAnswers: number;
	wrongAnswers: number;
	hasGameEnded: boolean;
	hasWon: boolean;
}

const initialState: InitialState = {
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
		},

		resetRound: state => {
			state.round = 1;
			state.score = 0;
			state.rightAnswers = 0;
			state.wrongAnswers = 0;
		},

		correctAnswer: state => {
			state.score += 5;
			state.rightAnswers++;
		},

		incorrectAnswer: state => {
			state.score -= 3;
			state.wrongAnswers++;
		},
	},
});

export const actions = roundInfoSlice.actions;
export default roundInfoSlice.reducer;
