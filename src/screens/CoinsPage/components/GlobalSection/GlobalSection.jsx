import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StatSwitch from './components/StatSwitch';
import ShowMoreSection from './components/ShowMoreSection';
import ShowStateSection from './components/ShowStatSection';
import { convertCurrency, formattedPercent } from '../../../../utils/converter';
import { BASE_URL } from '../../../../constants/url';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import styles from './GlobalSection.module.scss';

const GlobalSection = props => {
	const { coinCountHandler } = props;
	const [showStat, setShowStat] = useState(false);
	const [showMore, setShowMore] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);
	const [globalData, setGlobalData] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${BASE_URL}/global`);
				const data = await response.data;
				setData(data.data);
			} catch (error) {
				throw new Error(error.message);
			}
			setIsLoading(false);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (!data) {
			return;
		}
		if (data !== [] && !isLoading) {
			const {
				active_cryptocurrencies,
				market_cap_change_percentage_24h_usd,
				market_cap_percentage,
				total_market_cap,
				total_volume,
			} = data;

			const globalData = {
				totalValue: total_volume.usd,
				totalCap: total_market_cap.usd,
				capPercent: market_cap_percentage,
				capIn24: +formattedPercent(market_cap_change_percentage_24h_usd, 1),
				activeCrypto: active_cryptocurrencies,
			};
			coinCountHandler(Math.round(globalData.activeCrypto / 100));
			setGlobalData(globalData);
		}
	}, [coinCountHandler, data, isLoading]);

	const formattedTotalCap = convertCurrency(globalData.totalCap);

	const onShowStatHandler = event => {
		event.preventDefault();
		setShowStat(preShowState => !preShowState);
	};

	const onShowMoreHandler = event => {
		event.preventDefault();
		setShowMore(preShowMore => !preShowMore);
	};

	return (
		<>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<Box>
					<Box className={styles['switch-section']}>
						<h1>Cryptocurrency Prices by Market Cap</h1>
						<StatSwitch
							className={styles['switch-section__switch']}
							showStat={showStat}
							onClick={onShowStatHandler}
						/>
						<span>Show Stats</span>
					</Box>
					<Box className={styles.description}>
						<p>
							The global cryptocurrency market cap today is ${formattedTotalCap}
							, a&nbsp;
							<span
								className={
									styles[`percent${+globalData.capIn24 >= 0 ? '' : '--warn'}`]
								}
							>
								{globalData.capIn24}%
								{globalData.capIn24 >= 0 ? (
									<FontAwesomeIcon icon='fa-solid fa-arrow-turn-up' />
								) : (
									<FontAwesomeIcon icon='fa-solid fa-arrow-turn-down' />
								)}
							</span>
							change in the last 24 hours.
						</p>
						<button
							className={styles['show-more-btn']}
							onClick={onShowMoreHandler}
						>
							{!showMore ? 'Read More' : 'Hide'}
						</button>
					</Box>
					{showMore && <ShowMoreSection globalStat={globalData} />}
					{showStat && <ShowStateSection globalStat={globalData} />}
				</Box>
			)}
		</>
	);
};

export default GlobalSection;
