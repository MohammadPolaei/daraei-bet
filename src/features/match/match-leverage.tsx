import SectionContainer from "@/components/base/section-container";
import SetGoalState from "@/components/shared/set-goal-state";

export default function MatchLeverage() {
	return (
		<div className="w-full">
			<div className="w-full flex items-center justify-between">
				<span>ضریب</span>
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
				<div className="text-[12px] text-(--text-main)/80">
					هزینه: 100000 امتیاز
				</div>
			</SectionContainer>
		</div>
	);
}
