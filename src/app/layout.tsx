import localFont from "next/font/local";
import "./globals.css";

// تعریف فونت ایران‌یکان با تمام وزن‌ها
const iranYekanX = localFont({
	src: [
		{
			path: "../../public/fonts/IRANYekanX-Thin.woff2",
			weight: "100",
			style: "normal",
		},
		{
			path: "../../public/fonts/IRANYekanX-Light.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "../../public/fonts/IRANYekanX-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/IRANYekanX-Medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../../public/fonts/IRANYekanX-DemiBold.woff2",
			weight: "600",
			style: "normal",
		},
		{
			path: "../../public/fonts/IRANYekanX-Bold.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "../../public/fonts/IRANYekanX-ExtraBold.woff2",
			weight: "800",
			style: "normal",
		},
		{
			path: "../../public/fonts/IRANYekanX-Black.woff2",
			weight: "900",
			style: "normal",
		},
		{
			path: "../../public/fonts/IRANYekanX-ExtraBlack.woff2",
			weight: "950",
			style: "normal",
		},
	],
	variable: "--font-iran-yekan",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fa" dir="rtl" className={iranYekanX.variable}>
			<body
				style={{
					fontFamily: "var(--font-iran-yekan), sans-serif",
					fontFeatureSettings: '"ss02"',
					WebkitFontFeatureSettings: '"ss02"',
				}}
				className="min-h-screen bg-black antialiased"
			>
				{children}
			</body>
		</html>
	);
}
