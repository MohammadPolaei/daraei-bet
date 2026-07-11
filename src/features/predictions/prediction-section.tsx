import PredictionCard from "./prediction-card";
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
			<PredictionCard
				yesPercentage={60}
				title={
					<span className="font-bold text-[12px]">
						یک بازیکن هت‌تریک میکنه؟
					</span>
				}
			/>
			<PredictionCard
				yesPercentage={46}
				title={
					<span className="font-bold text-[12px]">بازی یک کارت قرمز دارد؟</span>
				}
			/>
			<PredictionCard
				yesPercentage={73}
				title={
					<span className="font-bold text-[12px]">گل به خودی داریم؟ </span>
				}
			/>
			<PredictionCard
				yesPercentage={12.5}
				title={
					<span className="font-bold text-[12px]">
						5 گل یا بیشتر توی این بازی زده میشه؟{" "}
					</span>
				}
			/>
		</div>
	);
}
