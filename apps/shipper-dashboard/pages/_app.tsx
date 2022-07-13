import { AppProps } from 'next/app';
import Head from 'next/head';
import Favicon from '../components/Favicon';
import '../styles/globals.css';
import 'antd/dist/antd.css';
import 'react-big-calendar/lib/sass/styles.scss';
import moment from 'moment-timezone';
import Layout from '../layout/Layout';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Provider } from 'react-redux';
import store, { persistor } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import TabContextProvider from '../context/TabContext';

moment.tz.setDefault('Europe/London');
moment.updateLocale('en', {
	week: {
		dow: 1
	}
});
moment.locale('en');

function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Layout>
					<Head>
						<Favicon />
						<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
						<title>Shipper Dashboard</title>
					</Head>
					<MantineProvider
						withGlobalStyles
						withNormalizeCSS
						theme={{
							colorScheme: 'light'
						}}
					>
						<ModalsProvider>
							<TabContextProvider>
								<main className='app'>
									<Component {...pageProps} />
								</main>
							</TabContextProvider>
						</ModalsProvider>
					</MantineProvider>
				</Layout>
			</PersistGate>
		</Provider>
	);
}

export default App;
