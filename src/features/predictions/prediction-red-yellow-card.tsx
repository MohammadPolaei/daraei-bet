import SectionContainer from "@/components/base/section-container";
import LeverageText from "@/components/shared/leverage-text";
import { useSubmitOptionPrediction } from "@/hooks/use-submit-option";
import { SpeculativeQuestionItem } from "@/types/question-response-type";
import { ChevronLeft, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import { YellowRedCardMeter } from "./yellow-red-card-meter";

export default function PredictionRedYellowCard({
	card,
	question,
	questionNumber,
}: {
	card: string;
	question: SpeculativeQuestionItem;
	questionNumber: number;
}) {
	const gameId = "019f530f-9a59-727d-a71a-7258e578613d";

	const [selectedYellowRedOptionId, setSelectedYellowRedOptionId] =
		useState<string>("");
	const [optionLeverage, setOptionLeverage] = useState(1);
	const submitMutation = useSubmitOptionPrediction();

	const usersCount = useMemo(() => {
		return question.pool.options.reduce((sum: any, currentValue: any) => {
			return sum + Number(currentValue.participants_count);
		}, 0);
	}, [question]);

	const userAnswered = useMemo(() => {
		return question.options.find(
			(answer) => answer.id == question.user_answer?.option_id
		);
	}, [question.user_answer?.option_id]);

	return (
		<SectionContainer extraClass="w-full p-3">
			<div className="w-full flex justify-between items-center">
				<span className="text-[12px] font-semibold text-(--primary)">
					سوال {questionNumber}
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
			{question.user_answer ? (
				<SectionContainer extraClass=" flex flex-col justify-center items-center p-3 bg-(--primary)/10">
					<span className="text-(--primary) w-full text-center text-[14px] font-semibold">{`پاسخ ثبت شده: ${userAnswered?.text}`}</span>
				</SectionContainer>
			) : (
				<YellowRedCardMeter
					card={card}
					question={question}
					value={selectedYellowRedOptionId}
					onChange={(option) => {
						setSelectedYellowRedOptionId(option.id);
					}}
				/>
			)}
			{/* push answer section */}
			<div
				className={`${
					selectedYellowRedOptionId !== ""
						? "h-full opacity-100"
						: "h-0 opacity-0"
				} w-full flex flex-col justify-between items-center gap-2 transition-all duration-700 ease-in-out`}
			>
				<LeverageText />
				<SectionContainer
					extraClass="w-full flex items-center gap-1 p-1"
					rounded="rounded-[10px]"
				>
					<button
						aria-label="افزایش اهرم"
						onClick={() => setOptionLeverage(1)}
						className={`${
							optionLeverage == 1 ? "bg-(--primary) text-black" : "text-white"
						} w-full rounded-[7px] py-2  font-semibold text-[15px] cursor-pointer transition-all duration-200 ease-in-out active:scale-90 active:opacity-50 origin-center`}
					>
						1x
					</button>
					<span>
						{<ChevronLeft size={10} className="text-(--text-muted)" />}
					</span>
					<button
						aria-label="کاهش اهرم"
						onClick={() => setOptionLeverage(2)}
						className={`${
							optionLeverage == 2 ? "bg-(--primary) text-black" : "text-white"
						} w-full rounded-[7px] py-2  font-semibold text-[15px] cursor-pointer transition-all duration-200 ease-in-out active:scale-90 active:opacity-50 origin-center`}
					>
						2x
					</button>
				</SectionContainer>
				{submitMutation.isError ? (
					<span className="w-full text-[12px] text-white/90 text-center p-2 rounded-[7px] bg-red-500/70 animate-pulse">
						پاسخ قبلا ثبت شده
					</span>
				) : null}
				<button
					aria-label="ارسال پاسخ"
					disabled={submitMutation.isPending}
					onClick={() => {
						submitMutation.mutateAsync({
							game_id: gameId,
							answers: [
								{
									question_id: question.id,
									option_id: selectedYellowRedOptionId,
									leverage: String(optionLeverage),
								},
							],
						});
					}}
					className="w-full bg-(--primary) text-black rounded-[7px] py-2  font-semibold text-[15px] cursor-pointer transition-all duration-200 ease-in-out active:scale-90 active:opacity-50 origin-center disabled:opacity-40"
				>
					{submitMutation.isPending ? "در حال ثبت ..." : "ثبت پاسخ"}
				</button>
			</div>
		</SectionContainer>
	);
}
