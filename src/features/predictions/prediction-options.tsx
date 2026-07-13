"use client";

import { SpeculativeQuestionItem } from "@/types/question-response-type";
import { CircleCheck, CircleX } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export default function PredictionOptions({
	selector,
	question,
}: {
	selector: Dispatch<SetStateAction<string>>;
	question: SpeculativeQuestionItem;
}) {
	const [active, setActive] = useState("");

	const yesOption = question.options[0];
	const noOption = question.options[1];
	const questionId = question.id;

	return (
		<div className="w-full flex items-center gap-4 pt-2">
			<button
				aria-label="بله"
				onClick={() => {
					selector(yesOption.id);
					setActive("بله");
				}}
				style={
					active == "بله"
						? { boxShadow: "0 0 5px 1px rgba(168, 206, 47, 0.5)" as const }
						: {}
				}
				className={`cursor-pointer w-full border rounded-[17px] p-2 flex items-center gap-1 relative text-center transition-all duration-500 ease-in-out
					${
						active == "بله"
							? "bg-(--primary)/20 border-(--primary)"
							: "border-gray-500/50"
					}
					`}
			>
				<CircleCheck size={17} className="absolute right-2" />
				<span className="w-full">{yesOption.text}</span>
			</button>
			<button
				aria-label="خیر"
				onClick={() => {
					selector(noOption.id);
					setActive("خیر");
				}}
				style={
					active == "خیر"
						? { boxShadow: "0 0 5px 1px rgba(168, 206, 47, 0.5)" as const }
						: {}
				}
				className={`cursor-pointer w-full border rounded-[17px] p-2 flex items-center gap-1 relative text-center transition-all duration-500 ease-in-out
					${
						active == "خیر"
							? "bg-(--primary)/20 border-(--primary)"
							: "border-gray-500/50"
					}
					`}
			>
				<CircleX size={17} className="absolute right-2" />
				<span className="w-full">{noOption.text}</span>
			</button>
		</div>
	);
}
