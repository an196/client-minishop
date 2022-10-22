import Head from 'next/head';
import { Navbar, Footer, SubNavbar } from '../components';
import { useStateContext } from '../context/StateContext';
import { ToastContainer } from 'react-toastify';

//lay out for main coponent can not corver entire page or hieght of main is small
function Layout({ children }) {
	const { navbarRef } = useStateContext();
	return (
		<div className='p-[10px] md:p-0'>
			<Head>
				<title>MiniShop</title>
			</Head>
			<div className='navbar-container sticky'  ref={navbarRef}>
				<Navbar/>
				<ToastContainer />
			</div>
			<SubNavbar />

			<main className='main-container'>
				{children}
			</main>
			<footer>
				<Footer isBottom={true}/>
			</footer>
		</div>
	);
}

export default Layout;
