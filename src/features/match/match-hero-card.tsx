"use client";

import TopTittle from "@/assets/match/top-title";
import ForecastButton from "@/components/base/forcast-button";
import SectionContainer from "@/components/base/section-container";
import { getGame } from "@/services/get-game";
import { SingleGameResponse } from "@/types/game-type";
import { useQuery } from "@tanstack/react-query";
import { OctagonAlert } from "lucide-react";
import MatchDistributionBar from "../stats/match-distribution-bar";
import MatchLeverage from "./match-leverage";
import MatchScore from "./match-score";
import UsersMatchForecast from "./users-match-forecast";

const gameId = "019f21be-02eb-71e6-9327-451c16849d5d";

export interface ProgressSegment {
	label: string;
	percentage: number;
	color: string;
}

// تعریف پراپ‌های ورودی کامپوننت
export interface MultiSegmentProgressBarProps {
	segments: [ProgressSegment, ProgressSegment, ProgressSegment]; // دقیقاً ۳ سگمنت دریافت می‌کند
	totalPredictions?: string; // تعداد پیش‌بینی‌ها (مثلاً "۹۶۵ پیش‌بینی")
	title?: string; // عنوان کامپوننت (مثلاً "نظر کاربران")
}

const predictionData: [ProgressSegment, ProgressSegment, ProgressSegment] = [
	{
		label: "فرانسه",
		percentage: 94.3,
		color: "#28378d",
	},

	{
		label: "ضربات پنالتی",
		percentage: 1.9,
		color: "#f1a00a",
	},
	{
		label: "مراکش",
		percentage: 3.8,
		color: "#d90452",
	},
];

export default function MatchHeroCard() {
	const { data, isLoading, isError, error } = useQuery<SingleGameResponse>({
		queryKey: ["game", gameId],
		queryFn: () => getGame(gameId),
		enabled: !!gameId,
	});

	if (data?.success) {
		console.log(data);
	}

	return (
		<div className="">
			<SectionContainer extraClass="flex flex-col justify-center items-center gap-5">
				<TopTittle>فعال</TopTittle>
				<MatchScore />
				<MatchLeverage />
				<ForecastButton>ویرایش پیش بینی</ForecastButton>
			</SectionContainer>
			<div className="relative w-full bg-(--danger-dark)/25 border border-(--danger)/50 text-center text-(--text-muted) text-[11px] overflow-hidden rounded-[11px] px-6 py-3 font-normal transition-all flex justify-center items-center gap-1 my-3">
				<OctagonAlert size={18} className="text-(--danger)" />
				نتیجه نهایی بازی در 120 دقیقه محاسبه میشود
			</div>

			<UsersMatchForecast
				segments={predictionData}
				title="نظر کاربران"
				totalPredictions="۹۶۵ پیش‌بینی"
			/>

			{/*  */}
			<MatchDistributionBar />
			<SectionContainer
				rounded="rounded-[10px]"
				extraClass="flex justify-between items-center text-[10px] font-semibold px-3"
			>
				<span className="text-(--text-muted)">پیشرفت پاسخ دهی</span>
				<span className="text-(--primary)">0 از 6</span>
			</SectionContainer>
		</div>
	);
}
