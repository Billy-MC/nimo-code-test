import { Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	formattedCurrency,
	formattedPercent,
} from '../../../../../../utils/converter';
import styles from './ShowStateSection.module.scss';

const ShowStateSection = props => {
	const { globalStat } = props;
	const { totalValue, totalCap, capPercent, capIn24, activeCrypto } =
		globalStat;

	return (
		<Box className={styles['show-state']}>
			<div className={styles[`show-state__item${capIn24 > 0 ? '' : '--warn'}`]}>
				<div className={styles['total-cap']}>
					<h3>{`${formattedCurrency(totalCap)}`}</h3>
					<div
						className={
							styles[`total-cap__percent${capIn24 > 0 ? '' : '--warn'}`]
						}
					>
						<h3>{capIn24}%</h3>
						{capIn24 >= 0 ? (
							<FontAwesomeIcon icon='fa-solid fa-arrow-turn-up' />
						) : (
							<FontAwesomeIcon icon='fa-solid fa-arrow-turn-down' />
						)}
					</div>
				</div>
				<h4>Market Capitalization</h4>
			</div>
			<div className={styles['show-state__item']}>
				<h3>{formattedCurrency(totalValue)}</h3>
				<h4>24h Trading Volume</h4>
			</div>
			<div className={styles['show-state__item--grey']}>
				<h3>{+formattedPercent(capPercent.btc, 2)}%</h3>
				<h4>Bitcoin Market Cap Dominance</h4>
			</div>
			<div className={styles['show-state__item--grey']}>
				<h3>{activeCrypto}</h3>
				<h4># of Coins</h4>
			</div>
		</Box>
	);
};

export default ShowStateSection;
