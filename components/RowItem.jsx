import React from 'react';
import { HeadTitile, Product } from '~/components';

function RowItem({ title, subtitle, products }) {
	return (
		<div>
			{products.length > 0 && (
				<>
					<HeadTitile title={title} subtitle={subtitle || 'Speakers of many variations'} />
					<div className='flex justify-center '>
					<div className='gap-[15px] mt-[20px] w-full px-20 flex flex-wrap sm:px-1 sm:gap-2 justify-center items-stretch'>
						{products?.slice(0, 5).map((product) => (
							<Product key={product._id} product={product} />
						))}
					</div>
					</div>
					
				</>
			)}
		</div>
	);
}

export default RowItem;
