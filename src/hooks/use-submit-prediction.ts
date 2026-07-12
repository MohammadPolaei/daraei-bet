// hooks/use-submit-prediction.ts
import { submitPrediction } from "@/services/submit-prediction";
import { PredictionPayload } from "@/types/prediction-form";
import { SubmitPredictionResponse } from "@/types/prediction-submit-response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export function useSubmitPrediction(): UseMutationResult<
	SubmitPredictionResponse,
	Error,
	PredictionPayload
> {
	return useMutation({
		mutationKey: ["submit-prediction"],
		mutationFn: submitPrediction,
	});
}
