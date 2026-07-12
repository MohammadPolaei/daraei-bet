"use client";

import { CSSProperties, FC, useMemo } from "react";

interface PredictionOutcomeItem {
	count: number;
	percentage: number;
}

interface GamePredictionData {
	game_id: string;
	predictions_count: number;
	outcomes: {
		team1_win: PredictionOutcomeItem;
		draw: PredictionOutcomeItem;
		team2_win: PredictionOutcomeItem;
		penalty: PredictionOutcomeItem;
	};
}

export interface ProgressSegment {
	label: string;
	percentage: number;
	color: string;
}

interface MultiSegmentProgressBarProps {
	data: GamePredictionData | undefined;
	teamA: string;
	teamB: string;
	title?: string;
}

const toPersianNumber = (value: number | string): string => {
	return new Intl.NumberFormat("fa-IR").format(Number(value));
};

const toPersianPercentage = (num: number): string => {
	const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
	return num
		.toFixed(1)
		.replace(".", "/")
		.replace(/\d/g, (x) => persianDigits[parseInt(x, 10)]);
};

export const MultiSegmentProgressBar: FC<MultiSegmentProgressBarProps> = ({
	data,
	teamA,
	teamB,
	title = "نظر کاربران",
}) => {
	const segments = useMemo<
		[ProgressSegment, ProgressSegment, ProgressSegment]
	>(() => {
		return [
			{
				label: teamA,
				percentage: data ? data.outcomes.team1_win.percentage : 0,
				color: "#2a398d",
			},
			{
				label: "پنالتی",
				percentage: data ? data.outcomes.penalty.percentage : 0,
				color: "#f59e0b",
			},
			{
				label: teamB,
				percentage: data ? data.outcomes.team2_win.percentage : 0,
				color: "#ec0b58",
			},
		];
	}, [data]);

	const totalPercentage = useMemo(() => {
		return segments.reduce((sum, segment) => sum + segment.percentage, 0);
	}, [segments]);

	const maxLabel = useMemo(() => {
		return segments.reduce((max, item) =>
			item.percentage > max.percentage ? item : max
		).label;
	}, [segments]);

	const totalPredictions = `${toPersianNumber(
		data ? data.predictions_count : ""
	)} پیش‌بینی`;

	return (
		<div style={styles.cardContainer}>
			<div style={styles.headerRow}>
				<span style={styles.titleText}>{title}</span>
				<span style={styles.predictionsText}>{totalPredictions}</span>
			</div>

			<div style={styles.progressBarWrapper}>
				{segments.map((segment, index) => {
					if (segment.percentage <= 0) return null;

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

			<div style={styles.labelsWrapper}>
				{segments.map((segment, index) => {
					return (
						<div key={`label-${index}`} style={styles.labelColumn}>
							<span
								style={{
									...styles.percentageText,
									color:
										segment.label === maxLabel
											? segment.color
											: "var(--text-main)",
								}}
							>
								{toPersianPercentage(segment.percentage)}٪
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

const styles: Record<string, CSSProperties> = {
	cardContainer: {
		direction: "rtl",
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
		flexDirection: "row",
		height: "5px",
		width: "100%",
		backgroundColor: "#1c1c1e",
		borderRadius: "9999px",
		overflow: "hidden",
		marginBottom: "5px",
	},
	progressSegment: {
		height: "100%",
		transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
	},
	labelsWrapper: {
		display: "flex",
		flexDirection: "row",
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
		fontSize: "10px",
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
