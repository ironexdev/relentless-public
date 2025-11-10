export function formatNumber(num: number, precision: number = 1): string {
	const absNum = Math.abs(num);
	const sign = Math.sign(num);

	const units = [
		{ value: 1_000_000_000, symbol: 'B' },
		{ value: 1_000_000, symbol: 'M' },
		{ value: 1_000, symbol: 'K' }
	];

	for (let i = 0; i < units.length; i++) {
		if (absNum >= units[i]!.value) {
			const formatted = (absNum / units[i]!.value).toFixed(precision).replace(/\.0+$/, '');
			return (sign < 0 ? '-' : '') + formatted + units[i]!.symbol;
		}
	}

	return num.toString();
}
