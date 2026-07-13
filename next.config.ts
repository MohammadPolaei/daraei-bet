import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	// فعال‌سازی فشرده‌سازی در سمت سرور
	compress: true,

	// بهینه‌سازی و مرتب‌سازی فایل‌های استاتیک
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},

	experimental: {
		// در صورت استفاده از CSS Modules، استایل‌های حیاتی مستقیماً درون HTML قرار می‌گیرند (Inline)
		optimizeCss: true,
	},
};

export default nextConfig;
