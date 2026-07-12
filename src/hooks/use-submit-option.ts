"use client";

import { submitOptionPrediction } from "@/services/submit-option";
import {
	SubmitOptionPredictionPayload,
	SubmitOptionPredictionResponse,
} from "@/types/submit-answer-type";
import { useMutation } from "@tanstack/react-query";

export function useSubmitOptionPrediction() {
	return useMutation<
		SubmitOptionPredictionResponse,
		Error,
		SubmitOptionPredictionPayload
	>({
		mutationFn: submitOptionPrediction,
	});
}
