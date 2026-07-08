import TopTittle from "@/assets/match/top-title";
import ForecastButton from "@/components/base/forcast-button";
import SectionContainer from "@/components/base/section-container";
import MatchDistributionBar from "../stats/match-distribution-bar";
import MatchScore from "./match-score";
import MatchTeamBadge from "./match-team-badge";

export default function MatchHeroCard() {
	return (
		<SectionContainer extraClass="flex flex-col justify-center items-center gap-5">
			<TopTittle>فعال</TopTittle>
			<MatchScore />
			<ForecastButton>ویرایش پیش بینی</ForecastButton>

			<MatchTeamBadge />

			{/*  */}
			<MatchDistributionBar />
		</SectionContainer>
	);
}
