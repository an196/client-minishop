import React from 'react';
import Link from 'next/Link';
import Image from 'next/image';
import fallbackImage from '~/assets/default-image.png';

function Product({ product }) {
	return (
		<>
			<Link href={`/product/${product?._id}`}>
				<div className='cursor-pointer duration-500 ease-linear text-[#324d67] hover:scale-105'>
					<div className='rounded-[15px] bg-[#ebebeb]  duration-400 ease-linear w-[200px] h-[200px] overflow-hidden relative
						md:w-[150px] md:h-[150px]'
					>
						<Image src={ product.image[0] ||  fallbackImage}  layout='fill' />
					</div>
					<p className='font-semibold mt-1 sm:text-[16px]'>{product?.name}</p>
					<p className='font-extrabold mt-[2px] mb-3 sm:mt-1 text-black'>${product?.price}</p>
				</div>
			</Link>
		</>
	);
}

export default Product;
