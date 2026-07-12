// services/submit-prediction.ts
import { PredictionPayload } from "@/types/prediction-form";
import { SubmitPredictionResponse } from "@/types/prediction-submit-response";

export async function submitPrediction(
	payload: PredictionPayload
): Promise<SubmitPredictionResponse> {
	const response = await fetch("/api/prediction/submit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(payload),
	});

	const data = (await response.json()) as SubmitPredictionResponse;

	if (!response.ok) {
		throw new Error(data.message || "ثبت پیش‌بینی انجام نشد");
	}

	return data;
}
