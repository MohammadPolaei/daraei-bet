import { getGamePrediction } from "@/services/get-game-prediction";
import { GamePredictionData } from "@/types/game-prediction";
import { useQuery } from "@tanstack/react-query";

export function useGamePrediction(gameID: string) {
	return useQuery<GamePredictionData, Error>({
		queryKey: ["game-prediction", gameID],
		queryFn: async () => {
			const res = await getGamePrediction(gameID);

			if (!res.success) {
				throw new Error(res.message || "خطا در دریافت آمار پیش‌بینی بازی");
			}

			return res.data;
		},
		enabled: Boolean(gameID),
		staleTime: 60_000,
		retry: 1,
	});
}
