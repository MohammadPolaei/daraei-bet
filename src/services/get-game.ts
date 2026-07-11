export const getGame = async (gameID: string) => {
	const response = await fetch(`/api/games/${gameID}`);
	const res = await response.json();

	if (!response.ok) {
		throw new Error(`Error getting game info: ${res.message}`);
	}

	return res;
};
