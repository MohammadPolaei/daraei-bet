import SectionContainer from "@/components/base/section-container";
import PredictionOptions from "./prediction-options";
import PredictionProgress from "./prediction-progress";

export default function PredictionCard() {
	return (
		<SectionContainer>
			<PredictionOptions />
			<PredictionProgress />
		</SectionContainer>
	);
}
