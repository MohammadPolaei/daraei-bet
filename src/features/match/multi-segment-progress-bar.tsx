"use client";

import { CSSProperties, FC, useMemo } from "react";

// تعریف ساختار مشخصات هر بخش (سگمنت)
export interface ProgressSegment {
	label: string;
	percentage: number;
	color: string;
}

// تعریف پراپ‌های ورودی کامپوننت
interface MultiSegmentProgressBarProps {
	segments: [ProgressSegment, ProgressSegment, ProgressSegment]; // دقیقاً ۳ سگمنت دریافت می‌کند
	totalPredictions?: string; // تعداد پیش‌بینی‌ها (مثلاً "۹۶۵ پیش‌بینی")
	title?: string; // عنوان کامپوننت (مثلاً "نظر کاربران")
}

/**
 * تابع کمکی برای تبدیل اعداد انگلیسی به فارسی به همراه ممیز فارسی (شبیه به طرح تصویر)
 */

const toPersianNumbers = (num: number): string => {
	const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
	return num
		.toFixed(1) // یک رقم اعشار
		.replace(".", "/") // تبدیل نقطه اعشار به اسلش مطابق تصویر
		.replace(/\d/g, (x) => persianDigits[parseInt(x)]);
};

export const MultiSegmentProgressBar: FC<MultiSegmentProgressBarProps> = ({
	segments,
	totalPredictions = "۹۶۵ پیش‌بینی",
	title = "نظر کاربران",
}) => {
	// محاسبه مجموع کل درصدها برای مقیاس‌دهی دقیق (در صورتی که مجموع دقیقاً ۱۰۰ نباشد)
	const totalPercentage = useMemo(() => {
		return segments.reduce((sum, segment) => sum + segment.percentage, 0);
	}, [segments]);

	const maxLabel = useMemo(() => {
		return segments.reduce((max, item) =>
			item.percentage > max.percentage ? item : max
		).label;
	}, [segments]);

	return (
		<div style={styles.cardContainer}>
			{/* هدر بالایی کارت شامل عنوان و تعداد پیش‌بینی‌ها */}
			<div style={styles.headerRow}>
				<span style={styles.titleText}>{title}</span>
				<span style={styles.predictionsText}>{totalPredictions}</span>
			</div>

			{/* نوار چندبخشی اصلی */}
			<div style={styles.progressBarWrapper}>
				{segments.map((segment, index) => {
					if (segment.percentage <= 0) return null;

					// محاسبه سهم عرض هر بخش بر اساس درصد واقعی
					const segmentWidth =
						(segment.percentage / (totalPercentage || 100)) * 100;

					return (
						<div
							key={`bar-${index}`}
							style={{
								...styles.progressSegment,
								width: `${segmentWidth}%`,
								backgroundColor: segment.color,
							}}
						/>
					);
				})}
			</div>

			{/* بخش پایینی شامل درصدها و نام‌ها */}
			<div style={styles.labelsWrapper}>
				{segments.map((segment, index) => {
					const color = segment.color;

					return (
						<div key={`label-${index}`} style={styles.labelColumn}>
							<span
								style={{
									...styles.percentageText,
									color:
										segment.label == maxLabel
											? segment.color
											: "text-(--text-main)",
								}}
							>
								{toPersianNumbers(segment.percentage)}٪
							</span>
							<span
								className="transition-colors duration-300"
								style={styles.labelText}
							>
								{segment.label}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

// استایل‌های بهینه و امن با Inline-Styles برای عدم وابستگی به کتابخانه‌های خارجی
const styles: Record<string, CSSProperties> = {
	cardContainer: {
		direction: "rtl", // جهت کلی متن فارسی راست به چپ
	},
	headerRow: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: "10px",
	},
	titleText: {
		color: "#8e8e93",
		fontSize: "10px",
		fontWeight: 500,
	},
	predictionsText: {
		color: "#8e8e93",
		fontSize: "10px",
		fontWeight: 500,
	},
	progressBarWrapper: {
		display: "flex",
		flexDirection: "row", // چیدمان چپ به راست سگمنت‌ها (مراکش، پنالتی، فرانسه)
		height: "5px",
		width: "100%",
		backgroundColor: "#1c1c1e",
		borderRadius: "9999px",
		overflow: "hidden", // برای گرد ماندن گوشه‌های سگمنت‌های ابتدا و انتها
		marginBottom: "5px",
	},
	progressSegment: {
		height: "100%",
		transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)", // انیمیشن لود شدن نرم
	},
	labelsWrapper: {
		display: "flex",
		flexDirection: "row", // هم‌راستا با سگمنت‌های بالا از چپ به راست
		justifyContent: "space-between",
		alignItems: "center",
	},
	labelColumn: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		flex: 1,
		textAlign: "center",
	},
	percentageText: {
		fontSize: "14px",
		fontWeight: "bold",
		marginBottom: "2px",
		letterSpacing: "-0.5px",
	},
	labelText: {
		fontSize: "10px",
		fontWeight: 500,
		color: "#9c9b9a",
	},
};
