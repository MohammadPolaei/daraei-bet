"use client";

import { usePrediction } from "@/context/active-prediction-context";
import Link from "next/link";
import { CSSProperties, HTMLAttributes } from "react";

// تعریف تایپ استایل‌ها برای رفع خطای TS
const styles: { [key: string]: CSSProperties } = {
	wrap: {
		background: "#050505",
		width: "100%",
		display: "flex",
		placeItems: "center",
		padding: "15px 0px 0px 0px",
		boxSizing: "border-box" as const, // استفاده از const برای فیکس کردن تایپ
		fontFamily: "IRANYekanX, system-ui, sans-serif",
	},
	card: {
		position: "relative",
		width: "100%",
		height: 75,
		borderRadius: 17,
		padding: "0 14px",
		boxSizing: "border-box" as const,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 16,
		/* ترکیب گرادینت‌ها برای رسیدن به رنگ دقیق تصویر */
		background:
			"radial-gradient(circle at 12% 50%, rgba(156, 226, 62, 0.15) 0%, transparent 35%), " +
			"radial-gradient(circle at 88% 50%, rgba(156, 226, 62, 0.12) 0%, transparent 35%), " +
			"linear-gradient(90deg, #1d290e 0%, #0c0f0a 40%, #0c0f0a 60%, #17240d 100%)",
		border: "1px solid rgba(156, 226, 62, 0.25)",
		boxShadow:
			"0 10px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(156, 226, 62, 0.05)",
		overflow: "hidden",
	},
	shine: {
		position: "absolute",
		inset: 0,
		pointerEvents: "none",
		background:
			"linear-gradient(112deg, transparent 0%, rgba(163,229,0,0.03) 40%, rgba(163,229,0,0.12) 50%, rgba(163,229,0,0.03) 60%, transparent 100%)",
	},
	leftBtn: {
		width: 35,
		height: 35,
		borderRadius: "50%",
		border: "1.5px solid rgba(156, 226, 62, 0.2)",
		background: "rgba(156, 226, 62, 0.14)",
		color: "#A7E52B",
		display: "grid",
		placeItems: "center",
		cursor: "pointer",
		flexShrink: 0,
		transition: "all 0.2s",
		textShadow: `
      0 0 4px rgba(167, 229, 43, 0.6), 
      0 0 12px rgba(167, 229, 43, 0.3)
    `,
		boxShadow:
			"0 0 18px rgba(156, 226, 62, 0.25), inset 0 0 10px rgba(156, 226, 62, 0.1)",
	},
	content: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		textAlign: "right",
		zIndex: 2,
	},
	badge: {
		padding: "2px 6px",
		borderRadius: 999,
		border: "1px solid rgba(156, 226, 62, 0.3)",
		background: "rgba(109, 165, 31, 0.25)",
		color: "#A7E52B",
		fontWeight: "700",
		fontSize: 8,
		textShadow: `
      0 0 4px rgba(167, 229, 43, 0.6), 
      0 0 12px rgba(167, 229, 43, 0.3)
    `,
		boxShadow:
			"0 0 15px rgba(156, 226, 62, 0.15), inset 0 0 10px rgba(156, 226, 62, 0.1)",
	},

	title: {
		color: "#FFFFFF",
		fontWeight: "700",
		fontSize: 10,
		margin: 0,
		letterSpacing: "1px",
	},
	subtitle: {
		color: "rgba(232,234,239,0.5)",
		fontWeight: "400",
		fontSize: 9,
		marginTop: 4,
	},
	rightIconOuter: {
		width: 35,
		height: 35,
		borderRadius: "50%",
		border: "1.5px solid rgba(156, 226, 62, 0.35)",
		display: "grid",
		placeItems: "center",
		boxShadow: "0 0 0 8px rgba(156, 226, 62, 0.04)",
		color: "#A7E52B",
		flexShrink: 0,
		zIndex: 2,
	},
};

export default function MatchDistributionBar({
	...props
}: HTMLAttributes<HTMLDivElement>) {
	const { activePrediction } = usePrediction();
	return (
		<div
			dir="rtl"
			style={styles.wrap}
			className="active:scale-95 transition-all duration-300 ease-in-out group cursor-pointer"
			{...props}
		>
			<Link href={activePrediction ? "#first_q" : ""} className="w-full">
				<div style={styles.card}>
					<div style={styles.shine} />

					{/* آیکن سمت راست */}

					<div style={styles.rightIconOuter}>
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.8 8.38 8.38 0 0 1 3.8.9L21 3.5v8z" />
							<path d="M11 12h.01M16 12h.01M7 12h.01" strokeWidth="2" />
						</svg>
					</div>

					{/* محتوای متنی وسط */}

					<div style={styles.content}>
						<div className="w-full flex justify-start items-center gap-2 relative">
							<h3 style={styles.title}>پیش‌بینی اتفاقات بازی</h3>
							<div style={styles.badge}>تا ۱۱۶,۰۰۰ امتیاز</div>
						</div>
						<p style={styles.subtitle}>۶ سوال بدون پاسخ</p>
					</div>

					{/* دکمه فلش سمت چپ */}

					<button
						type="button"
						style={styles.leftBtn}
						className={`${
							activePrediction ? "rotate-180" : "rotate-0"
						} transition-all duration-300 ease-in-out group-active:scale-120 origin-center`}
					>
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M18 15l-6-6-6 6" />
						</svg>
					</button>
				</div>
			</Link>
		</div>
	);
}
