import SectionContainer from "@/components/base/section-container";
import MatchDistributionBar from "../stats/match-distribution-bar";
import MatchScore from "./match-score";
import MatchTeamBadge from "./match-team-badge";

export default function MatchHeroCard() {
	return (
		<SectionContainer>
			<MatchScore />
			<MatchTeamBadge />
			{/*  */}
			<MatchDistributionBar />
		</SectionContainer>
	);
}
