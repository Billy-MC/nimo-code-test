import {
	convertCurrency,
	formattedPercent,
} from '../../../../../../utils/converter';
import styles from './ShowMoreSection.module.scss';

const ShowMoreSection = props => {
	const { globalStat } = props;
	const { totalValue, capPercent, activeCrypto } = globalStat;
	const formattedValue = ` $${convertCurrency(totalValue)}`;
	const formattedActiveCrypto = new Intl.NumberFormat().format(activeCrypto);
	return (
		<>
			<p className={styles['read-more']}>
				Total cryptocurrency trading volume in the last day is at
				{formattedValue}. Bitcoin dominance is at&nbsp;
				{formattedPercent(capPercent.btc, 1)}% and Ethereum dominance is
				at&nbsp;
				{formattedPercent(capPercent.eth, 1)}%. CoinGecko is now tracking
				{` ${formattedActiveCrypto}`} cryptocurrencies. Popular trends of the
				industry right now are&nbsp;
				<a href='https://www.coingecko.com/en/categories/decentralized-finance-defi'>
					DeFi
				</a>
				&nbsp;and&nbsp;
				<a href='https://www.coingecko.com/en/categories/gaming'>
					Play to Earn
				</a>
				.
			</p>
		</>
	);
};

export default ShowMoreSection;
