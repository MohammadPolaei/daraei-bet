import { UserProfile } from "@/types/user-profile";

export const getUserProfile = async (): Promise<UserProfile> => {
	const response = await fetch("/api/me");

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(
			errorData.error || "مشکلی در دریافت اطلاعات کاربری رخ داد."
		);
	}

	return response.json();
};
