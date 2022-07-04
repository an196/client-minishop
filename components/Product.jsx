import React from 'react';
import Link from 'next/Link';
import Image from 'next/image';
import fallbackImage from '~/assets/default-image.png';

function Product({ product }) {
	return (
		<>
			<Link href={`/product/${product?._id}`}>
				<div className='cursor-pointer scale-100 duration-500 ease-linear text-[#324d67] hover:scale-110'>
					<div className='rounded-[15px] bg-[#ebebeb]  duration-400 ease-linear w-[200px] h-[200px] overflow-hidden'>
						<Image src={ product.image[0] ||  fallbackImage} width={200} height={200} layout='responsive' />
					</div>
					<p className='font-medium'>{product?.name}</p>
					<p className='font-extrabold mt-[6px] text-black'>${product?.price}</p>
				</div>
			</Link>
		</>
	);
}

export default Product;
