import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { DescriptionDetail, SuggestItemsArea } from '../../components';
import { Layout } from '../../layouts';
import { useStateContext } from '../../context/StateContext';
import Image from 'next/image';
import fallbackImage from '../../assets/default-image.png';
import request from '../../helper/request';

function ProductDetails({ product }) {
	const [index, setIndex] = useState(0);

	const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

	const handleBuyNow = () => {
		onAdd(product, qty);
		setShowCart(true);
	};

	return (
		<div className='flex max-w-[1200px] md:w-full flex-col items-center justify-center'>
			<div className='flex gap-10 m-10 mt-14 text-[#324d67] font-semibold hlg:flex-wrap md:gap-6 sm:m-0 sm:w-full'>
				<div className='px-6'>
					<div
						className='rounded-2xl bg-[#ebebeb] w-[360px] h-[360px] cursor-pointer duration-300 ease-in-out hover:bg-[#f02d34] md:w-[300px] md:h-[300px] 
					relative sm:w-[250px] sm:h-[250px] ssm:w-[180px] ssm:h-[180px] '
					>
						<Image src={(product?.image && product?.image[index]) || fallbackImage} width={360} height={360} layout='responsive' />
					</div>
					<div className='flex gap-2 mt-5 sm:flex-wrap w-[360px] md:w-[300px] sm:w-[250px]  ssm:w-[180px]'>
						{product?.image?.map((item, i) => (
							<div key={i} className={i === index ? 'small-image selected-image' : 'small-image'}>
								<Image
									src={item || fallbackImage}
									onMouseEnter={() => setIndex(i)}
									layout='fixed'
									width={64}
									height={64}
								/>
							</div>
						))}
					</div>
				</div>
				<div className='sm:w-full px-6'>
					<h1 className='text-2xl font-bold md:text-xl'>{product?.name}</h1>
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

					<h4 className='mt-5 text-[24px] sm:text-[20px] '>Details:</h4>
					<div className='mt-5 text-[16px] sm:flex md:flex-wrap text-justify sm:w-full'>
						{product?.details ? <DescriptionDetail details={product?.details} /> : 'No Description'}
					</div>
					<p className='font-bold text-2xl mt-7 text-[#f02d34] sm:text-xl'>${product?.price}</p>
					<div className='flex gap-5 mt-5 items-center hsm:gap-2 hsm:flex-wrap'>
						<h3 className='text-[20px]'>Quantity: </h3>
						<p className='border-1 border-gray-700 flex mt-1 rounded-xl'>
							<span
								className='text-base py-1 px-3 border-r-1 border-gray-700 text-[#f02d34] cursor-pointer hover:bg-[#f02d34]/10 rounded-l-sm'
								onClick={decQty}
							>
								<AiOutlineMinus />
							</span>
							<span className='py-1 px-3 border-r-1 border-gray-700 text-xs'>{qty}</span>
							<span
								className='text-base py-1 px-3 plus text-[#31a831]  cursor-pointer hover:bg-[#31a831]/10 rounded-r-sm'
								onClick={incQty}
							>
								<AiOutlinePlus />
							</span>
						</p>
					</div>
					<div className='flex ssm:justify-items-center ssm:w-full ssm:justify-center gap-7 sm:gap-0 sm:space-x-3'>
						<button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>
							Add to Cart
						</button>
						<button type='button' className='buy-now' onClick={() => handleBuyNow()}>
							Buy Now
						</button>
					</div>
				</div>
			</div>
			<SuggestItemsArea />
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

	const [product] = await Promise.all([
		fetch(request.fetchProduct(slug)).then((res) => res?.json()),
	]);

	return {
		props: { product },
	};
};

ProductDetails.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default ProductDetails;
