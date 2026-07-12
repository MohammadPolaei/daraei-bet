import SectionContainer from "@/components/base/section-container";
import { GamePredictionData } from "@/types/game-prediction";
import { MultiSegmentProgressBar } from "./multi-segment-progress-bar";

// data: MultiSegmentProgressBarProps
export default function UsersMatchForecast({
	data,
	teamA,
	teamB,
}: {
	data: GamePredictionData | undefined;
	teamA: string;
	teamB: string;
}) {
	return (
		<SectionContainer extraClass="p-3">
			<MultiSegmentProgressBar teamA={teamA} teamB={teamB} data={data} />
		</SectionContainer>
	);
}
