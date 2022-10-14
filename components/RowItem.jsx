import React from 'react';
import { HeadTitile, Product } from '~/components';

function RowItem({ title, subtitle, products }) {
	return (
		<div>
			<HeadTitile title={title} subtitle={subtitle || 'Speakers of many variations'} />
			{/* <div className='grid grid-cols-5 gap-[15px] mt-[20px] w-full px-20 md:px-14 sm:px-[18px] xl:grid-cols-4 lg:px-0 lg:gap-2 
				place-items-center ssm:flex-nowrap ssm:flex-col hlg:grid-cols-3 hsm:grid-cols-2 items-stretch'>
				{products?.slice(0, 5).map((product) => (
					<Product key={product._id} product={product} />
				))}
			</div> */}
			<div className='gap-[15px] mt-[20px] w-full px-20 flex flex-wrap items-center justify-center'>
				{products?.slice(0, 5).map((product) => (
					<Product key={product._id} product={product} />
				))}
			</div>
		</div>
	);
}

export default RowItem;
