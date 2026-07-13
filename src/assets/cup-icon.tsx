import { SVGProps } from "react";

type TrophyIconProps = SVGProps<SVGSVGElement>;

export default function CupIcon(props: TrophyIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 64 64"
			fill="none"
			aria-hidden="true"
			{...props}
		>
			<path
				fill="currentColor"
				fillRule="evenodd"
				clipRule="evenodd"
				d="M18 8H46V18C46 24.222 42.648 29.96 37.2 33.04L35 34.284V40H42C43.105 40 44 40.895 44 42V46H50C51.105 46 52 46.895 52 48V54C52 55.105 51.105 56 50 56H14C12.895 56 12 55.105 12 54V48C12 46.895 12.895 46 14 46H20V42C20 40.895 20.895 40 22 40H29V34.284L26.8 33.04C21.352 29.96 18 24.222 18 18V8ZM14 12H18V22H16C12.686 22 10 19.314 10 16V14C10 12.895 10.895 12 12 12H14ZM50 12H46V22H48C51.314 22 54 19.314 54 16V14C54 12.895 53.105 12 52 12H50Z"
			/>
		</svg>
	);
}
