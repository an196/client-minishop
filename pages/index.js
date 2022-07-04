import React from 'react';
import { Product, FooterBanner, HeroBanner, Layout } from '~/components';
import { useGetBannerQuery } from '~/features/banner/bannerApiSlice';
import { useGetProductsQuery } from '~/features/product/productApiSlice';

function Home() {
	const { data , isLoading, isSuccess, isError, error } = useGetBannerQuery();
	const {data: products ,  } = useGetProductsQuery();

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
			<div className='text-center my-[40px] mx-0 text-[#324d67]'>
				<h2 className='text-[40px] font-extrabold'>Beset selling products</h2>
				<p className='text-[16px] font-extralight'>Speakers of many variations</p>
			</div>
			<div className='flex flex-wrap content-center gap-[15px] mt-[20px] w-full'>
				{products?.map((product) => (
					<Product key={product._id} product={product} />
				))}
			</div>
			<FooterBanner footerBanner={bannerData?.length && bannerData[0]} />
		</>
	);
}

export const getServerSideProps = async () => {
	return {
		props: {
		},
	};
};

Home.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default Home;
