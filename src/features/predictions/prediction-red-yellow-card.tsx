import SectionContainer from "@/components/base/section-container";
import {
	SpeculativeQuestionItem,
	SpeculativeQuestionOption,
} from "@/types/question-response-type";
import { UsersRound } from "lucide-react";
import { useState } from "react";
import { JSX } from "react/jsx-runtime";
import { YellowRedCardMeter } from "./yellow-red-card-meter";

export default function PredictionRedYellowCard({
	title,
	card,
	usersCount,
	question,
}: {
	title: JSX.Element;
	card: string;
	usersCount: string;
	question: SpeculativeQuestionItem;
}) {
	// question options choose
	const [selectedYellowOption, setSelectedYellowOption] =
		useState<SpeculativeQuestionOption | null>(null);
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
				<h3>{title}</h3>
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
