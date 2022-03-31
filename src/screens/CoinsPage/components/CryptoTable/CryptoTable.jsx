import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import {
	TableRow,
	TableContainer,
	Table,
	TableBody,
	TableCell,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	formattedCurrency,
	formattedPercent,
} from '../../../../utils/converter';
import { BASE_URL } from '../../../../constants/url';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import CryptoTableHead from './components/CryptoTableHead';
import styles from './CryptoTable.module.scss';

const percentColor = value => {
	return `percent${value === null ? '--grey' : value > 0 ? '' : '--warn'}`;
};
const percentSymbol = value => {
	return value === null ? '' : '%';
};

const stableSort = (arr, comparator) => {
	const stabilizedColumn = arr.map(el => [el]);
	stabilizedColumn.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[0] - b[0];
	});
	return stabilizedColumn.map(el => el[0]);
};

const comparator = (a, b, orderBy) => {
	return b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0;
};

const getComparator = (order, orderBy) => {
	return order === 'desc'
		? (a, b) => comparator(a, b, orderBy)
		: (a, b) => -comparator(a, b, orderBy);
};

const CryptoTable = props => {
	const { pageNum } = props;
	const [data, setData] = useState([]);
	const [renderData, setRenderData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('');

	const sortOrderHandler = (event, property) => {
		event.preventDefault();
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
	};

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${BASE_URL}/coins/markets?vs_currency=usd&sparkline=true&per_page=100&page=${pageNum}&price_change_percentage=1h%2C24h%2C7d`
				);
				const data = await response.data;
				setData(data);
			} catch (error) {
				throw new Error(error.message);
			}
			setIsLoading(false);
		};
		fetchData();
	}, [pageNum]);

	useEffect(() => {
		if (!data) {
			return;
		}
		if (data !== [] && !isLoading) {
			const renderData = data.map(d => {
				return {
					id: d.id,
					capRank: d.market_cap_rank,
					img: d.image,
					coinName: d.name,
					symbol: d.symbol.toUpperCase(),
					price: d.current_price,
					priceChange1h: d.price_change_percentage_1h_in_currency,
					priceChange24h: d.price_change_percentage_24h_in_currency,
					priceChange7d: d.price_change_percentage_7d_in_currency,
					totalValue: d.total_volume,
					marketCap: d.market_cap,
					past7d: d.sparkline_in_7d.price,
					past7dTrend:
						d.sparkline_in_7d.price.at(-1) - d.sparkline_in_7d.price[0],
				};
			});
			setRenderData(renderData);
		}
	}, [data, isLoading]);
	return (
		<>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<TableContainer>
					<Table>
						<CryptoTableHead
							order={order}
							orderBy={orderBy}
							setOrderBy={setOrderBy}
							onRequestSort={sortOrderHandler}
						/>
						<TableBody>
							{stableSort(renderData, getComparator(order, orderBy)).map(
								data => {
									return (
										<TableRow
											hover
											className={styles['table-row']}
											key={data.id}
										>
											<TableCell className={styles.rank} align='left'>
												<FontAwesomeIcon icon='fa-regular fa-star' />
												<span>{data.capRank}</span>
											</TableCell>
											<TableCell align='left' className={styles['name-cell']}>
												<div className={styles['name-cell__box']}>
													<div className={styles['name-cell__name-icon']}>
														<img
															className={styles.icon}
															src={data.img}
															alt='coinImg'
														/>
														<a
															href={`https://www.coingecko.com/en/coins/${data.id}`}
														>
															<span>{data.coinName}</span>
														</a>
													</div>
													<span className={styles.symbol}>{data.symbol}</span>
												</div>
											</TableCell>
											<TableCell align='right' className={styles.price}>
												{formattedCurrency(data.price, 2)}
											</TableCell>
											<TableCell
												align='right'
												className={
													styles[`${percentColor(data.priceChange1h)}`]
												}
											>
												<span>
													{formattedPercent(data.priceChange1h)}
													{percentSymbol(data.priceChange1h)}
												</span>
											</TableCell>
											<TableCell
												align='right'
												className={
													styles[`${percentColor(data.priceChange24h)}`]
												}
											>
												<span>
													{formattedPercent(data.priceChange24h)}
													{percentSymbol(data.priceChange24h)}
												</span>
											</TableCell>
											<TableCell
												align='right'
												className={
													styles[`${percentColor(data.priceChange7d)}`]
												}
											>
												<span>
													{formattedPercent(data.priceChange7d)}
													{percentSymbol(data.priceChange7d)}
												</span>
											</TableCell>
											<TableCell align='right'>
												{formattedCurrency(data.totalValue)}
											</TableCell>
											<TableCell align='right'>
												{formattedCurrency(data.marketCap)}
											</TableCell>
											<TableCell align='right'>
												<a
													href={`https://www.coingecko.com/en/coins/${data.id}/usd?chart=7_days#panel`}
												>
													<Sparklines
														data={data.past7d}
														svgWidth={150}
														width={200}
														height={80}
														id={data.past7dTrend}
													>
														<SparklinesLine
															color={data.past7dTrend > 0 ? 'green' : 'red'}
														/>
													</Sparklines>
												</a>
											</TableCell>
										</TableRow>
									);
								}
							)}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</>
	);
};

export default CryptoTable;
