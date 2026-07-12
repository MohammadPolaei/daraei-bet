import { GamePredictionResponse } from "@/types/game-prediction";

export async function getGamePrediction(
	gameID: string
): Promise<GamePredictionResponse> {
	const response = await fetch(`/api/prediction/${gameID}`);
	const data = (await response.json()) as GamePredictionResponse;

	if (!response.ok) {
		throw new Error(data.message || "خطا در دریافت آمار پیش‌بینی بازی");
	}

	return data;
}
