"use client";

import SectionContainer from "@/components/base/section-container";
import { sendPhoneAuth, verifyOTP } from "@/services/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Verify() {
	const [code, setCode] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [phoneNumber, setPhoneNumber] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		const number = localStorage.getItem("phoneNumber") ?? "";

		setPhoneNumber(number);
		e.preventDefault(); // جلوگیری از ریلود شدن صفحه
		if (!number) {
			setErrorMsg("شماره موبایل پیدا نشد");
			return;
		}
		if (!code.trim()) {
			setErrorMsg("لطفاً کد ارسال شده خود را وارد کنید");
			return;
		}

		setIsLoading(true);
		setErrorMsg(null);

		try {
			// ارسال مستقیم شماره تلفن به سرویس
			const result = await verifyOTP({ mobile: phoneNumber!, code: code });
			if (result.success == true) {
				router.push("/");
			}
			console.log("OTP verified Successfully:", result);

			// در این مرحله می‌توانید کاربر را به صفحه وارد کردن کد OTP هدایت کنید
			// router.push(`/auth/verify?phone=${phoneNum}`);
		} catch (err: any) {
			setErrorMsg(err.message || "خطایی رخ داده است. مجدداً تلاش کنید.");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full h-[95vh] p-3 flex flex-col justify-center items-center">
			<SectionContainer extraClass="py-10 w-4/5">
				<div className="w-full h-full flex flex-col justify-start items-center gap-5">
					<form
						onSubmit={handleSubmit}
						className="w-full flex flex-col justify-start items-center gap-5"
					>
						<div className="w-full flex flex-col gap-2">
							<label
								className="text-right w-full text-[12px] text-(--text-muted)"
								htmlFor="phone-input"
							>
								کد تایید شما
							</label>
							<input
								id="phone-input"
								dir="ltr"
								type="tel"
								value={code}
								onChange={(e) => setCode(e.target.value)}
								className="w-full border border-(--primary)/60 rounded-[9px] text-left px-3 py-2 bg-(--primary)/10 outline-none focus:border-(--primary)"
								placeholder="xxxx"
								disabled={isLoading}
							/>
						</div>

						{errorMsg && (
							<p className="text-red-500 text-xs text-right w-full">
								{errorMsg}
							</p>
						)}
						<button
							aria-label="ارسال مجدد"
							className="text-[10px]"
							onClick={() => sendPhoneAuth(String(phoneNumber))}
						>
							ارسال مجدد کد
						</button>
						<button
							aria-label="ارسال کد"
							type="submit"
							disabled={isLoading}
							className="bg-(--primary) py-3 text-black text-[16px] font-semibold w-full rounded-[14px] disabled:opacity-50 transition-opacity"
						>
							{isLoading ? "در حال ارسال..." : "ارسال کد"}
						</button>
					</form>
				</div>
			</SectionContainer>
		</div>
	);
}
