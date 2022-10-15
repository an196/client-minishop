import React from 'react';
import { FooterBanner, HeroBanner, OrtherCategory, RowItem } from '~/components';
import { useGetBannerQuery } from '~/features/banner/bannerApiSlice';
import { useGetProductsQuery } from '~/features/product/productApiSlice';
import { Layout } from '~/layouts';
import request from '~/helper/request';

function Home({categories}) {
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
			<RowItem title={'Beset selling earphone'} subtitle={'Earphone of many variations'} products={products} />
			<RowItem title={'Beset selling headphone'} subtitle={'Headphone of many variations'} products={products} />
			<RowItem title={'Beset selling watch'} subtitle={'Watch of many variations'} products={products} />
			<RowItem title={'Beset selling accessories'} subtitle={'Acessories of many variations'} products={products} />
			<OrtherCategory categories={categories} />
			<FooterBanner footerBanner={bannerData?.length && bannerData[0]} />
		</>
	);
}

export const getServerSideProps = async () => {
	const categories = await fetch(request.fetchCategories).then(res => res?.json());

	return {
		props: {categories},
	};
};

Home.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default Home;
