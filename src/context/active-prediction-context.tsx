import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from "react";

type ContextType = {
	activePrediction: boolean;
	setActivePrediction: Dispatch<SetStateAction<boolean>>;
	winner: "teamA" | "penalty" | "teamB" | "none";
	setWinner: Dispatch<SetStateAction<"teamA" | "penalty" | "teamB" | "none">>;
};

const PredictionContext = createContext<ContextType | undefined>(undefined);

export function PredictionProvider({ children }: { children: ReactNode }) {
	const [activePrediction, setActivePrediction] = useState(false);
	const [winner, setWinner] = useState<"teamA" | "penalty" | "teamB" | "none">(
		"none"
	);

	return (
		<PredictionContext.Provider
			value={{ activePrediction, setActivePrediction, winner, setWinner }}
		>
			{children}
		</PredictionContext.Provider>
	);
}

export function usePrediction() {
	const ctx = useContext(PredictionContext);
	if (!ctx) {
		throw new Error("usePrediction must be used within a PredictionProvider");
	}
	return ctx;
}
