import { NextRequest, NextResponse } from "next/server";
type RouteParams = {
	params: Promise<{
		game: string;
	}>;
};
export async function GET(request: NextRequest, { params }: RouteParams) {
	const token = request.cookies.get("token")?.value;
	try {
		const { game } = await params;
		const response = await fetch(
			`https://staging.api.worldcup.daraei.vip/api/v1/games/${game}/prediction-stats`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/json",
					"Content-Type": "application/json",
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36",
				},
				cache: "no-store",
			}
		);
		if (!game) {
			return NextResponse.json(
				{ message: "شناسه بازی الزامی است" },
				{ status: 400 }
			);
		}
		const responseText = await response.text();

		let data;
		try {
			data = JSON.parse(responseText);
		} catch {
			return NextResponse.json(
				{ message: "پاسخ سرور اصلی معتبر نیست" },
				{ status: 502 }
			);
		}

		if (!response.ok || !data.success) {
			return NextResponse.json(
				{ message: data.message || "خطا در دریافت اطلاعات بازی" },
				{ status: response.status || 400 }
			);
		}

		return NextResponse.json(data, { status: 200 });
	} catch (error) {}
}
