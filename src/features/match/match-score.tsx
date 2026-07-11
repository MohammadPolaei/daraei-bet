"use client";
import MatchContainer from "@/assets/match/match-container";
import SetGoalContainer from "@/assets/match/set-goal-container";
import SetGoalState from "@/components/shared/set-goal-state";
import { getGame } from "@/services/get-game";
import { SingleGameResponse } from "@/types/game-type";
import { formatMatchTimeDate } from "@/utils/convert-date";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const gameId = "019f21be-02eb-71e6-9327-451c16849d5d";

export default function MatchScore() {
	const [activeButton, setActiveButton] = useState("");
	const { data, isLoading, isError, error } = useQuery<SingleGameResponse>({
		queryKey: ["game", gameId],
		queryFn: () => getGame(gameId),
		enabled: !!gameId,
	});

	const buttonsClass =
		"w-full py-2 rounded-[14px] text-[12px] cursor-pointer transition-all duration-500 ease-in-out";

	const startTime = data?.data?.data.attributes.start_time;
	return (
		<div className="w-full flex flex-col justify-start gap-0">
			<div className="relative w-full h-35 top-[-5] flex flex-col justify-start items-center pointer-events-none">
				<MatchContainer>
					<div className="w-full flex justify-evenly items-center">
						<div>
							<div>LOGO</div>
							<div className="text-[12px]">فرانسه</div>
						</div>
						<div className="flex flex-col justify-center items-center pb-5">
							<span className="font-semibold">
								{startTime !== undefined
									? formatMatchTimeDate(startTime).time
									: ""}
							</span>
							<span className="text-[10px] text-(--text-muted)">18 تیر</span>
						</div>
						<div>
							<div>LOGO</div>
							<div className="text-[12px]">مراکش</div>
						</div>
					</div>
				</MatchContainer>
				<div className="absolute bottom-0.5 text-[12px] text-(--text-muted) flex flex-col">
					یک چهارم
				</div>
			</div>
			<div className="w-full flex justify-between items-center gap-2">
				<button
					onClick={() => setActiveButton("right")}
					className={`${
						activeButton == "right"
							? "bg-(--accent)/20 border border-(--accent)/50 text-(--text-main) font-semibold"
							: "bg-(--bg-card) text-(--text-muted) border border-white/0 font-semibold"
					} ${buttonsClass}`}
				>
					برد فرانسه
				</button>
				<button
					onClick={() => setActiveButton("middle")}
					className={`${
						activeButton == "middle"
							? "bg-(--accent)/20 border border-(--accent)/50 text-(--text-main)"
							: "bg-(--bg-card) text-(--text-muted) border border-white/0"
					} ${buttonsClass}`}
				>
					ضربات پنالتی
				</button>
				<button
					onClick={() => setActiveButton("left")}
					className={`${
						activeButton == "left"
							? "bg-(--accent)/20 border border-(--accent)/50 text-(--text-main) font-semibold"
							: "bg-(--bg-card) text-(--text-muted) border border-white/0 font-semibold"
					} ${buttonsClass}`}
				>
					برد مراکش
				</button>
			</div>
			<div className="w-full pt-3">
				<SetGoalContainer>
					<SetGoalState>
						<span className="text-[16px] font-bold">2</span>
					</SetGoalState>
					<SetGoalState>
						<span className="text-[16px] font-bold">0</span>
					</SetGoalState>
				</SetGoalContainer>
			</div>
		</div>
	);
}
