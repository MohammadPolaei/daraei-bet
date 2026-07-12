import SectionContainer from "@/components/base/section-container";
import SetGoalState from "@/components/shared/set-goal-state";
import { Coins, Zap } from "lucide-react";
import { useState } from "react";

export default function MatchLeverage() {
	const [leverage, setLeverage] = useState(1);
	const cost = 100_000 * leverage;

	return (
		<div className="w-full flex flex-col justify-start items-center gap-2">
			<div className="w-full flex items-center justify-between">
				<span className="text-[10px] text-(--accent) font-bold flex items-center gap-0.75 relative">
					<Zap size={12} className="relative top-0" />
					ضریب
				</span>
				<span className="text-[8px] text-(--text-muted)">
					ضریب بالاتر، هزینه و جایزه بیشتر
				</span>
			</div>
			<SectionContainer
				rounded="rounded-[12px]"
				extraClass="w-full flex justify-between items-center py-2 px-4"
			>
				<div>
					<SetGoalState setState={setLeverage} max={10} min={1}>
						<span className="text-[14px] font-semibold text-center">{`${leverage}x`}</span>
					</SetGoalState>
				</div>
				<div className="text-[11px] text-(--text-main)/80 flex items-center gap-1">
					<Coins className="text-amber-500" size={14} />
					هزینه: {new Intl.NumberFormat("fa-IR").format(cost)} امتیاز
				</div>
			</SectionContainer>
		</div>
	);
}
