"use client";

import SectionContainer from "@/components/base/section-container";
import { usePrediction } from "@/context/active-prediction-context";
import PredictionCard from "./prediction-card";
import PredictionRedYellowCard from "./prediction-red-yellow-card";

import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
	hidden: {
		transition: {
			staggerChildren: 0.001,
			staggerDirection: -1,
		},
	},
	show: {
		transition: {
			staggerChildren: 0.12,
			delayChildren: 0.2,
		},
	},
};

const itemVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.8,
		y: 12,
		transition: {
			duration: 0.5,
			ease: "easeIn",
		},
	},
	show: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: {
			duration: 0.45,
			ease: "easeOut" as const,
		},
	},
};

export default function PredictionSection() {
	const { activePrediction } = usePrediction();
	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate={activePrediction ? "show" : "hidden"}
			className={`w-full flex flex-col justify-start items-center gap-3 transition-all duration-100 ease-in-out ${
				activePrediction
					? "h-full opacity-100"
					: "h-0 opacity-0 pointer-events-none"
			}`}
		>
			<SectionContainer
				rounded="rounded-[10px]"
				extraClass="flex justify-between items-center text-[10px] font-semibold px-3 w-full"
			>
				<span className="text-(--text-muted)">پیشرفت پاسخ دهی</span>
				<span className="text-(--primary)">0 از 6</span>
			</SectionContainer>
			<motion.div variants={itemVariants} className="w-full">
				<PredictionRedYellowCard
					key={"yellow"}
					card="yellow"
					title={
						<span className="font-bold text-[12px]">
							تعداد کارت های زرد بازی چندتا خواهدبود ؟
						</span>
					}
				/>
			</motion.div>
			<motion.div variants={itemVariants} className="w-full">
				<PredictionRedYellowCard
					key={"red"}
					card="red"
					title={
						<span className="font-bold text-[12px]">
							تعداد کارت های قرمز بازی چندتا خواهدبود ؟
						</span>
					}
				/>
			</motion.div>
			<motion.div variants={itemVariants} className="w-full">
				<PredictionCard
					yesPercentage={60}
					title={
						<span className="font-bold text-[12px]">
							یک بازیکن هت‌تریک میکنه؟
						</span>
					}
				/>
			</motion.div>
			<motion.div variants={itemVariants} className="w-full">
				<PredictionCard
					yesPercentage={46}
					title={
						<span className="font-bold text-[12px]">
							بازی یک کارت قرمز دارد؟
						</span>
					}
				/>
			</motion.div>
			<motion.div variants={itemVariants} className="w-full">
				<PredictionCard
					yesPercentage={73}
					title={
						<span className="font-bold text-[12px]">گل به خودی داریم؟ </span>
					}
				/>
			</motion.div>
			<motion.div variants={itemVariants} className="w-full">
				<PredictionCard
					yesPercentage={12.5}
					title={
						<span className="font-bold text-[12px]">
							5 گل یا بیشتر توی این بازی زده میشه؟{" "}
						</span>
					}
				/>
			</motion.div>
		</motion.div>
	);
}
