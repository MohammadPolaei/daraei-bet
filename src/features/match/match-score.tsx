"use client";
import flag from "@/assets/flag.png";
import MatchContainer from "@/assets/match/match-container";
import SetGoalContainer from "@/assets/match/set-goal-container";
import SetGoalState from "@/components/shared/set-goal-state";
import { usePrediction } from "@/context/active-prediction-context";
import { usePredictionForm } from "@/context/prediction-form-context";
import { getGame } from "@/services/get-game";
import { SingleGameResponse } from "@/types/game-type";
import { formatMatchTimeDate } from "@/utils/convert-date";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function MatchScore({ gameId }: { gameId: string }) {
	const [activeButton, setActiveButton] = useState("");
	const { data, isLoading, isError, error } = useQuery<SingleGameResponse>({
		queryKey: ["game", gameId],
		queryFn: () => getGame(gameId),
		enabled: !!gameId,
	});

	const [countTeamA, setCountTeamA] = useState(0);
	const [countTeamB, setCountTeamB] = useState(0);

	const { winner, setWinner } = usePrediction();

	useEffect(() => {
		if (countTeamA == countTeamB && activeButton !== "middle") {
			setWinner("none");
			setActiveButton("");
		}
		if (activeButton == "middle") {
			setWinner("penalty");
			dispatch({ type: "SET_PENALTY", payload: true });
			return;
		} else if (countTeamA > countTeamB) {
			setWinner("teamA");
			dispatch({ type: "SET_TEAM1", payload: countTeamA });
			return;
		} else if (countTeamB > countTeamA) {
			setWinner("teamB");
			dispatch({ type: "SET_TEAM2", payload: countTeamB });
			return;
		}
	}, [activeButton, countTeamA, countTeamB]);

	const buttonsClass =
		"w-full py-2 rounded-[14px] text-[12px] cursor-pointer transition-all duration-500 ease-in-out";
	// time
	const startTime = data?.data?.data.attributes.start_time;

	// teamA
	const team1 = data?.data?.included[0].attributes.fa_name;
	// teamB
	const team2 = data?.data?.included[1].attributes.fa_name;

	// submit prediction

	const { state, dispatch } = usePredictionForm();

	return (
		<div className="w-full flex flex-col justify-start gap-0">
			<div className="relative w-full h-35 top-[-5] flex flex-col justify-start items-center pointer-events-none">
				<MatchContainer>
					<div className="w-full flex justify-evenly items-center">
						<div className="flex flex-col items-center gap-2">
							<div className="">
								<img src={flag.src} className="rounded-full w-10 h-10" />
							</div>
							<div className="text-[12px]">{team1}</div>
						</div>
						<div className="flex flex-col justify-center items-center pb-5">
							<span className="font-semibold">
								{startTime !== undefined ? (
									formatMatchTimeDate(startTime).time
								) : (
									<div
										dir="ltr"
										className="w-15 h-8 rounded-2xl flex flex-col justify-center items-center text-center bg-gray-500/40 animate-pulse text-[8px]"
									>
										Loading...
									</div>
								)}
							</span>
							<span className="text-[10px] text-(--text-muted)">
								{startTime !== undefined ? (
									formatMatchTimeDate(startTime).date
								) : (
									<div
										dir="ltr"
										className="w-full h-8 rounded-2xl flex flex-col justify-center items-center text-center bg-gray-500/40 animate-pulse text-[10px]"
									/>
								)}
							</span>
						</div>
						<div className="flex flex-col items-center gap-2">
							<div className="">
								<img src={flag.src} className="rounded-full w-10 h-10" />
							</div>
							<div className="text-[12px]">{team2}</div>
						</div>
					</div>
				</MatchContainer>
				{isLoading ? (
					<div
						dir="ltr"
						className="w-15 absolute bottom-0 h-4 rounded-2xl flex flex-col justify-center items-center text-center bg-gray-500/40 animate-pulse"
					>
						...
					</div>
				) : (
					<div className="absolute bottom-0.5 text-[12px] text-(--text-muted) flex flex-col">
						{data?.data?.included[2].attributes.fa_name}
					</div>
				)}
			</div>
			<div className={`w-full flex justify-between items-center gap-2`}>
				<button
					onClick={() => {
						setActiveButton("right");
						setCountTeamA(1);
						setCountTeamB(0);
					}}
					className={`${
						activeButton == "right" || winner == "teamA"
							? "bg-(--accent)/20 border border-(--accent)/50 text-(--text-main) font-semibold"
							: "bg-(--bg-card) text-(--text-muted) border border-white/0 font-semibold"
					} ${buttonsClass}`}
				>
					{isLoading ? (
						<div
							dir="ltr"
							className="w-full h-8 rounded-2xl flex flex-col justify-center items-center text-center bg-gray-500/40 animate-pulse"
						>
							Loading...
						</div>
					) : (
						<span>برد {team1}</span>
					)}
				</button>
				<button
					onClick={() => {
						setActiveButton("middle");
					}}
					className={`${
						activeButton == "middle"
							? "bg-(--accent)/20 border border-(--accent)/50 text-(--text-main)"
							: "bg-(--bg-card) text-(--text-muted) border border-white/0"
					} ${buttonsClass}`}
				>
					ضربات پنالتی
				</button>
				<button
					onClick={() => {
						setActiveButton("left");
						setCountTeamA(0);
						setCountTeamB(1);
					}}
					className={`${
						activeButton == "left" || winner == "teamB"
							? "bg-(--accent)/20 border border-(--accent)/50 text-(--text-main) font-semibold"
							: "bg-(--bg-card) text-(--text-muted) border border-white/0 font-semibold"
					} ${buttonsClass}`}
				>
					{isLoading ? (
						<div
							dir="ltr"
							className="w-full h-8 rounded-2xl flex flex-col justify-center items-center text-center bg-gray-500/40 animate-pulse"
						>
							Loading...
						</div>
					) : (
						<span>برد {team2}</span>
					)}
				</button>
			</div>
			<div
				className={`w-full pt-2 transition-all duration-200 ease-in-out ${
					winner == "penalty" ? "h-0 opacity-0" : "h-full opacity-100"
				}`}
			>
				<SetGoalContainer>
					<SetGoalState setState={setCountTeamA} max={40} min={0}>
						<span className="text-[16px] font-bold">{countTeamA}</span>
					</SetGoalState>
					<SetGoalState setState={setCountTeamB} max={40} min={0}>
						<span className="text-[16px] font-bold">{countTeamB}</span>
					</SetGoalState>
				</SetGoalContainer>
			</div>
		</div>
	);
}
