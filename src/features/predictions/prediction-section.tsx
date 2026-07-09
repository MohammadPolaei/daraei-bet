import PredictionCard from "./prediction-card";

export default function PredictionSection() {
	return (
		<div className="w-full flex flex-col justify-start items-center gap-3">
			<PredictionCard
				title={
					<span className="font-bold text-[14px]">
						این بازی چند کارت <span className="text-yellow-400">زرد</span> دارد
						؟
					</span>
				}
			/>
			{/* <PredictionCard />
			<PredictionCard />
			<PredictionCard />
			<PredictionCard />
			<PredictionCard /> */}
		</div>
	);
}
