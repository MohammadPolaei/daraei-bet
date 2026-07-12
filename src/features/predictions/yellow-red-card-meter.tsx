"use client";

import {
	SpeculativeQuestionItem,
	SpeculativeQuestionOption,
} from "@/types/question-response-type";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type Props = {
	value?: string;
	onChange?: (option: SpeculativeQuestionOption, index: number) => void;
	labels?: string[];
	card: string;
	question: SpeculativeQuestionItem;
};

export function YellowRedCardMeter({
	value: controlledValue,
	onChange,
	card,
	question,
}: Props) {
	const sortedOptions = useMemo(() => {
		return [...question.options].sort(
			(a, b) => Number(a.value) - Number(b.value)
		);
	}, [question.options]);

	const max = sortedOptions.length - 1;
	const [internalValue, setInternalValue] = useState(0);

	const controlledIndex = useMemo(() => {
		if (!controlledValue) return undefined;
		const index = sortedOptions.findIndex(
			(item) => item.id === controlledValue
		);
		return index >= 0 ? index : undefined;
	}, [controlledValue, sortedOptions]);

	const v = controlledIndex !== undefined ? controlledIndex : internalValue;

	const offsetPercent =
		sortedOptions.length > 0 ? 100 / sortedOptions.length / 2 : 0;

	const handleValueChange = (newValue: number) => {
		if (controlledIndex === undefined) {
			setInternalValue(newValue);
		}

		const selectedOption = sortedOptions[newValue];
		if (selectedOption) {
			onChange?.(selectedOption, newValue);
		}
	};

	return (
		<div className="w-full max-w-xl px-0 py-6 mt-5 select-none">
			<div dir="ltr" className="relative w-full">
				<div className="relative h-0.5 w-full bg-(--text-main)/80 rounded-full">
					<div
						className="absolute top-0 bottom-0"
						style={{
							left: `${offsetPercent}%`,
							right: `${offsetPercent}%`,
						}}
					>
						<motion.div
							className="absolute top-0 z-20 -translate-x-1/2 -translate-y-full pointer-events-none"
							animate={{ left: `${max > 0 ? (v / max) * 100 : 0}%` }}
							transition={{ type: "spring", stiffness: 380, damping: 30 }}
						>
							<KnobVisual value={v} card={card} />
						</motion.div>

						<input
							type="range"
							min={0}
							max={max}
							step={1}
							value={v}
							onChange={(e) => {
								handleValueChange(Number(e.target.value));
							}}
							className="absolute top-1/2 -translate-y-1/2 w-full h-20 opacity-0 cursor-pointer z-30"
							style={{
								left: 0,
								width: "100%",
							}}
						/>
					</div>
				</div>

				<div
					className="mt-3 grid w-full text-(--text-main) text-[9px]"
					style={{
						gridTemplateColumns: `repeat(${sortedOptions.length}, minmax(0, 1fr))`,
					}}
				>
					{sortedOptions.map((option, i) => (
						<div
							key={option.id}
							className={`text-center transition-all duration-300 ${
								v === i ? "text-yellow-400 scale-110" : "opacity-90"
							}`}
						>
							<span dir="rtl" className="block">
								{option.value}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function KnobVisual({ value, card }: { value: number; card: string }) {
	return (
		<div className="relative flex flex-col items-center">
			<div className="relative mb-[-10] flex items-center justify-center">
				<svg
					width="64"
					height="40"
					viewBox="0 0 64 74"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="drop-shadow-lg"
				>
					<defs>
						<radialGradient
							id="haloGradient"
							cx="50%"
							cy="50%"
							r="50%"
							fx="50%"
							fy="50%"
						>
							<stop offset="0%" stopColor="#0A0A05" />
							<stop offset="100%" stopColor="#3D3D15" />
						</radialGradient>

						<filter id="softEdges" x="-20%" y="-20%" width="140%" height="140%">
							<feGaussianBlur stdDeviation="0.5" result="blur" />
							<feComposite in="SourceGraphic" in2="blur" operator="over" />
						</filter>
					</defs>

					<circle
						cx="32"
						cy="32"
						r="30"
						fill="url(#haloGradient)"
						opacity="0.9"
					/>

					<rect
						x="20"
						y="16"
						width="24"
						height="32"
						rx="4"
						fill={card === "yellow" ? "#FFDB28" : "#E61D25"}
						filter="url(#softEdges)"
					/>
				</svg>
			</div>

			<div className="h-1.5 w-1.5 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.6)] ring-1 ring-black/20 z-10" />
			<div className="h-3 w-0 border-l-2 border-dashed border-lime-400/50" />
			<div className="h-2 w-2 rounded-full bg-lime-400 relative bottom-[-5]" />
		</div>
	);
}
