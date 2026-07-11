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
};

const PredictionContext = createContext<ContextType | undefined>(undefined);

export function PredictionProvider({ children }: { children: ReactNode }) {
	const [activePrediction, setActivePrediction] = useState(false);

	return (
		<PredictionContext.Provider
			value={{ activePrediction, setActivePrediction }}
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
