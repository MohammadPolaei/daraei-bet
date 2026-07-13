"use client";

import { SpeculativeQuestionItem } from "@/types/question-response-type";
import { CircleCheck, CircleX } from "lucide-react";

export default function PredictionOptionsSelected({
	question,
	selectedOptionId,
}: {
	question: SpeculativeQuestionItem;
	selectedOptionId: string;
}) {
	const isYesOption = question.options[0].id == selectedOptionId;
	const isNoOption = question.options[1].id == selectedOptionId;

	return (
		<div className="w-full flex items-center gap-4 pt-2">
			<button
				aria-label="بله"
				className={`w-full border rounded-[17px] p-2 flex items-center gap-1 relative text-center transition-all duration-500 ease-in-out
					${
						isYesOption
							? "bg-(--primary)/5 border-(--primary)/50 text-(--primary) cursor-pointer"
							: "border-gray-500/50"
					}
					`}
			>
				<CircleCheck size={17} className="absolute right-2" />
				<span className="w-full">{question.options[0].text}</span>
			</button>
			<button
				aria-label="خیر"
				className={`w-full border rounded-[17px] p-2 flex items-center gap-1 relative text-center transition-all duration-500 ease-in-out
					${
						isNoOption
							? "bg-(--primary)/5 border-(--primary)/50 text-(--primary) cursor-pointer"
							: "border-gray-500/50 opacity-20"
					}
					`}
			>
				<CircleX size={17} className="absolute right-2" />
				<span className="w-full">{question.options[1].text}</span>
			</button>
		</div>
	);
}
