import React, { ButtonHTMLAttributes, FC } from "react";

interface RoundedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	width?: number | string;
	height?: number | string;
}

export const ForecastButton: FC<RoundedButtonProps> = ({
	children,
	className = "",
}) => {
	return (
		<button
			type="button"
			className={`relative w-full bg-(--primary) text-black overflow-hidden rounded-[15px] px-6 py-4 font-bold transition-all ${className}`}
		>
			<span className="relative z-10 flex h-full w-full items-center justify-center text-center text-[18px] leading-none">
				{children}
			</span>
		</button>
	);
};

export default ForecastButton;
