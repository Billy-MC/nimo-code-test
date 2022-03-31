import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import Layout from './layouts/Layout';
import './App.module.scss';

library.add(fas, far);

function App() {
	return (
		<div className='App'>
			<Layout />
		</div>
	);
}

export default App;
