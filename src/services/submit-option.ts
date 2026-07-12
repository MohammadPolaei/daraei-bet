import {
	SubmitOptionPredictionPayload,
	SubmitOptionPredictionResponse,
} from "@/types/submit-answer-type";

export async function submitOptionPrediction(
	payload: SubmitOptionPredictionPayload
): Promise<SubmitOptionPredictionResponse> {
	const response = await fetch("/api/questions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data?.message || "Failed to submit option prediction");
	}

	return data;
}
