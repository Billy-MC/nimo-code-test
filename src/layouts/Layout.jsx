import { Container } from '@mui/material';
import ContentTabs from './components/ContentTabs';
import styles from './Layout.module.scss';
const Layout = () => {
	return (
		<Container className={styles.container}>
			<ContentTabs />
		</Container>
	);
};

export default Layout;
