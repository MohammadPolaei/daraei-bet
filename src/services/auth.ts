interface SendPhoneAuthParams {
	phoneNumber: string;
}

interface SendPhoneAuthResponse {
	success: boolean;
	message: string;
}

export const sendPhoneAuth = async (
	phoneNumber: string
): Promise<SendPhoneAuthResponse> => {
	const response = await fetch("/api/auth/otp/send", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			mobile: phoneNumber,
		}),
	});

	const data = (await response.json()) as SendPhoneAuthResponse;

	if (!response.ok) {
		throw new Error(data.message || "ارسال کد تأیید ناموفق بود");
	}

	return data;
};
