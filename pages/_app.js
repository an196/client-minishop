import { Toaster } from 'react-hot-toast';
import '~/styles/globals.css';
import { LayoutHome } from '~/components';
import { StateContext } from '~/context/StateContext';
import { Provider } from 'react-redux';
import { store } from '~/app/store';



function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page)
	return (
		<StateContext>
			<Provider store={store}>
					<Toaster />
					{getLayout(<Component {...pageProps} />)}
			</Provider>
		</StateContext>
	);
}

export default MyApp;
