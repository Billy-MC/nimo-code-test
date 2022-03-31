import { memo } from 'react';
import { styled } from '@mui/material/styles';
import { Switch } from '@mui/material';

const StatSwitch = styled(props => {
	const { showStat, ...rest } = props;
	return (
		<Switch
			focusVisibleClassName='.Mui-focusVisible'
			disableRipple
			{...rest}
			checked={showStat}
		/>
	);
})(({ theme }) => ({
	width: 34,
	height: 18,
	padding: 0,
	'& .MuiSwitch-switchBase': {
		padding: 0,
		margin: 3,
		transitionDuration: '300ms',
		'&.Mui-checked': {
			transform: 'translateX(16px)',
			color: '#fff',
			'& + .MuiSwitch-track': {
				backgroundColor: '#7EB53F',
				opacity: 1,
				border: 2,
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: 0.5,
			},
		},
		'&.Mui-focusVisible .MuiSwitch-thumb': {
			color: '#7EB53F',
			border: '6px solid #fff',
		},
		'&.Mui-disabled .MuiSwitch-thumb': {
			color: theme.palette.grey[600],
		},
		'&.Mui-disabled + .MuiSwitch-track': {
			opacity: 0.7,
		},
	},
	'& .MuiSwitch-thumb': {
		boxSizing: 'border-box',
		width: 12,
		height: 12,
	},
	'& .MuiSwitch-track': {
		borderRadius: 26 / 2,
		backgroundColor: '#E9E9EA',
		opacity: 1,
		transition: theme.transitions.create(['background-color'], {
			duration: 500,
		}),
	},
}));

export default memo(StatSwitch);
