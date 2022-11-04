import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import fallbackImage from '../assets/default-image.png';
import { formatName } from '../helper/formatProduct';

function Product({ product, minWidth }) {
	return (
		<>
			<Link href={`/product/${product?._id}`}>
				<div
					className={`cursor-pointer duration-500 ease-linear  text-[#324d67] hover:scale-105 sm:space-y-1 sm:leading-3 
					${minWidth ? `min-w-[${minWidth}] md:min-w-[150px] sm:min-w-[30vw]` : ''}`}
				>
					<div
						className='rounded-[15px] bg-[#ebebeb]  duration-400 ease-linear w-[200px] h-[200px] overflow-hidden relative
						 md:h-[150px]  md:w-[150px] sm:w-[30vw] sm:h-[30vw]'
					>
						<Image src={product.image[0] || fallbackImage} layout='fill' />
					</div>
					<div className='duration-400 ease-linear w-[200px]  flex flex-wrap flex-col  md:w-[150px] sm:w-[30vw]'>
						<p className='font-semibold  sm:text-[12px]'>{formatName(product?.name)}</p>
						<p className='font-extrabold leading-3 mb-3 sm:mt-1 text-black'>${product?.price}</p>
				</div>
				</div>
			</Link>
		</>
	);
}

export default Product;
