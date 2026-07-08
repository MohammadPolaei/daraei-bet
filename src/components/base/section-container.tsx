import { ReactNode } from "react";

export default function SectionContainer({
	children,
	extraClass,
}: {
	children: ReactNode;
	extraClass?: string;
}) {
	return (
		<section
			className={`${extraClass} text-white p-1.5 rounded-[20px] border border-gray-700 mx-auto relative "`}
		>
			{children}
		</section>
	);
}
