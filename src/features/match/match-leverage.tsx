import SectionContainer from "@/components/base/section-container";
import SetGoalState from "@/components/shared/set-goal-state";
import { Coins, Zap } from "lucide-react";

export default function MatchLeverage() {
	return (
		<div className="w-full flex flex-col justify-start items-center gap-2">
			<div className="w-full flex items-center justify-between">
				<span className="text-[12px] text-(--accent) font-semibold flex items-center gap-0.75 relative">
					<Zap size={12} className="relative top-0.5" />
					ضریب
				</span>
				<span className="text-[9px] text-(--text-muted)">
					ضریب بالاتر، هزینه و جایزه بیشتر
				</span>
			</div>
			<SectionContainer
				rounded="rounded-[12px]"
				extraClass="w-full flex justify-between items-center py-2 px-4"
			>
				<div>
					<SetGoalState>
						<span className="text-[14px] font-semibold">1x</span>
					</SetGoalState>
				</div>
				<div className="text-[12px] text-(--text-main)/80 flex items-center gap-1">
					<Coins className="text-amber-500" size={14} />
					هزینه: 100000 امتیاز
				</div>
			</SectionContainer>
		</div>
	);
}
