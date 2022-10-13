import React from 'react';
import { FooterBanner, HeroBanner, OrtherCategory, RowItem } from '~/components';
import { useGetBannerQuery } from '~/features/banner/bannerApiSlice';
import { useGetProductsQuery } from '~/features/product/productApiSlice';
import { Layout  } from '~/layouts';



function Home() {
	const { data, isLoading, isSuccess, isError, error } = useGetBannerQuery();
	const { data: products } = useGetProductsQuery();

	let bannerData;
	if (isSuccess) {
		bannerData = [...data];
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
