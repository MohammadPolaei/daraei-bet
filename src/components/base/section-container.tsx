import { ReactNode } from "react";

export default function SectionContainer({
	children,
	extraClass,
	rounded,
}: {
	children: ReactNode;
	extraClass?: string;
	rounded?: string;
}) {
	return (
		<section
			className={`${extraClass} text-white p-1.5 ${
				rounded !== undefined ? rounded : "rounded-[17px]"
			} border border-gray-700/80 mx-auto relative`}
		>
			{children}
		</section>
	);
}
