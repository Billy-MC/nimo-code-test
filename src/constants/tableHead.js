const headCells = [
	{
		id: 'capRank',
		numeric: false,
		label: '#',
	},
	{
		id: 'coinName',
		numeric: false,
		label: 'Coin',
	},
	{
		id: 'price',
		numeric: true,
		label: 'Price',
	},
	{
		id: 'priceChange1h',
		numeric: true,
		label: '1h',
	},
	{
		id: 'priceChange24h',
		numeric: true,
		label: '24h',
	},
	{
		id: 'priceChange7d',
		numeric: true,
		label: '7d',
	},
	{
		id: 'totalValue',
		numeric: true,
		label: '24h Volume',
	},
	{
		id: 'marketCap',
		numeric: true,
		label: 'Mkt Cap',
	},
	{
		id: 'past7dTrend',
		numeric: true,
		label: 'Last 7 Days',
	},
];

export default headCells;
