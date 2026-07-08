export default function SetGoalState({ goal = 0 }: { goal: number }) {
	const addAndPluseButtonClasses =
		"relative w-5 h-5 border-1 flex flex-col justify-center items-center rounded-[7px] disabled:opacity-50";
	return (
		<div className="flex items-center gap-3">
			<button
				className={`border-green-600 text-green-600 ${addAndPluseButtonClasses}`}
			>
				<span className="absolute top-[-4]">+</span>
			</button>
			<span className="text-[20] font-bold">{goal}</span>

			<button
				className={`border-red-600 text-red-600 ${addAndPluseButtonClasses}`}
			>
				<span className="absolute top-[-4]">-</span>
			</button>
		</div>
	);
}
