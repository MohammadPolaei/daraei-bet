// types/prediction-form.ts
export interface PredictionItem {
	predicts_penalty: boolean;
	score_team1_predicted?: number;
	score_team2_predicted?: number;
	leverage: number;
}
export interface PredictionPenaltyItem {
	predicts_penalty: boolean;
	leverage: number;
}

export interface PredictionPayload {
	game_id: string;
	predictions: PredictionItem[];
}

export type PredictionFormAction =
	| { type: "SET_GAME_ID"; payload: string }
	| { type: "SET_PENALTY"; payload: boolean }
	| { type: "SET_TEAM1"; payload: number }
	| { type: "SET_TEAM2"; payload: number }
	| { type: "SET_LEVERAGE"; payload: number }
	| { type: "RESET_FORM" };

export const initialFormState: PredictionPayload = {
	game_id: "",
	predictions: [
		{
			predicts_penalty: false,
			score_team1_predicted: 0,
			score_team2_predicted: 0,
			leverage: 1,
		},
	],
};
