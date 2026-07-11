export interface CooldownItem {
	cooldown_hours: number;
	on_cooldown: boolean;
	next_available_at: string | null;
}

export interface UserCooldowns {
	quiz: CooldownItem;
	mystery_box: CooldownItem;
	quiz_rush: CooldownItem;
}

export interface UserAttributes {
	name: string;
	age: number | null;
	postal_code: string | null;
	address: string | null;
	mobile: string;
	avatar_id: string;
	avatar_url: string;
	instagram_username: string | null;
	is_autorized_on_grammy: boolean;
	type: "normal" | string; // اگر تایپ‌های دیگری دارد اضافه کنید
	has_portfolio_completed: boolean;
	points_total: number;
	wallet_balance: number;
	clan: any | null; // اگر ساختار کلن را دارید جایگزین کنید
	cooldowns: UserCooldowns;
	created_at: string;
	updated_at: string;
}

export interface UserResource {
	data: {
		id: string;
		type: "users";
		attributes: UserAttributes;
	};
}

export interface AuthVerifyResponse {
	success: boolean;
	message: string;
	data: {
		user: UserResource;
		token: string; // توکنی که باید در کوکی ذخیره شود
	};
}
