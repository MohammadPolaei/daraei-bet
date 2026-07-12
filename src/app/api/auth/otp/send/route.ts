// app/api/auth/otp/send/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		// ۱. پارس کردن امن بدنه درخواست
		const body = await request.json();
		const { mobile } = body;

		// ۲. اعتبارسنجی اولیه
		if (!mobile) {
			return NextResponse.json(
				{ success: false, message: "شماره موبایل الزامی است" },
				{ status: 400 }
			);
		}

		// ۳. درخواست به API خارجی
		const response = await fetch(
			"https://api.chanchand.com//api/v1/auth/otp/send",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ mobile }),
			}
		);

		// ۴. دریافت و پارس نتیجه
		const data = await response.json();

		// ۵. بازگشت نتیجه با وضعیت کد مناسب
		return NextResponse.json(data, { status: response.status });
	} catch (error) {
		console.error("OTP Send Error:", error);
		return NextResponse.json(
			{ success: false, message: "خطایی در ارتباط با سرور رخ داد" },
			{ status: 500 }
		);
	}
}
