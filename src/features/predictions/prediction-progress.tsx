type Props = {
	yesPercent: number; // عددی بین 0 تا 100
};

export function PredictionProgress({ yesPercent }: Props) {
	const noPercent = 100 - yesPercent;

	return (
		<div className="w-full max-w-xl my-4">
			{/* ردیف لیبل‌ها */}
			<div className="flex justify-between text-white text-[10px] mb-2 px-1">
				<span className="font-medium">بله {yesPercent.toFixed(1)}٪</span>
				<span className="font-medium">خیر {noPercent.toFixed(1)}٪</span>
			</div>

			{/* کانتینر اصلی نوار */}
			<div className="flex gap-1 w-full h-3 rounded-[3px] overflow-hidden shadow-lg bg-black relative">
				{/* بخش "خیر" (قرمز تیره) */}

				{/* بخش "بله" (زیتونی تیره) */}
				<div
					className="h-full bg-(--primary-dark) rounded-l-[1px] transition-all duration-500 ease-out origin-left z-20"
					style={{
						width: `${yesPercent}%`,
						transform: "skewX(-40deg)", // ایجاد برش مورب
					}}
				/>
				<div
					className="h-full bg-[#4A151B] rounded-r-[1px] transition-all duration-500 ease-out origin-left"
					style={{
						transform: "skewX(-40deg)", // ایجاد برش مورب
						width: `${noPercent}%`,
					}}
				/>
				{/* <div className="h-full absolute left-0 w-1 bg-[#4A151B] rounded-l-[1px] transition-all origin-left" /> */}
			</div>
		</div>
	);
}
