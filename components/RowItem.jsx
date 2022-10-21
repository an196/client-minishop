import React from 'react';
import { HeadTitile, Product } from '~/components';

function RowItem({ title, subtitle, products }) {
	return (
		<>
			{products.length > 0 && (
				<>
					<HeadTitile title={title} subtitle={subtitle || 'Speakers of many variations'} />
					
					<div className='product-container'>
						{products?.slice(0, 5).map((product) => (
							<Product key={product._id} product={product} />
						))}
					</div>
					
				</>
			)}
		</>
	);
}

export default RowItem;
