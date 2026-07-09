import SectionContainer from "@/components/base/section-container";
import { MultiSegmentProgressBarProps } from "./match-hero-card";
import { MultiSegmentProgressBar } from "./multi-segment-progress-bar";

export default function UsersMatchForecast(data: MultiSegmentProgressBarProps) {
	return (
		<SectionContainer extraClass="p-3">
			<MultiSegmentProgressBar
				segments={data.segments}
				title={data.title}
				totalPredictions={data.totalPredictions}
			/>
		</SectionContainer>
	);
}
