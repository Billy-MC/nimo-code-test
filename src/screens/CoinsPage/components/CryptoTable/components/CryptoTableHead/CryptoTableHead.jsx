import { TableHead, TableRow, TableSortLabel, TableCell } from '@mui/material';

import tableHead from '../../../../../../constants/tableHead';

const CryptoTableHead = props => {
	const { order, orderBy, onRequestSort, setOrderBy } = props;

	const createSortHandler = property => event => {
		onRequestSort(event, property);
		setOrderBy(property);
	};

	return (
		<TableHead>
			<TableRow>
				{tableHead.map(headCell => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

export default CryptoTableHead;
