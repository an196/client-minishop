import '~/styles/globals.css';
import { StateContext } from '~/context/StateContext';
import { Provider } from 'react-redux';
import { store } from '~/app/store';

// Import css files
import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page)
	return (
		<StateContext>
			<Provider store={store}>
					{getLayout(<Component {...pageProps} />)}
			</Provider>
		</StateContext>
	);
}

export default MyApp;
