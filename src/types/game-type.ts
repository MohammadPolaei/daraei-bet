export type ApiSuccessMessage = "Success";

export type GameType = "games";

export type GameStatus = "in_progress" | "finished" | "scored";
export type ScoringMode = "fixed" | "pool";
export type NetStatus = "disable" | "special" | "enable";

export type IsoDateString = string;
export type UUID = string;

export type GameAttributes = {
	team1_id: UUID;
	team2_id: UUID;
	start_time: IsoDateString;
	prediction_close_time: IsoDateString;
	allows_draw_predictions: boolean;
	allows_penalty_predictions: boolean;
	allows_outcome_scoring: boolean;
	went_to_penalties: boolean;
	team1_score: number | null;
	team2_score: number | null;
	is_game_ended: boolean;
	is_game_scored: boolean;
	score_pool: number;
	scoring_mode: ScoringMode;
	requires_prediction_entry: boolean;
	prediction_base_entry_points: number | null;
	min_entry_leverage: number;
	max_entry_leverage: number;
	exact_stake_reward_multiplier: number;
	winner_stake_reward_multiplier: number;
	status: GameStatus;
	game_status: GameStatus;
	accepts_submissions: boolean;
	category_id: UUID | null;
	city: string;
	fa_city: string;
	note: string | null;
	net_status: NetStatus;
	created_at: IsoDateString;
	updated_at: IsoDateString;
};

export type GameEntity = {
	id: UUID;
	type: GameType;
	attributes: GameAttributes;
};

export type SingleGameSuccessResponse = {
	success: true;
	message: ApiSuccessMessage | string;
	data: {
		data: GameEntity;
	};
};

export type ApiErrorResponse = {
	success: false;
	message: string;
	data?: null;
};

export type SingleGameResponse = SingleGameSuccessResponse | ApiErrorResponse;
