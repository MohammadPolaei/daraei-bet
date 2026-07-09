"use client";
import MatchContainer from "@/assets/match/match-container";
import SetGoalContainer from "@/assets/match/set-goal-container";
import SetGoalState from "@/components/shared/set-goal-state";
import { useState } from "react";

export default function MatchScore() {
	const [activeButton, setActiveButton] = useState("");
	const buttonsClass =
		"w-full py-2 rounded-[14px] text-[12px] cursor-pointer transition-all duration-500 ease-in-out";

	return (
		<div className="w-full flex flex-col justify-start gap-0">
			<div className="relative h-39 flex flex-col justify-start items-center">
				<MatchContainer>
					<div className="w-full flex justify-evenly items-center">
						<div>
							<div>LOGO</div>
							<div>فرانسه</div>
						</div>
						<div className="flex flex-col justify-center items-center">
							<span>20:30</span>
							<span>18 تیر</span>
						</div>
						<div>
							<div>LOGO</div>
							<div>مراکش</div>
						</div>
					</div>
				</MatchContainer>
				<div className="absolute bottom-3 text-[14px] text-(--text-muted) flex flex-col">
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
