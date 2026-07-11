"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type Props = {
	max?: number; // مثلاً 8
	value?: number; // controlled (اختیاری)
	onChange?: (v: number) => void;
	labels?: string[]; // لیبل‌های زیر خط
	card: string;
};

export function YellowRedCardMeter({
	max = 8,
	value: controlledValue,
	onChange,
	labels,
	card,
}: Props) {
	const [internalValue, setInternalValue] = useState(0);

	// تشخیص کنترل شده بودن کامپوننت
	const v = controlledValue !== undefined ? controlledValue : internalValue;

	// فرمول محاسبه آفست دقیق بر اساس تعداد ستون‌ها جهت تراز شدن کامل با مرکز لیبل‌ها
	// برای max = 8، تعداد ستون‌ها 9 است. آفست هر طرف برابر است با: (100 / 9) / 2 = 5.55%
	const offsetPercent = 100 / (max + 1) / 2;

	const safeLabels = useMemo(() => {
		if (labels?.length) return labels;
		const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
		const arr: string[] = ["صفر"];
		for (let i = 1; i < max; i++)
			arr.push(String(i).replace(/\d/g, (d) => farsiDigits[Number(d)]));
		arr.push(`${farsiDigits[max]}+`);
		return arr;
	}, [labels, max]);

	const handleValueChange = (newValue: number) => {
		if (controlledValue === undefined) {
			setInternalValue(newValue);
		}
		onChange?.(newValue);
	};

	return (
		<div className="w-full max-w-xl px-0 py-6 mt-5 select-none">
			{/* ایزوله کردن جهت برای تضمین حرکت چپ به راست در همه‌ی پروژه‌ها */}
			<div dir="ltr" className="relative w-full">
				{/* خط محور اصلی (Track) */}
				<div className="relative h-0.5 w-full bg-(--text-main)/80 rounded-full">
					{/* بخش فعال ریل (تراز شده بین مرکز اولین و آخرین لیبل) */}
					<div
						className="absolute top-0 bottom-0"
						style={{
							left: `${offsetPercent}%`,
							right: `${offsetPercent}%`,
						}}
					>
						{/* دکمه (Knob) متحرک - با pointer-events-none کلیک‌ها را عبور می‌دهد */}
						<motion.div
							className="absolute top-0 z-20 -translate-x-1/2 -translate-y-full pointer-events-none"
							animate={{ left: `${(v / max) * 100}%` }}
							transition={{ type: "spring", stiffness: 380, damping: 30 }}
						>
							<KnobVisual value={v} card={card} />
						</motion.div>

						{/* اینپوت رنج مخفی برای مدیریت دقیق، بی‌نقص و پله‌ای درگ */}
						<input
							type="range"
							min={0}
							max={max}
							step={1}
							value={v}
							onChange={(e) => handleValueChange(Number(e.target.value))}
							className="absolute top-1/2 -translate-y-1/2 w-full h-20 opacity-0 cursor-pointer z-30"
							style={{
								left: 0,
								width: "100%",
							}}
						/>
					</div>
				</div>

				{/* ردیف اعداد (Labels) */}
				<div
					className="mt-3 grid w-full text-(--text-main) text-[9px]"
					style={{
						gridTemplateColumns: `repeat(${max + 1}, minmax(0, 1fr))`,
					}}
				>
					{safeLabels.map((t, i) => (
						<div
							key={i}
							className={`text-center transition-all duration-300 ${
								v === i ? "text-yellow-400 scale-110" : "opacity-90"
							}`}
						>
							<span dir="rtl" className="block">
								{t}
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
			{/* مجموعه کارت زرد و هاله نور */}
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
						{/* گرادینت دایره‌ای دقیق مطابق تصویر */}
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

						{/* فیلتر برای نرم کردن لبه‌های کارت زرد */}
						<filter id="softEdges" x="-20%" y="-20%" width="140%" height="140%">
							<feGaussianBlur stdDeviation="0.5" result="blur" />
							<feComposite in="SourceGraphic" in2="blur" operator="over" />
						</filter>
					</defs>

					{/* دایره هاله (بک‌گراند) */}
					<circle
						cx="32"
						cy="32"
						r="30"
						fill="url(#haloGradient)"
						opacity="0.9"
					/>

					{/* کارت زرد وسط */}
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
			{/* نقطه سبز بالا (زیر کارت) */}
			<div className="h-1.5 w-1.5 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.6)] ring-1 ring-black/20 z-10" />

			{/* خط چین اتصال سبز */}
			<div className="h-3 w-0 border-l-2 border-dashed border-lime-400/50" />

			{/* نقطه سبز پایینی که روی خط محور می‌نشیند */}
			<div className="h-2 w-2 rounded-full bg-lime-400 relative bottom-[-5]" />
		</div>
	);
}
