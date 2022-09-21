import React from 'react';
import {HeadTitile,Product} from '~/components';

function RowItem({title,subtitle,products }) {
	return (
		<div>
			<HeadTitile title={'Beset selling headphone'} subtitle={'Speakers of many variations'} />
			<div className='grid grid-cols-5 gap-[15px] mt-[20px] w-full px-20 md:px-14 sm:px-[18px] xl:grid-cols-4 lg:px-0 lg:gap-0 
				place-items-center ssm:flex-nowrap ssm:flex-col hlg:grid-cols-2 ssm:grid-cols-1'>
				{products?.slice(0, 5).map((product) => (
					<Product key={product._id} product={product} />
				))}
			</div>
		</div>
	);
}

export default RowItem;
