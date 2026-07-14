"use client";

import MatchContainer from "@/assets/match/match-container";
import SetGoalContainer from "@/assets/match/set-goal-container";
import { FlagIcon } from "@/components/base/flag-icon";
import SetGoalState from "@/components/shared/set-goal-state";
import { usePrediction } from "@/context/active-prediction-context";
import { usePredictionForm } from "@/context/prediction-form-context";
import { getGame } from "@/services/get-game";
import { SingleGameResponse } from "@/types/game-type";
import { formatMatchTimeDate } from "@/utils/convert-date";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

interface PredictionSnapshot {
	scoreTeam1: number | null;
	scoreTeam2: number | null;
	predictsPenalty: boolean;
	leverage: number;
	winner: "teamA" | "teamB" | "penalty" | "none";
}

export default function MatchScore({ gameId }: { gameId: string }) {
	const [activeButton, setActiveButton] = useState<
		"" | "right" | "middle" | "left"
	>("");
	const [countTeamA, setCountTeamA] = useState(0);
	const [countTeamB, setCountTeamB] = useState(0);
	const [originalSnapshot, setOriginalSnapshot] =
		useState<PredictionSnapshot | null>(null);

	const { data, isLoading, isError } = useQuery<SingleGameResponse>({
		queryKey: ["game", gameId],
		queryFn: () => getGame(gameId),
		enabled: !!gameId,
	});

	const { winner, setWinner } = usePrediction();
	const { state, dispatch } = usePredictionForm();

	const userPrediction = data?.data?.included?.find(
		(item) => item.attributes.outcome_predicted
	);

	const startTime = data?.data?.data.attributes.start_time;
	const team1 = data?.data?.included?.[0]?.attributes.fa_name;
	const team2 = data?.data?.included?.[1]?.attributes.fa_name;

	useEffect(() => {
		if (!gameId) return;
		dispatch({ type: "SET_GAME_ID", payload: gameId });
	}, [dispatch, gameId]);

	useEffect(() => {
		if (!userPrediction || originalSnapshot) return;

		const attributes = userPrediction.attributes as {
			is_penalty_prediction?: boolean;
			score_team1_predicted?: number;
			score_team2_predicted?: number;
			leverage?: number;
		};

		const predictsPenalty = Boolean(attributes.is_penalty_prediction);
		const scoreTeam1 = predictsPenalty
			? null
			: attributes.score_team1_predicted ?? 0;
		const scoreTeam2 = predictsPenalty
			? null
			: attributes.score_team2_predicted ?? 0;
		const leverage = attributes.leverage ?? 1;

		let initialWinner: PredictionSnapshot["winner"] = "none";
		let initialButton: "" | "right" | "middle" | "left" = "";

		if (predictsPenalty) {
			initialWinner = "penalty";
			initialButton = "middle";
		} else if ((scoreTeam1 ?? 0) > (scoreTeam2 ?? 0)) {
			initialWinner = "teamA";
			initialButton = "right";
		} else if ((scoreTeam2 ?? 0) > (scoreTeam1 ?? 0)) {
			initialWinner = "teamB";
			initialButton = "left";
		}

		setCountTeamA(scoreTeam1 ?? 0);
		setCountTeamB(scoreTeam2 ?? 0);
		setActiveButton(initialButton);
		setWinner(initialWinner);

		dispatch({ type: "SET_LEVERAGE", payload: leverage });

		if (predictsPenalty) {
			dispatch({ type: "SET_PENALTY", payload: true });
		} else {
			dispatch({ type: "SET_PENALTY", payload: false });
			dispatch({ type: "SET_TEAM1", payload: scoreTeam1 ?? 0 });
			dispatch({ type: "SET_TEAM2", payload: scoreTeam2 ?? 0 });
		}

		setOriginalSnapshot({
			scoreTeam1,
			scoreTeam2,
			predictsPenalty,
			leverage,
			winner: initialWinner,
		});
	}, [dispatch, originalSnapshot, setWinner, userPrediction]);

	useEffect(() => {
		if (activeButton === "middle") {
			setWinner("penalty");
			dispatch({ type: "SET_PENALTY", payload: true });
			return;
		}

		dispatch({ type: "SET_PENALTY", payload: false });
		dispatch({ type: "SET_TEAM1", payload: countTeamA });
		dispatch({ type: "SET_TEAM2", payload: countTeamB });

		if (countTeamA > countTeamB) {
			setWinner("teamA");
			if (activeButton !== "right") setActiveButton("right");
			return;
		}

		if (countTeamB > countTeamA) {
			setWinner("teamB");
			if (activeButton !== "left") setActiveButton("left");
			return;
		}

		setWinner("none");
		if (activeButton !== "") setActiveButton("");
	}, [activeButton, countTeamA, countTeamB, dispatch, setWinner]);

	const currentLeverage = state.predictions[0]?.leverage ?? 1;

	const isFormChanged = useMemo(() => {
		if (!originalSnapshot) {
			return activeButton !== "";
		}

		const currentPredictsPenalty = activeButton === "middle";
		const currentWinner: PredictionSnapshot["winner"] = currentPredictsPenalty
			? "penalty"
			: countTeamA > countTeamB
			? "teamA"
			: countTeamB > countTeamA
			? "teamB"
			: "none";

		const currentScoreTeam1 = currentPredictsPenalty ? null : countTeamA;
		const currentScoreTeam2 = currentPredictsPenalty ? null : countTeamB;

		return (
			currentScoreTeam1 !== originalSnapshot.scoreTeam1 ||
			currentScoreTeam2 !== originalSnapshot.scoreTeam2 ||
			currentPredictsPenalty !== originalSnapshot.predictsPenalty ||
			currentLeverage !== originalSnapshot.leverage ||
			currentWinner !== originalSnapshot.winner
		);
	}, [activeButton, countTeamA, countTeamB, currentLeverage, originalSnapshot]);

	const buttonsClass =
		"w-full py-2 rounded-[14px] text-[12px] cursor-pointer transition-all duration-500 ease-in-out";

	return (
		<div className="w-full flex flex-col justify-start gap-0">
			<div className="relative w-full h-full top-[-5] large-mobile:pt-1 flex flex-col justify-start items-center pointer-events-none">
				<MatchContainer>
					<div className="w-full max-w-md flex justify-evenly items-center">
						<div className="flex flex-col items-center gap-2">
							<div>
								{isLoading ? (
									<div className="flex flex-col items-center gap-2">
										<div
											dir="ltr"
											className="w-13 h-13 rounded-full flex flex-col justify-center items-center text-center bg-gray-500/40 animate-pulse text-[8px]"
										/>
										<div
											dir="ltr"
											className="w-10 h-5 rounded-full flex flex-col justify-center items-center text-center bg-gray-500/40 animate-pulse text-[8px]"
										/>
									</div>
								) : isError ? (
									<div
										dir="ltr"
										className="w-14 h-14 rounded-full flex flex-col justify-center items-center text-center bg-red-500/40 text-[8px]"
									/>
								) : (
									<FlagIcon
										size={50}
										code={data?.data?.included?.[0]?.attributes.country_code!}
									/>
								)}
							</div>
							<div className="text-[12px]">{team1}</div>
						</div>

						<div className="flex flex-col justify-center items-center pb-0">
							<span className="font-semibold">
								{startTime !== undefined ? (
									formatMatchTimeDate(startTime).time
								) : (
									<div
										dir="ltr"
										className="w-15 h-8 rounded-2xl flex flex-col justify-center items-center text-center bg-gray-500/40 animate-pulse text-[8px]"
									/>
								)}
							</span>
							<span className="text-[10px] text-(--text-muted)">
								{startTime !== undefined ? (
									formatMatchTimeDate(startTime).date
								) : (
									<div
										dir="ltr"
										className="w-10 h-0 rounded-2xl flex flex-col justify-center items-center text-center bg-gray-500/40 animate-pulse text-[10px]"
									/>
								)}
							</span>
						</div>

						<div className="flex flex-col items-center gap-2">
							<div>
								{isLoading ? (
									<div className="flex flex-col items-center gap-2">
										<div
											dir="ltr"
											className="w-13 h-13 rounded-full flex flex-col justify-center items-center text-center bg-gray-500/40 animate-pulse text-[8px]"
										/>
										<div
											dir="ltr"
											className="w-10 h-5 rounded-full flex flex-col justify-center items-center text-center bg-gray-500/40 animate-pulse text-[8px]"
										/>
									</div>
								) : isError ? (
									<div
										dir="ltr"
										className="w-14 h-14 rounded-full flex flex-col justify-center items-center text-center bg-red-500/40 text-[8px]"
									/>
								) : (
									<FlagIcon
										size={50}
										code={data?.data?.included?.[1]?.attributes.country_code!}
									/>
								)}
							</div>
							<div className="text-[12px]">{team2}</div>
						</div>
					</div>
				</MatchContainer>

				{isLoading ? (
					<div
						dir="ltr"
						className="w-15 absolute bottom-8 h-5 rounded-2xl flex flex-col justify-center items-center text-center bg-gray-500/40 animate-pulse"
					/>
				) : (
					<div className="absolute bottom-7 premedium-mobile:bottom-8 premedium1-mobile:bottom-8.5 medium-mobile:bottom-9 text-[12px] text-(--text-muted) flex flex-col">
						{data?.data?.included?.[2]?.attributes.fa_name}
					</div>
				)}
			</div>

			<div className="w-full flex justify-between items-center gap-2 -mt-7 premedium-mobile:-mt-8 large-mobile:-mt-6.5">
				<button
					aria-label="برد تیم اول"
					onClick={() => {
						setActiveButton("right");
						setCountTeamA(1);
						setCountTeamB(0);
					}}
					className={`${
						activeButton === "right" || winner === "teamA"
							? "bg-(--accent)/20 border border-(--accent)/50 text-(--text-main) font-semibold"
							: "bg-(--bg-card) text-(--text-muted) border border-white/0 font-semibold"
					} ${buttonsClass}`}
				>
					{isLoading ? (
						<div
							dir="ltr"
							className="w-full h-full rounded-2xl flex flex-col justify-center items-center text-center bg-gray-500/40 animate-pulse"
						/>
					) : (
						<span>برد {team1}</span>
					)}
				</button>

				<button
					aria-label="پنالتی"
					onClick={() => {
						setActiveButton("middle");
					}}
					className={`${
						activeButton === "middle"
							? "bg-(--accent)/20 border border-(--accent)/50 text-(--text-main)"
							: "bg-(--bg-card) text-(--text-muted) border border-white/0"
					} ${buttonsClass}`}
				>
					ضربات پنالتی
				</button>

				<button
					aria-label="برد تیم دوم"
					onClick={() => {
						setActiveButton("left");
						setCountTeamB(1);
						setCountTeamA(0);
					}}
					className={`${
						activeButton === "left" || winner === "teamB"
							? "bg-(--accent)/20 border border-(--accent)/50 text-(--text-main) font-semibold"
							: "bg-(--bg-card) text-(--text-muted) border border-white/0 font-semibold"
					} ${buttonsClass}`}
				>
					{isLoading ? (
						<div
							dir="ltr"
							className="w-full h-full rounded-2xl flex flex-col justify-center items-center text-center bg-gray-500/40 animate-pulse"
						/>
					) : (
						<span>برد {team2}</span>
					)}
				</button>
			</div>

			<div
				className={`w-full pt-2 transition-all duration-200 ease-in-out ${
					winner === "penalty"
						? "h-0 opacity-0 overflow-hidden"
						: "h-full opacity-100"
				}`}
			>
				<SetGoalContainer>
					<SetGoalState
						setState={setCountTeamA}
						max={40}
						min={0}
						value={countTeamA}
					>
						<span className="text-[16px] font-bold">{countTeamA}</span>
					</SetGoalState>
					<SetGoalState
						setState={setCountTeamB}
						max={40}
						min={0}
						value={countTeamB}
					>
						<span className="text-[16px] font-bold">{countTeamB}</span>
					</SetGoalState>
				</SetGoalContainer>
			</div>
		</div>
	);
}
