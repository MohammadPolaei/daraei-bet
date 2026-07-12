// context/prediction-form-context.tsx
"use client";

import { predictionFormReducer } from "@/reducer/prediction-form-reducer";
import {
	initialFormState,
	PredictionFormAction,
	PredictionPayload,
} from "@/types/prediction-form";
import {
	createContext,
	Dispatch,
	ReactNode,
	useContext,
	useMemo,
	useReducer,
} from "react";

interface PredictionFormContextValue {
	state: PredictionPayload;
	dispatch: Dispatch<PredictionFormAction>;
}

const PredictionFormContext = createContext<PredictionFormContextValue | null>(
	null
);

interface PredictionFormProviderProps {
	children: ReactNode;
}

export function PredictionFormProvider({
	children,
}: PredictionFormProviderProps) {
	const [state, dispatch] = useReducer(predictionFormReducer, initialFormState);

	const value = useMemo(() => ({ state, dispatch }), [state]);

	return (
		<PredictionFormContext.Provider value={value}>
			{children}
		</PredictionFormContext.Provider>
	);
}

export function usePredictionForm() {
	const context = useContext(PredictionFormContext);

	if (!context) {
		throw new Error(
			"usePredictionForm must be used within PredictionFormProvider"
		);
	}

	return context;
}
