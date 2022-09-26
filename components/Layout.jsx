import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import SubNavbar from './SubNavbar';

function Layout({ children }) {
	return (
		<div className='p-[10px] md:p-0'>
			<Head>
				<title></title>
			</Head>
				<div className='sticky top-0 !z-10000 bg-white '>
					<Navbar />
				</div>
			<SubNavbar/>
			<main className='m-auto w-full max-w-[1400px]'>{children}</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
}

export default Layout;
