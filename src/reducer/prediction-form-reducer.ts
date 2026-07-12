// reducers/prediction-form-reducer.ts
import {
	PredictionFormAction,
	PredictionPayload,
	initialFormState,
} from "@/types/prediction-form";

export function predictionFormReducer(
	state: PredictionPayload,
	action: PredictionFormAction
): PredictionPayload {
	const currentPrediction = state.predictions[0];

	switch (action.type) {
		case "SET_GAME_ID":
			return {
				...state,
				game_id: action.payload,
			};

		case "SET_PENALTY":
			return {
				...state,
				predictions: [
					{
						...currentPrediction,
						predicts_penalty: action.payload,
						score_team1_predicted: action.payload
							? 0
							: currentPrediction.score_team1_predicted,
						score_team2_predicted: action.payload
							? 0
							: currentPrediction.score_team2_predicted,
					},
				],
			};

		case "SET_TEAM1":
			return {
				...state,
				predictions: [
					{
						...currentPrediction,
						score_team1_predicted: action.payload,
					},
				],
			};

		case "SET_TEAM2":
			return {
				...state,
				predictions: [
					{
						...currentPrediction,
						score_team2_predicted: action.payload,
					},
				],
			};

		case "SET_LEVERAGE":
			return {
				...state,
				predictions: [
					{
						...currentPrediction,
						leverage: action.payload,
					},
				],
			};

		case "RESET_FORM":
			return initialFormState;

		default:
			return state;
	}
}
