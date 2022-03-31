import { useState } from 'react';
import GlobalSection from './components/GlobalSection';
import CryptoTable from './components/CryptoTable';
import CoinPagination from './components/CoinPagination';

const CoinsPage = () => {
	const [pageNum, setPageNum] = useState(1);
	const [coinCount, setCoinCount] = useState(0);

	return (
		<>
			<GlobalSection coinCountHandler={setCoinCount} />
			<CryptoTable pageNum={pageNum} />
			<CoinPagination coinCount={coinCount} setPageNum={setPageNum} />
		</>
	);
};

export default CoinsPage;
