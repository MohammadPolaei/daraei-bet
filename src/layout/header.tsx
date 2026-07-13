"use client";

import headerBg from "@/assets/header-bg.png";
import { Bell, CircleChevronRight } from "lucide-react";
import Image from "next/image";

export default function Header() {
	return (
		<div
			id="header"
			className="relative z-10 flex w-full max-w-93.75 justify-between px-5 py-5 backdrop-blur-[3px] shadow-sm"
		>
			<div className="w-full absolute inset-0 -top-42 -z-10 overflow-hidden pointer-events-none flex flex-col justify-start items-center">
				<Image
					src={headerBg}
					alt="Header Background"
					priority
					width={250}
					height={200}
					sizes="375px"
					className="object-cover object-top scale-150"
				/>
			</div>

			<button
				aria-label="بازگشت به صفحه قبل"
				onClick={() => {
					window.history.back();
				}}
				className="flex items-center gap-1"
			>
				<CircleChevronRight size={25} className="text-(--primary)" />
				<span className="text-[12px] font-semibold">بازگشت</span>
			</button>

			<div className="flex items-center justify-start gap-1">
				<div className="flex h-8 items-center justify-center gap-1 rounded-full bg-linear-180 from-black via-transparent to-(--primary)/20 px-3 text-[12px] font-bold text-(--primary)">
					<span>20,150,960</span>
				</div>
				<div className="flex h-8 w-8 flex-col items-center justify-center rounded-full bg-linear-180 from-black via-transparent to-(--primary)/20">
					<Bell size={14} className="text-(--primary)" />
				</div>
			</div>
		</div>
	);
}
