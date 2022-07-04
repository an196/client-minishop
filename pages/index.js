import React from 'react';
import { client } from '~/lib/client';
import { Product, FooterBanner, HeroBanner, Layout } from '~/components';
import { useGetBannerQuery } from '~/features/banner/bannerApiSlice';

function Home({ products }) {
	const { data , isLoading, isSuccess, isError, error } = useGetBannerQuery();
  let bannerData;
  if(isSuccess){
    bannerData = [...data];
	
  }

  if(isError){
    return <p>Error...</p>
  }
	return (
		<>
			<HeroBanner heroBanner={bannerData?.length && bannerData[0]} />
			<div className='products-heading'>
				<h2>Beset selling products</h2>
				<p>Speakers of many variations</p>
			</div>
			<div className='products-container'>
				{products.map((product) => (
					<Product key={product._id} product={product} />
				))}
			</div>
			<FooterBanner footerBanner={bannerData?.length && bannerData[0]} />
		</>
	);
}

export const getServerSideProps = async () => {
	const query = '*[_type == "product"]';
	const products = await client.fetch(query);

	// const bannerQuery = '*[_type =="banner"]';
	// const bannerData = await client.fetch(bannerQuery);

	return {
		props: {
			products,
		},
	};
};

Home.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default Home;
