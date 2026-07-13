"use client";

import { submitOptionPrediction } from "@/services/submit-option";
import {
	SubmitOptionPredictionPayload,
	SubmitOptionPredictionResponse,
} from "@/types/submit-answer-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSubmitOptionPrediction() {
	const queryClient = useQueryClient();

	return useMutation<
		SubmitOptionPredictionResponse,
		Error,
		SubmitOptionPredictionPayload
	>({
		mutationKey: ["submit-option-prediction"],
		mutationFn: submitOptionPrediction,
		retry: 0,
		networkMode: "online",
		onSuccess: async (_, variables) => {
			toast.success("پیش‌بینی با موفقیت ثبت شد");

			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: ["speculative-questions", variables.game_id],
				}),
				queryClient.invalidateQueries({
					queryKey: ["game-prediction", variables.game_id],
				}),
			]);
		},
		onError: (error) => {
			toast.error(error.message || "ثبت پیش‌بینی با خطا مواجه شد");
		},
	});
}
