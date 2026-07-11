import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { mobile, code } = body;

		const response = await fetch(
			"https://staging.api.worldcup.daraei.vip/api/v1/auth/otp/verify",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					// اضافه کردن هدرهای مرورگر برای دور زدن سیستم امنیتی
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
					Referer: "https://staging.api.worldcup.daraei.vip/",
					Origin: "https://staging.api.worldcup.daraei.vip/",
				},
				body: JSON.stringify({ mobile, code }),
			}
		);

		const responseText = await response.text();

		let data;
		try {
			data = JSON.parse(responseText);
		} catch (e) {
			return NextResponse.json(
				{ message: `خطا در ساختار پاسخ سرور: ${responseText}` },
				{ status: 502 }
			);
		}

		if (!response.ok) {
			return NextResponse.json(
				{ message: data.message || "کد وارد شده صحیح نیست" },
				{ status: response.status }
			);
		}

		const token = data?.data?.token;
		if (!token) {
			return NextResponse.json(
				{ message: "توکن در پاسخ یافت نشد" },
				{ status: 500 }
			);
		}

		// ۱. ایجاد پاسخ نهایی برای فرستادن به کلاینت (مرورگر)
		const res = NextResponse.json(data);

		// ۲. ست کردن کوکی روی همین متغیر res
		res.cookies.set({
			name: "token",
			value: token,
			httpOnly: true, // جلوگیری از دسترسی JS کلاینت به توکن
			secure: process.env.NODE_ENV === "production", // در لوکال هاست روی false و در سرور روی true قرار می‌گیرد
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60 * 24 * 7, // ۷ روز
		});

		// ۳. بازگرداندن پاسخ حاوی کوکی
		return res;
	} catch (error: any) {
		return NextResponse.json(
			{ message: "خطای داخلی سرور", error: error.message },
			{ status: 500 }
		);
	}
}
