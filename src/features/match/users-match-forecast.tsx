import SectionContainer from "@/components/base/section-container";
import { GamePredictionData } from "@/types/game-prediction";
import { MultiSegmentProgressBar } from "./multi-segment-progress-bar";

// data: MultiSegmentProgressBarProps
export default function UsersMatchForecast({
	loading,
	data,
	teamA,
	teamB,
}: {
	loading: boolean;
	data: GamePredictionData | undefined;
	teamA: string;
	teamB: string;
}) {
	return (
		<SectionContainer extraClass="p-3">
			{loading ? (
				<div
					dir="ltr"
					className="w-full h-8 rounded-2xl flex flex-col justify-center items-center text-center bg-gray-500/40 animate-pulse"
				>
					Loading...
				</div>
			) : (
				<MultiSegmentProgressBar teamA={teamA} teamB={teamB} data={data} />
			)}
		</SectionContainer>
	);
}
