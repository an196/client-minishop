import '../styles/globals.css';
import { StateContext } from '../context/StateContext';
import { Provider } from 'react-redux';
import { store, persistor } from '../app/store';
import { toast, ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

// Import css files
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page);
	return (
		<StateContext>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<ToastContainer />
					{/* {Component.auth ? (
					<requiredAuth>{getLayout(<Component {...pageProps} />)}</requiredAuth>
				) : (
					getLayout(<Component {...pageProps} />)
				)} */}
					{getLayout(<Component {...pageProps} />)}
				</PersistGate>
			</Provider>
		</StateContext>
	);
}

export default MyApp;
