export async function getSpeculativeQuestions(gameId: string) {
	const response = await fetch(`/api/questions/${gameId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data?.error || "Failed to fetch speculative questions");
	}

	return data;
}
