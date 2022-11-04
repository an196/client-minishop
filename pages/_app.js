import '../styles/globals.css';
import { StateContext } from '../context/StateContext';
import { Provider } from 'react-redux';
import { store, persistor } from '../app/store';

import { PersistGate } from 'redux-persist/integration/react';

// Import css files
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page);
	return (
		<StateContext>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					{getLayout(<Component {...pageProps} />)}
				</PersistGate>
			</Provider>
		</StateContext>
	);
}

export default MyApp;
