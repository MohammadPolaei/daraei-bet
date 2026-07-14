import { FC, HTMLAttributes, ReactNode, useId } from "react";

interface MatchStatusPillProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
	width?: number;
	height?: number;
}

export const TopTittle: FC<MatchStatusPillProps> = ({
	children,
	className = "w-full",
	width = "100%",
	height = "50%",
	style,
	...props
}) => {
	const filterId = useId();

	// نسبت اندازه متن نسبت به ارتفاع

	return (
		<div
			className={`w-full absolute -top-20 small-mobile:-top-21 premedium-mobile:-top-21.5 premedium1-mobile:-top-22 medium-mobile:-top-22.5 large-mobile:-top-23 right-[-0.25] select-none pointer-events-none flex flex-col justify-start items-center 
				${className}`}
			style={{
				width,
				height,
				...style,
			}}
			{...props}
		>
			<svg
				width="90%"
				height="100%"
				viewBox="0 0 157 101"
				preserveAspectRatio="none"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className=""
				aria-hidden="true"
			>
				<g filter={`url(#${filterId})`}>
					<path
						d="M42.9997 43.7934C42.6894 43.4269 42.9499 42.865 43.4302 42.865H112.592C113.078 42.865 113.336 43.4386 113.014 43.8026L102.06 56.1894C100.99 57.4001 99.4515 58.0933 97.8354 58.0933H57.7218C56.0634 58.0933 54.489 57.3634 53.4173 56.0977L42.9997 43.7934Z"
						fill="#A6DC2D"
					/>
				</g>

				<defs>
					<filter
						id={filterId}
						x="0"
						y="0"
						width="157"
						height="101"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB"
					>
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset />
						<feGaussianBlur stdDeviation="21.4325" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0.65098 0 0 0 0 0.862745 0 0 0 0 0.176471 0 0 0 0.1 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow"
							result="shape"
						/>
					</filter>
				</defs>
			</svg>

			<div className="absolute inset-0 flex items-center justify-center">
				<span className="whitespace-nowrap font-black tracking-wider text-black z-10 text-[12px]">
					{children}
				</span>
			</div>
		</div>
	);
};

export default TopTittle;
