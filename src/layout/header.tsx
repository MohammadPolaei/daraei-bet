"use client";

import headerBg from "@/assets/header-bg.png";
import { Bell, CircleChevronRight } from "lucide-react";

export default function Header() {
	return (
		<div className="w-full max-w-93.75 py-5 px-5 z-100 flex justify-between backdrop-blur-[3px] shadow-sm">
			<div
				style={{
					backgroundImage: `url('${headerBg.src}')`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "150% 550px",
					backgroundPosition: "center",
				}}
				className="absolute inset-0 top-[-150]"
			/>
			<button
				onClick={() => {
					//back function
				}}
				className="flex items-center gap-1"
			>
				<CircleChevronRight size={25} className="text-(--primary)" />
				<span className="text-[12px] font-semibold">بازگشت</span>
			</button>
			<div className="flex justify-start items-center gap-1">
				<div
					className="flex justify-center items-center gap-1 text-[12px] text-(--primary) font-bold
				rounded-full px-3 h-8 bg-linear-180 from-black via-transparent to-(--primary)/20"
				>
					<span></span>
					<span>20,150,960</span>
				</div>
				<div className="rounded-full w-8 h-8 flex flex-col justify-center items-center bg-linear-180 from-black via-transparent to-(--primary)/20">
					<Bell size={14} className="text-(--primary)" />
				</div>
			</div>
		</div>
	);
}
