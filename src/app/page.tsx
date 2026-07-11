import MatchHeroCard from "@/features/match/match-hero-card";
import PredictionSection from "@/features/predictions/prediction-section";
import ThisMatchScore from "@/features/stats/this-match-score";
import Header from "@/layout/header";
import MobileNavbar from "@/layout/mobile-navbar";

export default function Home() {
	return (
		<div className="min-h-screen max-w-93.75 bg-app-bg pb-24 flex flex-col justify-start items-center">
			<Header />
			<main className="container mx-auto px-4 py-4 space-y-3">
				<MatchHeroCard />
				<PredictionSection />
				<ThisMatchScore />
			</main>
			<MobileNavbar />
		</div>
	);
}
