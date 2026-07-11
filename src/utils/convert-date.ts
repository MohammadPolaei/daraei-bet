export const formatMatchTimeDate = (isoDate: string) => {
	const date = new Date(isoDate);

	const time = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
		timeZone: "Asia/Tehran",
	}).format(date);

	const dayMonth = new Intl.DateTimeFormat("fa-IR", {
		day: "numeric",
		month: "long",
		timeZone: "Asia/Tehran",
	}).format(date);

	return { time: time, date: dayMonth };
};
