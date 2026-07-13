import SectionContainer from "@/components/base/section-container";
import LeverageText from "@/components/shared/leverage-text";
import { useSubmitOptionPrediction } from "@/hooks/use-submit-option";
import { SpeculativeQuestionItem } from "@/types/question-response-type";
import { ChevronLeft, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import PredictionOptions from "./prediction-options";
import PredictionOptionsSelected from "./prediction-options-selected";
import { PredictionProgress } from "./prediction-progress";

export default function PredictionCard({
	question,
	questionNumber,
}: {
	question: SpeculativeQuestionItem;
	questionNumber: number;
}) {
	const gameId = "019f530f-9a59-727d-a71a-7258e578613d";
	// submit options
	const submitMutation = useSubmitOptionPrediction();
	const [selectedOptionId, setSelectedOptionId] = useState("");
	const [optionLeverage, setOptionLeverage] = useState(1);

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
				<PredictionOptionsSelected
					question={question}
					selectedOptionId={userAnswered!.id}
				/>
			) : (
				<>
					<PredictionOptions
						selector={setSelectedOptionId}
						question={question}
					/>
					<PredictionProgress yesPercent={yesPercentageData} />
				</>
			)}
			{/* push answer section */}
			<div
				className={`${
					selectedOptionId !== "" ? "h-full opacity-100" : "h-0 opacity-0"
				} w-full flex flex-col justify-between items-center gap-2 transition-all duration-700 ease-in-out`}
			>
				<LeverageText />
				<SectionContainer
					extraClass="w-full flex items-center gap-1 p-1"
					rounded="rounded-[10px]"
				>
					<button
						aria-label="افزودن اهرم"
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
					aria-label="ثبت پاسخ"
					disabled={submitMutation.isPending}
					onClick={() => {
						submitMutation.mutateAsync({
							game_id: gameId,
							answers: [
								{
									question_id: question.id,
									option_id: selectedOptionId,
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
