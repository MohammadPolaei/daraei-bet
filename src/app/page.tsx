"use client";

import { PredictionProvider } from "@/context/active-prediction-context";
import { PredictionFormProvider } from "@/context/prediction-form-context";
import MatchHeroCard from "@/features/match/match-hero-card";
import PredictionSection from "@/features/predictions/prediction-section";
import ThisMatchScore from "@/features/stats/this-match-score";
import Header from "@/layout/header";

export default function Home() {
	return (
		<div className="min-h-fit max-w-93.75 bg-app-bg pb-24 flex flex-col justify-start items-center relative">
			<Header />
			<main className="container mx-auto px-4 py-1 space-y-3">
				<PredictionProvider>
					<PredictionFormProvider>
						<MatchHeroCard />
						<PredictionSection />
						<ThisMatchScore />
					</PredictionFormProvider>
				</PredictionProvider>
			</main>
			{/* <MobileNavbar /> */}
		</div>
	);
}
