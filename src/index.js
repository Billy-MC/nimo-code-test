import React from 'react';
import ReactDOM from 'react-dom';
import { StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.module.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = createTheme({
	palette: {
		primary: {
			main: '#8dc547',
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</StyledEngineProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
