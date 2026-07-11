import SectionContainer from "@/components/base/section-container";
import { Coins, UsersRound } from "lucide-react";
import { JSX } from "react/jsx-runtime";
import PredictionOptions from "./prediction-options";
import PredictionProgress from "./prediction-progress";

export default function PredictionCard({ title }: { title: JSX.Element }) {
	return (
		<SectionContainer extraClass="w-full p-3">
			<div className="w-full flex justify-between items-center gap-49">
				<SectionContainer
					extraClass="flex justify-start items-center gap-1 max-w-25 py-1"
					rounded="rounded-[7px]"
				>
					<Coins size={10} className="text-(--text-muted)" />
					<span className="text-[8px] text-(--text-muted) font-semibold">
						هزینه 0 امتیاز
					</span>
				</SectionContainer>
				<SectionContainer
					extraClass="flex justify-start items-center gap-1 max-w-25 py-1"
					rounded="rounded-[7px]"
				>
					<UsersRound size={10} className="text-(--text-main)" />
					<span className="text-[8px] text-(--text-main)">352</span>
				</SectionContainer>
			</div>
			<div className="py-2">
				<h3>{title}</h3>
			</div>
			<PredictionOptions />
			<PredictionProgress />
		</SectionContainer>
	);
}
