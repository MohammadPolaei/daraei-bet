import TopTittle from "@/assets/match/top-title";
import ForecastButton from "@/components/base/forcast-button";
import SectionContainer from "@/components/base/section-container";
import MatchDistributionBar from "../stats/match-distribution-bar";
import MatchLeverage from "./match-leverage";
import MatchScore from "./match-score";
import MatchTeamBadge from "./match-team-badge";

export default function MatchHeroCard() {
	return (
		<div>
			<SectionContainer extraClass="flex flex-col justify-center items-center gap-5">
				<TopTittle>فعال</TopTittle>
				<MatchScore />
				<MatchLeverage />
				<ForecastButton>ویرایش پیش بینی</ForecastButton>
			</SectionContainer>

			<MatchTeamBadge />

			{/*  */}
			<MatchDistributionBar />
		</div>
	);
}
