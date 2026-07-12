// submit question

import { SubmitOptionPredictionPayload } from "@/types/submit-answer-type";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const token = (await cookies()).get("token")?.value;

		if (!token) {
			return NextResponse.json(
				{
					success: false,
					message: "Unauthorized",
				},
				{ status: 401 }
			);
		}

		const body: SubmitOptionPredictionPayload = await req.json();

		if (!body?.game_id || !Array.isArray(body?.answers)) {
			return NextResponse.json(
				{
					success: false,
					message: "Invalid payload",
				},
				{ status: 400 }
			);
		}

		const response = await fetch(
			`https://api.chanchand.com/api/v1/speculative-questions/submit`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(body),
				cache: "no-store",
			}
		);

		const data = await response.json();

		return NextResponse.json(data, { status: response.status });
	} catch (error) {
		console.error("Submit option prediction error:", error);

		return NextResponse.json(
			{
				success: false,
				message: "Internal server error",
			},
			{ status: 500 }
		);
	}
}
