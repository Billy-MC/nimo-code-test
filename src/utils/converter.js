const convertCurrency = currencyValue => {
	if (currencyValue === null) return '?';
	const formattedCur = Math.abs(+currencyValue);
	return formattedCur >= 1.0e12
		? (formattedCur / 1.0e12).toFixed(2) + ' Trillion'
		: formattedCur >= 1.0e9
		? (formattedCur / 1.0e9).toFixed(2) + ' Billion'
		: formattedCur >= 1.0e6
		? (formattedCur / 1.0e6).toFixed(2) + ' Million'
		: formattedCur >= 1.0e3
		? (formattedCur / 1.0e3).toFixed(2) + ' Thousand'
		: formattedCur;
};

const formattedCurrency = (value, decimal = 0) => {
	if (value === null) return '?';
	return new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: 'USD',
		locale: 'en-US',
		maximumFractionDigits: decimal,
		minimumFractionDigits: decimal,
	}).format(value);
};

const formattedPercent = (percent, decimal = 1) => {
	if (percent === null) return '?';
	return `${percent.toFixed(decimal)}`;
};

export { convertCurrency, formattedCurrency, formattedPercent };
