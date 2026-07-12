export interface PredictionAnswer {
	question_id: string;
	option_id: string;
	leverage: string;
}

export interface SubmitOptionPredictionPayload {
	game_id: string;
	answers: PredictionAnswer[];
}

export interface SubmitOptionPredictionResponse {
	success: boolean;
	message?: string;
	data?: unknown;
}
