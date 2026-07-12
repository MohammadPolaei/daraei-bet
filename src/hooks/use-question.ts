import { getSpeculativeQuestions } from "@/services/get-questions";
import { SpeculativeQuestionsResponse } from "@/types/question-response-type";
import { useQuery } from "@tanstack/react-query";

export function useQuestion(gameId: string) {
	return useQuery<SpeculativeQuestionsResponse>({
		queryKey: ["speculative-questions", gameId],
		queryFn: () => getSpeculativeQuestions(gameId),
		enabled: !!gameId,
	});
}
