import { getGame } from "@/services/get-game";
import { SingleGameResponse } from "@/types/game-type";
import { useQuery } from "@tanstack/react-query";
import { HTMLAttributes, ReactNode } from "react";

// ۱. تعریف اینترفیس برای پروپ‌ها که از ویژگی‌های div ارث‌بری می‌کند
interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const Container = ({
	children,
	className, // کلاس‌های اضافه را دریافت می‌کنیم
	...rest // تمام اتریبیوت‌های دیگر (مثل onClick, style, id و...)
}: ContainerProps) => {
	return (
		<div
			// ترکیب کلاس‌های ثابت با کلاس‌های دریافتی از بیرون
			className={`text-white p-4 rounded-[18px] border border-gray-700/80 bg-[#2fce37]/8 relative ${className}`}
			{...rest} // پخش کردن اتریبیوت‌ها روی تگ div
		>
			{children}
		</div>
	);
};

const gameId = "019f413d-6c50-715e-9fe1-b7986596076a";

export default function ThisMatchScore() {
	const { data, isLoading, isError, error } = useQuery<SingleGameResponse>({
		queryKey: ["game", gameId],
		queryFn: () => getGame(gameId),
		enabled: !!gameId,
	});
	return (
		<div className="w-full space-y-4">
			{/* حالا کانتینر می‌تواند هر ویژگی استاندارد مثل onClick یا className اضافه را بپذیرد */}
			{isLoading ? (
				<div
					dir="ltr"
					className="w-full h-8 rounded-2xl flex flex-col justify-center items-center text-center bg-gray-500/40 animate-pulse"
				/>
			) : (
				<Container className="flex justify-between items-center">
					<span className="text-sm opacity-80">امتیاز این بازی</span>
					<span className="font-bold text-(--primary) text-[16px]">
						{data?.data?.data.attributes.score_pool.toLocaleString()} امتیاز
					</span>
				</Container>
			)}

			{/* بخش پیشرفت (Progress placeholders) */}
			<div className="flex gap-2 justify-between">
				<Container className="flex flex-col justify-evenly items-center gap-2 w-26">
					<span className="text-(--primary)">400,000</span>
					<span className="text-[10px]">نتیجه دقیق</span>
				</Container>
				<Container className="flex flex-col justify-evenly items-center gap-2 w-26">
					<span>100,000</span>
					<span className="text-[10px]">نتیجه درست</span>
				</Container>
				<Container className="flex flex-col justify-evenly items-center gap-2 w-26">
					<span dir="ltr">{`+${10}%`}</span>
					<span className="text-[10px]">دعوت از دوستان</span>
				</Container>
			</div>

			<div className="text-xs text-gray-400 text-right leading-relaxed">
				بعد از پایان هر بازی، امتیاز شما به‌صورت خودکار به شما اضافه می‌شود.
			</div>
		</div>
	);
}
