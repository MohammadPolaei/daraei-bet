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
			className={`${extraClass} text-white p-1.5 rounded-2xl border border-gray-600 mx-auto relative shadow-2xl">`}
		>
			{children}
		</section>
	);
}
