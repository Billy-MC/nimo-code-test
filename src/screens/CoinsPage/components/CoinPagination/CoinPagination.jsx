import { Pagination, Stack } from '@mui/material';
import styles from './CoinPagination.module.scss';

const CoinPagination = props => {
	const { pageNum, setPageNum, coinCount } = props;

	const pageChangeHandler = (event, value) => {
		event.preventDefault();
		setPageNum(value);
	};
	return (
		<Stack spacing={2} className={styles.stack}>
			<Pagination
				className={styles.pagination}
				count={coinCount}
				page={pageNum}
				onChange={pageChangeHandler}
			/>
		</Stack>
	);
};

export default CoinPagination;
