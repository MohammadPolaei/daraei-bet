export interface PredictionOutcomeItem {
	count: number;
	percentage: number;
}

export interface GamePredictionData {
	game_id: string;
	predictions_count: number;
	outcomes: {
		team1_win: PredictionOutcomeItem;
		draw: PredictionOutcomeItem;
		team2_win: PredictionOutcomeItem;
		penalty: PredictionOutcomeItem;
	};
}

export interface GamePredictionSuccessResponse {
	success: true;
	message: string;
	data: GamePredictionData;
}

export interface GamePredictionErrorResponse {
	success: false;
	message: string;
	data?: null;
}

export type GamePredictionResponse =
	| GamePredictionSuccessResponse
	| GamePredictionErrorResponse;
