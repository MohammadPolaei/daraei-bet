import { ReactNode } from "react";

export default function SetGoalState({ children }: { children: ReactNode }) {
	const addAndPluseButtonClasses =
		"relative w-4.5 h-4.5 border-1 flex flex-col justify-center items-center rounded-[7px] disabled:opacity-50";
	return (
		<div className="flex items-center gap-2.5">
			<button
				className={`border-green-600 text-green-600 ${addAndPluseButtonClasses}`}
			>
				<span className="absolute top-[-2.5]">+</span>
			</button>
			{children}

			<button
				className={`border-red-600 text-red-600 ${addAndPluseButtonClasses}`}
			>
				<span className="absolute top-[-2.5]">-</span>
			</button>
		</div>
	);
}
