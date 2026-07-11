"use client";

import { CircleChevronRight } from "lucide-react";

export default function Header() {
	return (
		<div className="w-full py-5 px-5 fixed z-100 backdrop-blur-[3px] shadow-sm bg-(--text-muted)/5">
			<button
				onClick={() => {
					//back function
				}}
				className="flex items-center gap-1"
			>
				<CircleChevronRight size={25} className="text-(--primary)" />
				<span className="text-[14px] font-bold">بازگشت</span>
			</button>
			<div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}
