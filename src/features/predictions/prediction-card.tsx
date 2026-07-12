import SectionContainer from "@/components/base/section-container";
import { SpeculativeQuestionItem } from "@/types/question-response-type";
import { UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import PredictionOptions from "./prediction-options";
import { PredictionProgress } from "./prediction-progress";

export default function PredictionCard({
	question,
}: {
	question: SpeculativeQuestionItem;
}) {
	const [selectedOption, setSelectedOption] = useState("");

	const usersCount = useMemo(() => {
		return question.pool.options.reduce((sum: any, currentValue: any) => {
			return sum + Number(currentValue.participants_count);
		}, 0);
	}, [question]);

	const yesPercentageData = useMemo(() => {
		return (
			(question.pool.options[0].participants_count /
				(question.pool.options[1].participants_count +
					question.pool.options[0].participants_count)) *
			100
		);
	}, [question]);
	return (
		<SectionContainer extraClass="w-full p-3">
			<div className="w-full flex justify-between items-center gap-49">
				<span className="text-[12px] font-semibold text-(--primary)">
					سوال 1
				</span>
				<SectionContainer
					extraClass="flex justify-start items-center gap-1 max-w-25 py-1 px-3"
					rounded="rounded-[15px]"
				>
					<span className="text-[12px] text-(--text-muted) text-left">
						{usersCount}
					</span>
					<UsersRound size={14} className="text-(--text-muted)" />
				</SectionContainer>
			</div>
			<div className="py-2">
				<h3>
					<span className="font-bold text-[12px]">
						{question.question_text}
					</span>
				</h3>
			</div>
			<PredictionOptions selector={setSelectedOption} />
			<PredictionProgress yesPercent={yesPercentageData} />
		</SectionContainer>
	);
}
