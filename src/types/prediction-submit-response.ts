// types/prediction-submit.ts
export interface PaginationLinkItem {
	url: string | null;
	label: string;
	page: number | null;
	active: boolean;
}

export interface PredictionPaginationLinks {
	first: string;
	last: string;
	prev: string | null;
	next: string | null;
}

export interface PredictionPaginationMeta {
	current_page: number;
	from: number | null;
	last_page: number;
	links: PaginationLinkItem[];
	path: string;
	per_page: number;
	to: number | null;
	total: number;
}

export interface SubmitPredictionResponseData {
	data: unknown[];
	links: PredictionPaginationLinks;
	meta: PredictionPaginationMeta;
}

export interface SubmitPredictionResponse {
	success: boolean;
	message: string;
	data: SubmitPredictionResponseData;
}
