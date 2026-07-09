import SectionContainer from "@/components/base/section-container";
import { Coins } from "lucide-react";
import { JSX } from "react/jsx-runtime";
import PredictionOptions from "./prediction-options";
import PredictionProgress from "./prediction-progress";

export default function PredictionCard({ title }: { title: JSX.Element }) {
	return (
		<SectionContainer extraClass="w-full p-4">
			<div className="w-full flex justify-between items-center gap-44">
				<SectionContainer
					extraClass="flex justify-start items-center gap-1 max-w-25 py-1"
					rounded="rounded-[7px]"
				>
					<Coins size={10} className="text-(--text-muted)" />
					<span className="text-[10px] text-(--text-muted) font-bold">
						هزینه 0 امتیاز
					</span>
				</SectionContainer>
				<SectionContainer
					extraClass="flex justify-start items-center gap-1 max-w-25 py-1"
					rounded="rounded-[7px]"
				>
					<Coins size={10} className="text-(--text-main)" />
					<span className="text-[10px] text-(--text-main)">352</span>
				</SectionContainer>
			</div>
			<div className="">
				<h3>{title}</h3>
			</div>
			<PredictionOptions />
			<PredictionProgress />
		</SectionContainer>
	);
}
