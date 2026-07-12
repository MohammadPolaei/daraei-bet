export interface PredictionAnswer {
	question_id: string;
	option_id: string;
	leverage: string;
}

export interface SubmitPredictionPayload {
	game_id: string;
	answers: PredictionAnswer[];
}
