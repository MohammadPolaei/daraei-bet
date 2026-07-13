import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ game: string }> }
) {
	const { game } = await params;
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

	try {
		const response = await fetch(
			`https://api.chanchand.com/api/v1/games/${game}/speculative-questions`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				cache: "no-store",
			}
		);

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json(
				{ error: data?.message || "Failed to fetch data from API" },
				{ status: response.status }
			);
		}

		return NextResponse.json(data);
	} catch {
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
