import '~/styles/globals.css';
import { StateContext } from '~/context/StateContext';
import { Provider } from 'react-redux';
import { store } from '~/app/store';
import RequiredAuth  from '~/features/auth/RequiredAuth';
import { toast, ToastContainer } from 'react-toastify';
// Import css files
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page);
	return (
		<StateContext>
			<Provider store={store}>
				<ToastContainer/>
				{/* {Component.auth ? (
					<RequiredAuth>{getLayout(<Component {...pageProps} />)}</RequiredAuth>
				) : (
					getLayout(<Component {...pageProps} />)
				)} */}
				{getLayout(<Component {...pageProps} />)}
			</Provider>
		</StateContext>
	);
}

export default MyApp;
