// reducers/prediction-form-reducer.ts
import { PredictionPayload, initialFormState } from "@/types/prediction-form";

export function predictionFormReducer(
	state: PredictionPayload,
	action: PredictionPayload extends any ? any : any // برای سازگاری تایپ‌ها
): PredictionPayload {
	const currentPrediction = state.predictions[0];

	switch (action.type) {
		case "SET_GAME_ID":
			return {
				...state,
				game_id: action.payload,
			};

		case "SET_PENALTY": {
			const isPenalty = action.payload;
			if (isPenalty) {
				// اگر پنالتی فعال شد، مقادیر گل‌ها را کلاً از آبجکت حذف می‌کنیم
				const { score_team1_predicted, score_team2_predicted, ...rest } =
					currentPrediction;
				return {
					...state,
					predictions: [
						{
							...rest,
							predicts_penalty: true,
						},
					] as any,
				};
			} else {
				// اگر پنالتی غیرفعال شد، مقادیر اولیه صفر را به گل‌ها می‌دهیم
				return {
					...state,
					predictions: [
						{
							...currentPrediction,
							predicts_penalty: false,
							score_team1_predicted: 0,
							score_team2_predicted: 0,
						},
					],
				};
			}
		}

		case "SET_TEAM1":
			// اگر پنالتی فعال باشد، اجازه ثبت گل نمی‌دهیم
			if (currentPrediction.predicts_penalty) {
				return state;
			}
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
			// اگر پنالتی فعال باشد، اجازه ثبت گل نمی‌دهیم
			if (currentPrediction.predicts_penalty) {
				return state;
			}
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
