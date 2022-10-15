import React from 'react';
import { FooterBanner, HeroBanner, OrtherCategory, RowItem } from '~/components';
import { useGetBannerQuery } from '~/features/banner/bannerApiSlice';
import { useGetProductsQuery } from '~/features/product/productApiSlice';
import { Layout } from '~/layouts';
import request from '~/helper/request';

function Home({ categories, besetItems1, besetItems2, besetItems3, besetItems4 }) {
	const { data, isLoading, isSuccess, isError, error } = useGetBannerQuery();
	const { data: products } = useGetProductsQuery();

	let bannerData;
	if (isSuccess) {
		bannerData = [...data];
	}

	if (isError) {
		return <p>Error...</p>;
	}

	//get title of Beset selling items
	const getTitleBesetItem = (besetItems) => {
		if (besetItems && besetItems.length > 0) {
			return categories.find((category) => category.code === besetItems[0]?.category)?.name.toLowerCase();
		}

		return '';
	};

	return (
		<>
			<HeroBanner heroBanner={bannerData?.length && bannerData[0]} />
			<RowItem
				title={`Beset selling ${getTitleBesetItem(besetItems1)}`}
				subtitle={'Earphone of many variations'}
				products={besetItems1}
			/>
			<RowItem
				title={`Beset selling ${getTitleBesetItem(besetItems2)}`}
				subtitle={'Headphone of many variations'}
				products={besetItems2}
			/>
			<RowItem
				title={`Beset selling ${getTitleBesetItem(besetItems3)}`}
				subtitle={'Watch of many variations'}
				products={besetItems3}
			/>
			<RowItem
				title={`Beset selling ${getTitleBesetItem(besetItems4)}`}
				subtitle={'Acessories of many variations'}
				products={besetItems4}
			/>
			<OrtherCategory categories={categories} />
			<FooterBanner footerBanner={bannerData?.length && bannerData[0]} />
		</>
	);
}

export const getServerSideProps = async () => {
	const categories = await fetch(request.fetchCategories).then((res) => res?.json());

	const [besetItems1, besetItems2, besetItems3, besetItems4] = await Promise.all([
		fetch(request.fetchProductByCategory(categories[0]?.code)).then((res) => res?.json()),
		fetch(request.fetchProductByCategory(categories[1]?.code)).then((res) => res?.json()),
		fetch(request.fetchProductByCategory(categories[2]?.code)).then((res) => res?.json()),
		fetch(request.fetchProductByCategory(categories[3]?.code)).then((res) => res?.json()),
	]);
	return {
		props: {
			categories,
			besetItems1,
			besetItems2,
			besetItems3,
			besetItems4,
		},
	};
};

Home.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default Home;
