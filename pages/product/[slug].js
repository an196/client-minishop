import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { client, urlFor } from '~/lib/client';
import { Product, Layout } from '~/components';
import { useStateContext } from '~/context/StateContext';
import { useGetProductQuery } from '~/features/product/productApiSlice';
import Image from 'next/image';
import fallbackImage from '~/assets/default-image.png';
import request from '../../helper/request';

function ProductDetails({ product }) {
	const [index, setIndex] = useState(0);

	const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

	console.log('product');
	console.log(product);

	const handleBuyNow = () => {
		onAdd(product, qty);
		setShowCart(true);
	};

	return (
		<div>
			<div className='flex gap-10 m-10 mt-14 text-[#324d67] text-2xl font-semibold md:flex-wrap '>
				<div>
					<div className='rounded-2xl bg-[#ebebeb] w-[360px] h-[360px] cursor-pointer duration-300 ease-in-out hover:bg-[#f02d34] md:w-[350px] md:h-[350px]'>
						<Image
							src={(product?.image && product?.image[index]) || fallbackImage}
							layout='responsive'
							width={300}
							height={300}
						/>
					</div>
					<div className='flex gap-2 mt-5'>
						{product?.image?.map((item, i) => (
							<div key={i} className={i === index ? 'small-image selected-image' : 'small-image'}>
								<Image
									src={item || fallbackImage}
									onMouseEnter={() => setIndex(i)}
									layout='responsive'
									width={64}
									height={64}
								/>
							</div>
						))}
					</div>
				</div>
				<div className=''>
					<h1 className='text-3xl font-bold'>{product?.name}</h1>
					<div className='reviews '>
						<span className='flex'>
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiOutlineStar />
						</span>
						<p className='text-[20px]'>(20)</p>
					</div>

					<h4 className='mt-5 text-[24px]'>Details:</h4>
					<p className='mt-5 text-[20px]'>{product?.details}</p>
					<p className='font-bold text-2xl mt-7 text-[#f02d34]'>${product?.price}</p>
					<div className='flex gap-5 mt-5 items-center'>
						<h3 className='text-[20px]'>Quantity: </h3>
						<p className='border-1 border-gray-700 flex mt-1 rounded-xl'>
							<span className='text-base py-1 px-3 border-r-1 border-gray-700 text-[#f02d34] ' onClick={decQty}>
								<AiOutlineMinus />
							</span>
							<span className='py-1 px-3 border-r-1 border-gray-700 text-xs'>{qty}</span>
							<span className='text-base py-1 px-3 plus text-[#31a831]' onClick={incQty}>
								<AiOutlinePlus />
							</span>
						</p>
					</div>
					<div className='flex gap-7'>
						<button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>
							Add to Cart
						</button>
						<button type='button' className='buy-now' onClick={() => handleBuyNow()}>
							Buy Now
						</button>
					</div>
				</div>
			</div>
			{/* <div className='mt-[120px]'>
				<h2 className='text-center m-12 text-[#324d67] text-3xl'>You may also like</h2>
				<div className='marquee'>
					<div className='maylike-products-container track'>
						{products.map((item) => (
							<Product key={item._id} product={item} />
						))}
					</div>
				</div>
			</div> */}
		</div>
	);
}

export const getStaticPaths = async () => {
	const [products] = await Promise.all([fetch(request.fetchProducts).then((res) => res?.json())]);
	const paths = products.map((product) => ({
		params: {
			slug: product._id,
		},
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps = async ({ params: { slug } }) => {
	const [product] = await Promise.all([fetch(request.fetchProduct(slug)).then((res) => res?.json())]);

	return {
		props: { product },
	};
};

ProductDetails.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default ProductDetails;
