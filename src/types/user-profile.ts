export interface UserProfile {
	id: string;
	phone_number?: string;
	username: string;
	avatar_url?: string | null;
	[key: string]: any;
}
