export interface SpeculativeQuestionOption {
	id: string;
	text: string;
	value: string;
	sort_order: number;
	entry_points: number | null;
	reward_points: number | null;
}

export interface SpeculativeQuestionPoolOption {
	option_id: string;
	participants_count: number;
	total_points: number;
}

export interface SpeculativeQuestionPool {
	options: SpeculativeQuestionPoolOption[];
}

export interface SpeculativeQuestionRewardTier {
	distance: number;
	points: number;
}

export interface SpeculativeQuestionUserAnswer {
	option_id: string;
}

export type SpeculativeQuestionScoringMode = "otc" | "option_fixed" | "ptp";

export interface SpeculativeQuestionItem {
	id: string;
	question_text: string;
	sort_order: number;
	scoring_mode: SpeculativeQuestionScoringMode;
	options: SpeculativeQuestionOption[];
	user_answer: SpeculativeQuestionUserAnswer | null;
	pool: SpeculativeQuestionPool;
	entry_points?: number;
	proximity_before?: number;
	proximity_after?: number;
	reward_tiers?: SpeculativeQuestionRewardTier[];
}

export interface SpeculativeQuestionsData {
	game_id: string;
	accepts_answers: boolean;
	available_leverages: number[];
	questions: SpeculativeQuestionItem[];
}

export interface SpeculativeQuestionsSuccessResponse {
	success: true;
	message: string;
	data: SpeculativeQuestionsData;
}

export interface SpeculativeQuestionsErrorResponse {
	success: false;
	message: string;
	data?: null;
}

export type SpeculativeQuestionsResponse =
	| SpeculativeQuestionsSuccessResponse
	| SpeculativeQuestionsErrorResponse;
