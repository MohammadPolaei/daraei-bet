"use client";

import CupIcon from "@/assets/cup-icon";
import headerBg from "@/assets/header-bg.png";
import { Bell, CircleChevronRight } from "lucide-react";
import Image from "next/image";

const gameId = "019f530f-9a59-727d-a71a-7258e578613d";

export default function Header() {
	// const { data } = useUserProfile();
	// const userScore = data?.data.data.attributes.points_total;

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
				className="flex items-center gap-1 cursor-pointer"
			>
				<CircleChevronRight size={25} className="text-(--primary)" />
				<span className="text-[12px] font-semibold">بازگشت</span>
			</button>

			<div className="flex items-center justify-start gap-1">
				<div className="flex h-8 items-center justify-center gap-1 rounded-full bg-linear-180 from-black via-transparent to-(--primary)/20 px-3 text-[12px] font-bold text-(--primary) cursor-pointer">
					<span>20,150,960</span>
					<CupIcon className="size-6 text-(--primary)" />
				</div>
				<div className="flex h-7 w-7 flex-col items-center justify-center rounded-full bg-linear-180 from-black via-transparent to-(--primary)/20 animation-notification relative">
					<span className="absolute top-[-5] left-[-5] w-4 h-4 text-[8px] font-semibold bg-red-400 flex flex-col justify-center items-center rounded-full">
						1
					</span>
					<Bell size={14} className="text-(--primary)" />
				</div>
			</div>
		</div>
	);
}
