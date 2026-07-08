import MatchHeroCard from "@/features/match/match-hero-card";
import PredictionSection from "@/features/predictions/prediction-section";
import Header from "@/layout/header";
import MobileNavbar from "@/layout/mobile-navbar";

export default function Home() {
	return (
		<div className="min-h-screen bg-app-bg pb-24 flex flex-col justify-start items-center">
			<Header />
			<main className="container mx-auto px-4 py-4 space-y-6">
				<MatchHeroCard />
				<PredictionSection />
			</main>
			<MobileNavbar />
		</div>
	);
}
