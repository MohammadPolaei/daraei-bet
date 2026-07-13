export default function Loading() {
	return (
		<div
			dir="rtl"
			className="min-h-screen w-full bg-[#121212] px-4 py-3 text-white"
		>
			{/* Header */}
			<header className="mb-3 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="h-9 w-9 rounded-full bg-neutral-800 animate-pulse" />
					<div className="h-4 w-20 rounded-full bg-neutral-800 animate-pulse" />
				</div>

				<div className="flex items-center gap-2">
					<div className="h-4 w-16 rounded-full bg-neutral-800 animate-pulse" />
					<div className="h-9 w-9 rounded-full bg-neutral-800 animate-pulse" />
				</div>
			</header>

			{/* Content */}
			<main className="mx-auto flex w-full max-w-md flex-col gap-3">
				{/* Main Match Card */}
				<section className="rounded-2xl bg-[#1a1a1a] p-4">
					{/* top badge */}
					<div className="mx-auto mb-4 h-7 w-24 rounded-full bg-[#8ca825]/30 animate-pulse" />

					{/* teams + time */}
					<div className="grid grid-cols-3 items-center gap-3">
						<div className="flex flex-col items-center gap-2">
							<div className="h-14 w-14 rounded-full bg-neutral-800 animate-pulse" />
							<div className="h-4 w-14 rounded-full bg-neutral-800 animate-pulse" />
						</div>

						<div className="flex flex-col items-center gap-2">
							<div className="h-6 w-20 rounded-full bg-neutral-800 animate-pulse" />
							<div className="h-4 w-12 rounded-full bg-neutral-800 animate-pulse" />
							<div className="h-4 w-14 rounded-full bg-neutral-800 animate-pulse" />
						</div>

						<div className="flex flex-col items-center gap-2">
							<div className="h-14 w-14 rounded-full bg-neutral-800 animate-pulse" />
							<div className="h-4 w-16 rounded-full bg-neutral-800 animate-pulse" />
						</div>
					</div>

					{/* prediction chips */}
					<div className="mt-4 grid grid-cols-3 gap-2">
						<div className="h-11 rounded-xl bg-neutral-800 animate-pulse" />
						<div className="h-11 rounded-xl bg-neutral-800 animate-pulse" />
						<div className="h-11 rounded-xl bg-neutral-800 animate-pulse" />
					</div>

					{/* controls */}
					<div className="mt-4 grid grid-cols-2 gap-3">
						<div className="flex items-center justify-center gap-3 rounded-xl bg-[#101010] px-3 py-3">
							<div className="h-8 w-8 rounded-full bg-neutral-800 animate-pulse" />
							<div className="h-4 w-4 rounded-full bg-neutral-800 animate-pulse" />
							<div className="h-8 w-8 rounded-full bg-neutral-800 animate-pulse" />
						</div>

						<div className="flex items-center justify-center gap-3 rounded-xl bg-[#101010] px-3 py-3">
							<div className="h-8 w-8 rounded-full bg-neutral-800 animate-pulse" />
							<div className="h-4 w-4 rounded-full bg-neutral-800 animate-pulse" />
							<div className="h-8 w-8 rounded-full bg-neutral-800 animate-pulse" />
						</div>
					</div>

					{/* multiplier bar */}
					<div className="mt-4 flex items-center justify-between rounded-xl bg-[#101010] px-4 py-3">
						<div className="h-4 w-32 rounded-full bg-neutral-800 animate-pulse" />
						<div className="flex items-center gap-2">
							<div className="h-7 w-7 rounded-full bg-neutral-800 animate-pulse" />
							<div className="h-4 w-6 rounded-full bg-neutral-800 animate-pulse" />
							<div className="h-7 w-7 rounded-full bg-neutral-800 animate-pulse" />
						</div>
					</div>

					{/* CTA */}
					<div className="mt-4 h-14 rounded-2xl bg-[#8ca825]/30 animate-pulse" />
				</section>

				{/* warning banner */}
				<div className="h-12 rounded-2xl bg-[#3a1f1f] animate-pulse" />

				{/* stats card */}
				<section className="rounded-2xl bg-[#1a1a1a] p-4">
					<div className="mb-4 flex items-center justify-between">
						<div className="h-4 w-24 rounded-full bg-neutral-800 animate-pulse" />
						<div className="h-4 w-20 rounded-full bg-neutral-800 animate-pulse" />
					</div>

					{/* progress bar */}
					<div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
						<div className="grid h-full grid-cols-3">
							<div className="bg-sky-500/40" />
							<div className="bg-yellow-500/40" />
							<div className="bg-pink-500/40" />
						</div>
					</div>

					{/* stats items */}
					<div className="mt-4 grid grid-cols-3 gap-2">
						{[0, 1, 2].map((item) => (
							<div key={item} className="flex flex-col items-center gap-2">
								<div className="h-5 w-10 rounded-full bg-neutral-800 animate-pulse" />
								<div className="h-4 w-14 rounded-full bg-neutral-800 animate-pulse" />
							</div>
						))}
					</div>
				</section>
			</main>

			{/* Floating button */}
			<div className="fixed bottom-5 left-4 h-12 w-12 rounded-full bg-[#1f1f1f] shadow-lg animate-pulse" />
		</div>
	);
}
