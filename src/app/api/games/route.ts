import { NextRequest, NextResponse } from "next/server";

// تعریف ساختار داده (بر اساس نیازی که داری تغییرش بده)
interface GameResponse {
	success: boolean;
	data: any[]; // بهتر است بعدا اینترفیس دقیق بازی را جایگزین کنی
	message?: string;
}

export async function GET(request: NextRequest) {
	try {
		const response = await fetch("https://api.chanchand.com//api/v1/games", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				// اضافه کردن هدر برای جلوگیری از خطای Go Away
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36",
			},
			// جلوگیری از کش شدن بیش از حد در صورت نیاز به دیتای زنده
			cache: "no-store",
		});

		const data: GameResponse = await response.json();

		// بررسی وضعیت پاسخ API اصلی
		if (!response.ok || !data.success) {
			return NextResponse.json(
				{ message: data.message || "خطا در دریافت لیست بازی‌ها" },
				{ status: response.status || 400 }
			);
		}

		// بازگرداندن دیتای موفقیت‌آمیز
		return NextResponse.json(data);
	} catch (error: any) {
		console.error("Games List Error:", error);
		return NextResponse.json(
			{ message: "خطای داخلی سرور در برقراری ارتباط با API" },
			{ status: 500 }
		);
	}
}
