import PredictionRedYellowCard from "./prediction-red-yellow-card";

export default function PredictionSection() {
	return (
		<div className="w-full flex flex-col justify-start items-center gap-3">
			<PredictionRedYellowCard
				key={"yellow"}
				card="yellow"
				title={
					<span className="font-bold text-[12px]">
						تعداد کارت های زرد بازی چندتا خواهدبود ؟
					</span>
				}
			/>
			<PredictionRedYellowCard
				key={"red"}
				card="red"
				title={
					<span className="font-bold text-[12px]">
						تعداد کارت های قرمز بازی چندتا خواهدبود ؟
					</span>
				}
			/>
			{/* <PredictionCard
				title={
					<span className="font-bold text-[12px]">
						تعداد کارت های زرد بازی چندتا خواهدبود ؟
					</span>
				}
			/> */}
			{/* <PredictionCard />
			<PredictionCard />
			<PredictionCard />
			<PredictionCard />
			<PredictionCard /> */}
		</div>
	);
}
