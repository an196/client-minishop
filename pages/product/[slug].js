import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { client, urlFor } from '~/lib/client';
import { Product, Layout } from '~/components';
import { useStateContext } from '~/context/StateContext';

function ProductDetails({ product, products }) {
	const { image, name, details, price } = product;
	const [index, setIndex] = useState(0);

	const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

	const handleBuyNow = () => {
		onAdd(product, qty);
		setShowCart(true);
	}

	return (
		<div>
			<div className='flex gap-10 m-10 mt-14 text-[#324d67] text-2xl font-semibold md:flex-wrap '>
				<div>
					<div className=''>
						<img 
							src={urlFor(image && image[index])} 
							className='rounded-2xl bg-[#ebebeb] w-400 h-[400px] cursor-pointer duration-300 ease-in-out hover:bg-[#f02d34] md:w-[350px] md:h-[350px]' />
					</div>
					<div className='flex gap-2 mt-5'>
						{image?.map((item, i) => (
							<img
								key={i}
								src={urlFor(item)}
								className={i === index ? 'small-image selected-image' : 'small-image'}
								
								onMouseEnter={() => setIndex(i)}
							/>
						))}
					</div>
				</div>
				<div className=''>
					<h1 className='text-3xl font-bold'>{name}</h1>
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
					<p className='mt-5 text-[20px]'>{details}</p>
					<p className='font-bold text-2xl mt-7 text-[#f02d34]'>${price}</p>
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
						<button type='button' 
							className='add-to-cart' 
							onClick={() => onAdd(product, qty)}>
							Add to Cart
						</button>
						<button type='button' 
							className='buy-now' 
							onClick={() => handleBuyNow()}
						>
							Buy Now
						</button>
					</div>
				</div>
			</div>
			<div className='mt-[120px]'>
				<h2 className='text-center m-12 text-[#324d67] text-3xl'>You may also like</h2>
				<div className='marquee'>
					<div className='maylike-products-container track'>
						{products.map((item) => (
							<Product key={item._id} product={item} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export const getStaticPaths = async () => {
	const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

	const products = await client.fetch(query);

	const paths = products.map((product) => ({
		params: {
			slug: product.slug.current,
		},
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps = async ({ params: { slug } }) => {
	const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
	const productsQuery = '*[_type == "product"]';

	const product = await client.fetch(query);
	const products = await client.fetch(productsQuery);

	return {
		props: { products, product },
	};
};

ProductDetails.getLayout = function getLayout(page) {
	return (
	  <Layout>
		{page}
	  </Layout>
	)
  }
  
export default ProductDetails;
