import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import moment from 'moment-timezone';
import Layout from '../layout/Layout';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Provider } from 'react-redux';
import { store } from '../store'

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css';
import Favicon from '../components/Favicon'
//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: 'light'
				}}
			>
				<ModalsProvider>
					<Layout>
						<Head>
							<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
							<Favicon/>
							<title>Carrier Dashboard</title>
						</Head>
						<main className='app'>
							<Component {...pageProps} />
						</main>
					</Layout>
				</ModalsProvider>
			</MantineProvider>
		</Provider>
	);
}

export default App;
