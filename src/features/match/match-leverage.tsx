import SectionContainer from "@/components/base/section-container";
import SetGoalState from "@/components/shared/set-goal-state";

export default function MatchLeverage() {
	return (
		<div className="w-full">
			<SectionContainer
				rounded="rounded-[16px]"
				extraClass="w-full flex justify-between items-center py-3.5 px-6"
			>
				<div>
					<SetGoalState goal={1} text="X" />
				</div>
				<div>هزینه: 1000 امتیاز</div>
			</SectionContainer>
		</div>
	);
}
