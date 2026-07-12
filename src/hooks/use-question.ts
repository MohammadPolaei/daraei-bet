import { getSpeculativeQuestions } from "@/services/get-questions";
import { useQuery } from "@tanstack/react-query";

export function useQuestion(gameId: string) {
	return useQuery({
		queryKey: ["speculative-questions", gameId],
		queryFn: () => getSpeculativeQuestions(gameId),
		enabled: !!gameId,
	});
}
