"use client";

import { CircleCheck, CircleX } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export default function PredictionOptions({
	selector,
}: {
	selector: Dispatch<SetStateAction<string>>;
}) {
	const [active, setActive] = useState("");
	return (
		<div className="w-full flex items-center gap-4">
			<button
				onClick={() => setActive("بله")}
				style={
					active == "بله"
						? { boxShadow: "0 0 5px 1px rgba(168, 206, 47, 0.5)" as const }
						: {}
				}
				className={`w-full border rounded-[17px] p-2 flex items-center gap-1 relative text-center transition-all duration-500 ease-in-out
					${
						active == "بله"
							? "bg-(--primary)/20 border-(--primary)"
							: "border-gray-500/50"
					}
					`}
			>
				<CircleCheck size={17} className="absolute right-2" />
				<span className="w-full">بله</span>
			</button>
			<button
				onClick={() => setActive("خیر")}
				style={
					active == "خیر"
						? { boxShadow: "0 0 5px 1px rgba(168, 206, 47, 0.5)" as const }
						: {}
				}
				className={`w-full border rounded-[17px] p-2 flex items-center gap-1 relative text-center transition-all duration-500 ease-in-out
					${
						active == "خیر"
							? "bg-(--primary)/20 border-(--primary)"
							: "border-gray-500/50"
					}
					`}
			>
				<CircleX size={17} className="absolute right-2" />
				<span className="w-full">خیر</span>
			</button>
		</div>
	);
}
