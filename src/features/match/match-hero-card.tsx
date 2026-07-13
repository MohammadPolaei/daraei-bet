"use client";

import TopTittle from "@/assets/match/top-title";
import ForecastButton from "@/components/base/forcast-button";
import SectionContainer from "@/components/base/section-container";
import { usePrediction } from "@/context/active-prediction-context";
import { usePredictionForm } from "@/context/prediction-form-context";
import { useGamePrediction } from "@/hooks/use-game-prediction";
import { useSubmitPrediction } from "@/hooks/use-submit-prediction";
import { getGame } from "@/services/get-game";
import { SingleGameResponse } from "@/types/game-type";
import { useQuery } from "@tanstack/react-query";
import { OctagonAlert } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import MatchDistributionBar from "../stats/match-distribution-bar";
import MatchLeverage from "./match-leverage";
import MatchScore from "./match-score";
import UsersMatchForecast from "./users-match-forecast";

const gameId = "019f530f-9a59-727d-a71a-7258e578613d";

export interface ProgressSegment {
	label: string;
	percentage: number;
	color: string;
}

// تعریف پراپ‌های ورودی کامپوننت
export interface MultiSegmentProgressBarProps {
	segments: [ProgressSegment, ProgressSegment, ProgressSegment]; // دقیقاً ۳ سگمنت دریافت می‌کند
	totalPredictions?: string; // تعداد پیش‌بینی‌ها (مثلاً "۹۶۵ پیش‌بینی")
	title?: string; // عنوان کامپوننت (مثلاً "نظر کاربران")
}

export default function MatchHeroCard() {
	const { activePrediction, setActivePrediction, winner } = usePrediction();
	const [changedState, setChangedState] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	// game data
	const { data, isLoading } = useQuery<SingleGameResponse>({
		queryKey: ["game", gameId],
		queryFn: () => getGame(gameId),
		enabled: !!gameId,
	});

	// this user prediction
	const userPrediction = data?.data?.included.filter(
		(data) => data.attributes.outcome_predicted
	);

	// context

	// prediction data
	const predictionData = useGamePrediction(gameId);

	const status = data?.data?.data.attributes.status;

	const gameStatusPersian =
		status === "finished"
			? "پایان"
			: status === "in_progress"
			? "در حال اجرا"
			: status === "scored"
			? "اتمام فرصت"
			: status === "upcoming"
			? "فعال"
			: "...";

	// teamA
	const team1 = data?.data?.included[0].attributes.fa_name;
	// teamB
	const team2 = data?.data?.included[1].attributes.fa_name;

	// submit prediction
	const { state, dispatch } = usePredictionForm();

	const submitPrediction = useSubmitPrediction();

	const initialState = useMemo(() => {
		return { ...state };
	}, [submitPrediction.isPending]);

	const handleSubmit = () => {
		dispatch({
			type: "SET_GAME_ID",
			payload: gameId,
		});

		const currentState = { ...state, game_id: gameId };

		let payloadToSend;

		if (currentState.predictions[0].predicts_penalty) {
			payloadToSend = {
				game_id: gameId,
				predictions: [
					{
						predicts_penalty: true,
						leverage: currentState.predictions[0].leverage,
					},
				],
			};
		} else {
			payloadToSend = currentState;
		}

		console.log("Sending data:", payloadToSend);

		submitPrediction.mutate(payloadToSend);
		setSubmitted(true);
	};

	useEffect(() => {
		if (!isLoading) {
			if (
				state.predictions[0].predicts_penalty ==
					userPrediction![0].attributes.is_penalty_prediction &&
				state.predictions[0].leverage ==
					userPrediction![0].attributes.leverage_multiplier &&
				state.predictions[0].score_team1_predicted ==
					userPrediction![0].attributes.score_team1_predicted &&
				state.predictions[0].score_team2_predicted ==
					userPrediction![0].attributes.score_team2_predicted
			) {
				setChangedState(false);
			} else {
				setChangedState(true);
			}
		} else return;
	}, [state, userPrediction]);

	useEffect(() => {
		const equalStates =
			JSON.stringify(initialState.predictions) ===
			JSON.stringify(state.predictions);

		if (equalStates) {
			setSubmitted(false);
			return;
		} else {
			setSubmitted(true);
			return;
		}
	}, [state]);

	return (
		<div className="">
			<SectionContainer extraClass="flex flex-col justify-center items-center gap-4">
				<TopTittle>{gameStatusPersian}</TopTittle>
				<MatchScore gameId={gameId} />
				<MatchLeverage />
				<ForecastButton
					onClick={handleSubmit}
					disabled={
						winner == "none" ||
						submitPrediction.isPending ||
						status !== "upcoming" ||
						!changedState ||
						!submitted
					}
				>
					ویرایش پیش بینی
				</ForecastButton>
			</SectionContainer>
			<div className="relative w-full bg-(--danger-dark)/25 border border-(--danger)/50 text-center text-(--text-muted) text-[11px] overflow-hidden rounded-[11px] px-6 py-3 font-normal transition-all flex justify-center items-center gap-1 my-3">
				<OctagonAlert size={18} className="text-(--danger)" />
				نتیجه نهایی بازی در 120 دقیقه محاسبه میشود
			</div>

			<UsersMatchForecast
				loading={isLoading}
				teamA={team1 ?? ""}
				teamB={team2 ?? ""}
				data={predictionData.data}
			/>

			{/*  */}
			<MatchDistributionBar
				onClick={() => setActivePrediction(!activePrediction)}
			/>
		</div>
	);
}
