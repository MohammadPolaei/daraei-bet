"use client";

type ErrorProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
	return (
		<div
			dir="rtl"
			className="flex min-h-screen w-full items-center justify-center bg-[#121212] px-4 text-white"
		>
			<div className="w-full max-w-md rounded-2xl bg-[#1a1a1a] p-6 text-center shadow-lg">
				<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15 text-red-400">
					<span className="text-2xl">!</span>
				</div>

				<h2 className="mb-2 text-lg font-bold">مشکلی پیش اومد</h2>

				<p className="mb-6 text-sm leading-6 text-white/70">
					بارگذاری این صفحه با خطا مواجه شد. لطفاً دوباره تلاش کنید.
				</p>

				<div className="flex gap-3">
					<button
						aria-label="تلاش دوباره"
						type="button"
						onClick={() => reset()}
						className="flex-1 rounded-2xl bg-[#8ca825] px-4 py-3 text-sm font-medium text-black transition hover:opacity-90"
					>
						تلاش دوباره
					</button>

					<button
						aria-label="بازگشت به صفحه قبل"
						type="button"
						onClick={() => window.history.back()}
						className="flex-1 rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/15"
					>
						بازگشت
					</button>
				</div>
			</div>
		</div>
	);
}
