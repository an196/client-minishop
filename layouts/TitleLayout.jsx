import React from 'react';
import Head from 'next/head';

function TitleLayout({ children }) {
	return (
		<>
			<Head>
				<title>MiniShop</title>
			</Head>
			<main>{children}</main>
		</>
	);
}

export default TitleLayout;
