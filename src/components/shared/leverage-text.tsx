import { Zap } from "lucide-react";

export default function LeverageText() {
	return (
		<div className="w-full flex items-center justify-between">
			<span className="text-[10px] text-(--accent) font-bold flex items-center gap-0.75 relative">
				<Zap size={12} className="relative top-0" />
				ضریب
			</span>
			<span className="text-[8px] text-(--text-muted)">
				ضریب بالاتر، هزینه و جایزه بیشتر
			</span>
		</div>
	);
}
