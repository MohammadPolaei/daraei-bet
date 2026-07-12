import SectionContainer from "@/components/base/section-container";
import {
	SpeculativeQuestionItem,
	SpeculativeQuestionOption,
} from "@/types/question-response-type";
import { UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import { YellowRedCardMeter } from "./yellow-red-card-meter";

export default function PredictionRedYellowCard({
	card,
	question,
}: {
	card: string;
	question: SpeculativeQuestionItem;
}) {
	// question options choose
	const [selectedYellowOption, setSelectedYellowOption] =
		useState<SpeculativeQuestionOption | null>(null);

	// total count
	const usersCount = useMemo(() => {
		return question.pool.options.reduce((sum: any, currentValue: any) => {
			return sum + Number(currentValue.participants_count);
		}, 0);
	}, [question]);
	return (
		<SectionContainer extraClass="w-full p-3">
			<div className="w-full flex justify-between items-center">
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
					{
						<span className="font-bold text-[12px]">
							{question.question_text}
						</span>
					}
				</h3>
			</div>
			<YellowRedCardMeter
				card={card}
				options={question.options}
				max={question.options.length - 1}
				onChange={(option) => {
					setSelectedYellowOption(option);
				}}
			/>
		</SectionContainer>
	);
}
