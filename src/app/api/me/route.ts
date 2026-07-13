// app/api/me/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get("token")?.value;

		if (!token) {
			return NextResponse.json(
				{ error: "Unauthorized: No token found" },
				{ status: 401 }
			);
		}

		const response = await fetch("https://api.chanchand.com/api/v1/me", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			cache: "no-store",
		});

		if (!response.ok) {
			const errorText = await response.text();
			let errorMessage = "Failed to fetch user profile";
			try {
				const errorJson = JSON.parse(errorText);
				errorMessage = errorJson.message || errorMessage;
			} catch {}
			return NextResponse.json(
				{ error: errorMessage },
				{ status: response.status }
			);
		}

		const data = await response.json();

		return NextResponse.json(data);
	} catch (error) {
		console.error("Error in GET /api/me:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
