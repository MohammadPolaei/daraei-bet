"use client";

import { submitPrediction } from "@/services/submit-prediction";
import { PredictionPayload } from "@/types/prediction-form";
import { SubmitPredictionResponse } from "@/types/prediction-submit-response";
import {
	useMutation,
	UseMutationResult,
	useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export function useSubmitPrediction(): UseMutationResult<
	SubmitPredictionResponse,
	Error,
	PredictionPayload
> {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["submit-prediction"],
		mutationFn: submitPrediction,
		retry: 0,
		networkMode: "online",
		onMutate: async (variables) => {
			return { gameId: variables.game_id };
		},
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
		onSettled: () => {},
		meta: {
			feature: "submit-prediction",
		},
	});
}
