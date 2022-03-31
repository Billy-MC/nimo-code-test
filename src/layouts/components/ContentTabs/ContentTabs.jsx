import { useState } from 'react';
import { Tab, Box } from '@mui/material';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import CoinsPage from '../../../screens/CoinsPage';

const ContentTabs = () => {
	const [content, setContent] = useState('coins');

	const tabValues = [
		{
			table: 'portfolio',
			value: 'portfolio',
			content: 'portfolio',
		},
		{
			table: 'coins',
			value: 'coins',
			content: <CoinsPage />,
		},
		{
			table: 'Recently Added',
			value: 'recentlyAdded',
			content: 'Recently Added',
		},
		{
			table: 'Large Movers',
			value: 'largeMovers',
			content: 'Large Movers',
		},
		{
			table: 'Categories',
			value: 'categories',
			content: 'Categories',
		},
		{
			table: 'Custom Tabs',
			value: 'customTabs',
			content: 'Custom Tabs',
		},
	];

	const contentChangeHandler = (event, newContent) => {
		event.preventDefault();
		setContent(newContent);
	};
	return (
		<>
			<TabContext value={content} scrollButtons='auto'>
				<Box sx={{ borderColor: 'divider' }}>
					<TabList
						onChange={contentChangeHandler}
						aria-label='crypto Content Tabs'
						variant='scrollable'
						scrollButtons='auto'
					>
						{tabValues.map(tab => (
							<Tab
								sx={{ textTransform: 'capitalize' }}
								textColor='black'
								label={tab.table}
								value={tab.value}
								key={tab.value}
							/>
						))}
					</TabList>
				</Box>
				{tabValues.map(tab => (
					<TabPanel value={tab.value} key={tab.value}>
						{tab.content}
					</TabPanel>
				))}
			</TabContext>
		</>
	);
};

export default ContentTabs;
