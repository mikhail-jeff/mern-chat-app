// Helper function to pad single-digit numbers with a leading zero
const padZero = (number) => {
	return number.toString().padStart(2, "0");
};

export const extractTime = (dateString) => {
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const date = new Date(dateString);
	const dayName = days[date.getDay()];
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());

	return `${dayName} ${hours}:${minutes}`;
};
