// hooks/use-user-profile.ts
import { getUserProfile } from "@/services/get-user-profile";
import { UserProfile } from "@/types/user-profile";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useUserProfile(): UseQueryResult<UserProfile, Error> {
	return useQuery({
		queryKey: ["user-profile"],
		queryFn: getUserProfile,
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
		staleTime: 60 * 1000,
		retry: 1,
	});
}
