import SectionContainer from "@/components/base/section-container";
import LeverageText from "@/components/shared/leverage-text";
import SetGoalState from "@/components/shared/set-goal-state";
import { usePredictionForm } from "@/context/prediction-form-context";
import { getGame } from "@/services/get-game";
import { SingleGameResponse } from "@/types/game-type";
import { useQuery } from "@tanstack/react-query";
import { Coins } from "lucide-react";
import { useEffect, useState } from "react";

const gameId = "019f5546-21df-7019-a943-fc94b1938168";

export default function MatchLeverage() {
	const { dispatch } = usePredictionForm();

	const [leverage, setLeverage] = useState(1);
	const cost = 100_000 * leverage;

	useEffect(() => {
		dispatch({
			type: "SET_LEVERAGE",
			payload: Number(leverage),
		});
	}, [leverage]);

	const { data, isLoading } = useQuery<SingleGameResponse>({
		queryKey: ["game", gameId],
		queryFn: () => getGame(gameId),
		enabled: !!gameId,
	});

	return (
		<div className="w-full flex flex-col justify-start items-center gap-2">
			<LeverageText />
			<SectionContainer
				rounded="rounded-[12px]"
				extraClass="w-full flex justify-between items-center py-2 px-4"
			>
				{isLoading ? (
					<div
						dir="ltr"
						className="w-full h-8 rounded-2xl flex flex-col justify-center items-center text-center bg-gray-500/40 animate-pulse"
					/>
				) : (
					<>
						<div>
							<SetGoalState
								setState={setLeverage}
								max={data!.data!.data.attributes.max_entry_leverage}
								min={data!.data!.data.attributes.min_entry_leverage}
							>
								<span className="text-[14px] font-semibold text-center">{`${leverage}x`}</span>
							</SetGoalState>
						</div>
						<div className="text-[11px] text-(--text-main)/80 flex items-center gap-1">
							<Coins className="text-amber-500" size={14} />
							هزینه: {new Intl.NumberFormat("fa-IR").format(cost)} امتیاز
						</div>
					</>
				)}
			</SectionContainer>
		</div>
	);
}
