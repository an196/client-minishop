import React from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';

function TitleLayout({ children }) {
	return (
		<>
			<Head>
				<title>MiniShop</title>
			</Head>
			<ToastContainer />
			<main>{children}</main>
		</>
	);
}

export default TitleLayout;
