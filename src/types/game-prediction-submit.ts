export interface Predictions {
	penalty: boolean;
	team1Prediction: number;
	team2Prediction: number;
	userLeverage: number;
}

export interface PredictionSubmitRequest {
	gameId: string;
	predictions: Predictions;
}

export interface PredictionSubmitResponse {
	success: boolean;
	message: string;
	data: any;
}
