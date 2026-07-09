import TopTittle from "@/assets/match/top-title";
import ForecastButton from "@/components/base/forcast-button";
import SectionContainer from "@/components/base/section-container";
import { OctagonAlert } from "lucide-react";
import MatchDistributionBar from "../stats/match-distribution-bar";
import MatchLeverage from "./match-leverage";
import MatchScore from "./match-score";
import UsersMatchForecast from "./users-match-forecast";

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
	return (
		<div className="">
			<SectionContainer extraClass="flex flex-col justify-center items-center gap-5">
				<TopTittle>فعال</TopTittle>
				<MatchScore />
				<MatchLeverage />
				<ForecastButton>ویرایش پیش بینی</ForecastButton>
			</SectionContainer>
			<div className="relative w-full bg-(--danger-dark)/40 border border-(--danger)/50 text-center text-white/80 text-[12px] overflow-hidden rounded-[15px] px-6 py-4 font-normal transition-all flex justify-center items-center gap-1 my-3">
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
		</div>
	);
}
