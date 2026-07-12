export function formatSmartFixed(value: number) {
	if (!Number.isFinite(value)) return "";
	const d = Math.abs(value) % 1 !== 0 ? 1 : 0;
	return value.toFixed(d);
}
