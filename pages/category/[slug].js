import { useState } from 'react';
import { Layout, Product } from '~/components';
import { products } from '../../assets/dummy.data';
import { HeadTitile } from '../../components';

const activeFilterStyle = 'bg-black text-white py-2 px-4 capitalize';
const normalFilterStyle = 'py-2 px-3 capitalize';

function Category() {
	const [filters, setFilters] = useState([
		{ name: 'increase', stats: true },
		{ name: 'decrease', stats: false },
		{ name: 'newest', stats: false },
		{ name: 'oldest', stats: false },
	]);

	const handleFilter = (e) => {
		let newFilters = [...filters];
		newFilters.forEach((filter) => {
			if (e.target.id === filter.name) {
				filter.stats = true;
			} else {
				filter.stats = false;
			}
		});
		console.log(newFilters);
		setFilters(newFilters);
	};

	return (
		<>
			<HeadTitile title={'Earphone'} subtitle={'Speakers of many variations'} />
			<div className='px-20 flex justify-center '>
				<div className='rounded-full  ring overflow-hidden flex font-normal cursor-pointer'>
					{filters.map((filter) => (
						<div
							onClick={handleFilter}
							id={filter.name}
							className={`${filter.stats ? activeFilterStyle : normalFilterStyle}`}
						>
							{filter.name}
						</div>
					))}
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
