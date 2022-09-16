import { Layout, Product } from '~/components';
import { products } from '../../assets/dummy.data';

function Category() {
	return (
		<>
			<div className='text-center mt-[32px] mb-[20px] mx-0 text-[#324d67]'>
				<h2 className='text-[40px] font-extrabold md:text-[32px] sm:text-[24px] ssm:text-[18px]'>Earphone</h2>
				<p className='text-[16px] font-extralight'>Speakers of many variations</p>
			</div>
			<div className='px-20 flex justify-center '>
				<div className='rounded-full  ring overflow-hidden flex font-normal cursor-pointer'>
					<div className='bg-black text-white py-2 px-4 '>Increase</div>
					<div className=' py-2 px-3'>Decrease</div>
					<div className=' py-2 px-3'>Newest</div>
					<div className=' py-2 px-3'>Oldest</div>
				</div>
			</div>
			<div className='grid grid-cols-5 mt-[20px] w-full px-20 md:px-14 sm:px-[18px] items-center ssm:flex-nowrap ssm:flex-col'>
				{products?.map((product) => (
					<Product key={product._id} product={product} />
				))}
			</div>
		</>
	);
}

export const getStaticPaths = () => {
	const categories = [{ _id: '1' }, { _id: '2' }];

	const paths = categories.map((category) => ({
		params: {
			slug: category._id,
		},
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps = async ({ params: { slug } }) => {
	const product = {};

	return {
		props: { product },
	};
};

Category.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
export default Category;
