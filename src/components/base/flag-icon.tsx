import type { HTMLAttributes } from "react";

type FlagIconProps = HTMLAttributes<HTMLSpanElement> & {
	code: string;
	size?: number;
};

export function FlagIcon({
	code,
	size = 24,
	className,
	style,
	...props
}: FlagIconProps) {
	const c = code.trim().toLowerCase();

	return (
		<span
			{...props}
			className={[
				"fi",
				`fi-${c}`,
				"fis", // حتما باید fis باشد تا نسبت ۱:۱ شود
				"inline-block rounded-full overflow-hidden",
				className,
			]
				.filter(Boolean)
				.join(" ")}
			style={{
				width: size,
				height: size,
				minWidth: size, // جلوگیری از فشرده شدن در Flexbox
				minHeight: size,
				...style,
			}}
		/>
	);
}
