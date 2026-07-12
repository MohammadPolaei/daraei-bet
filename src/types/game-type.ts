export type ApiSuccessMessage = "Success";

export type UUID = string;
export type IsoDateString = string;

export type GameType = "games";
export type TeamType = "teams";

export type GameStatus = "in_progress" | "finished" | "scored";
export type ScoringMode = "fixed" | "pool";
export type NetStatus = "disable" | "special" | "enable";

export interface GameAttributes {
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
}

export interface RelationshipData<TType extends string = string> {
	id: UUID;
	type: TType;
}

export interface GameRelationships {
	category: {
		data: RelationshipData | null;
	};
	team1: {
		data: RelationshipData<TeamType>;
	};
	team2: {
		data: RelationshipData<TeamType>;
	};
}

export interface GameEntity {
	id: UUID;
	type: GameType;
	attributes: GameAttributes;
	relationships: GameRelationships;
}

export interface TeamAttributes {
	name: string;
	fa_name: string;
	country_code: string;
	group: string;
	wins: number;
	draws: number;
	losses: number;
	points: number;
	goal_difference: number;
	created_at: IsoDateString;
	updated_at: IsoDateString;
}

export interface TeamEntity {
	id: UUID;
	type: TeamType;
	attributes: TeamAttributes;
}

export interface SingleGameResponseData {
	data: GameEntity;
	included: TeamEntity[];
}

export interface SingleGameSuccessResponse {
	success: true;
	message: ApiSuccessMessage | string;
	data: SingleGameResponseData;
}

export interface ApiErrorResponse {
	success: false;
	message: string;
	data?: null;
}

export type SingleGameResponse = SingleGameSuccessResponse | ApiErrorResponse;
