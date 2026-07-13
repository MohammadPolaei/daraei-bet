import { Dispatch, ReactNode, SetStateAction } from "react";

export default function SetGoalState({
	children,
	min,
	max,
	setState,
}: {
	children: ReactNode;
	min: number;
	max: number;
	setState: Dispatch<SetStateAction<number>>;
}) {
	const addAndPluseButtonClasses =
		"relative w-4.5 h-4.5 border-1 flex flex-col justify-center items-center rounded-[7px] disabled:opacity-50";
	return (
		<div className="flex items-center gap-2.5">
			<button
				aria-label="یک گل اضافه"
				onClick={() => setState((perv) => (perv < max ? perv + 1 : max))}
				className={`border-green-600 text-green-600 active:scale-110 origin-center transition-all duration-100 ease-in-out ${addAndPluseButtonClasses}`}
			>
				<span className="absolute top-[-2.5]">+</span>
			</button>
			<span className="w-4 text-center">{children}</span>

			<button
				aria-label="یک گل کم"
				onClick={() => setState((perv) => (perv > min ? perv - 1 : min))}
				className={`border-red-600 text-red-600 active:scale-110 origin-center transition-all duration-100 ease-in-out ${addAndPluseButtonClasses}`}
			>
				<span className="absolute top-[-2.5]">-</span>
			</button>
		</div>
	);
}
