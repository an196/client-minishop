import React from 'react';
import { Product, FooterBanner, HeroBanner, Layout } from '~/components';
import { useGetBannerQuery } from '~/features/banner/bannerApiSlice';
import { useGetProductsQuery } from '~/features/product/productApiSlice';
import { HeadTitile,OrtherCategory, RowItem } from '../components';


function Home() {
	const { data, isLoading, isSuccess, isError, error } = useGetBannerQuery();
	const { data: products } = useGetProductsQuery();

	let bannerData;
	if (isSuccess) {
		bannerData = [...data];
		console.log(products);
	}

	if (isError) {
		return <p>Error...</p>;
	}
	return (
		<>
			<HeroBanner heroBanner={bannerData?.length && bannerData[0]} />
			<RowItem title={'Beset selling products'} subtitle={'Speakers of many variations'} products={products}/>
			<RowItem title={'Beset selling earphone'} subtitle={'Speakers of many variations'} products={products}/>
			<RowItem title={'Beset selling headphone'} subtitle={'Speakers of many variations'} products={products}/>
			<div>
				<OrtherCategory/>
			</div>
			<FooterBanner footerBanner={bannerData?.length && bannerData[0]} />
		</>
	);
}

export const getServerSideProps = async () => {
	return {
		props: {},
	};
};

Home.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default Home;
