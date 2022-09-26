import { useState } from 'react';
import { Layout, Product, HeadTitile } from '~/components';
import { products } from '../../assets/dummy.data';
import request from '../../helper/request';

const activeFilterStyle = 'bg-black text-white py-2 px-4 capitalize sm:text-[10px]';
const normalFilterStyle = 'py-2 px-3 capitalize sm:text-[12px]';

function Category() {
	const [filters, setFilters] = useState([
		{ name: 'increase', stats: true },
		{ name: 'decrease', stats: false },
		{ name: 'newest', stats: false },
		{ name: 'oldest', stats: false },
	]);

	const [currentFilter, setCurrentFilter] = useState(filters[0].name);

	const sortIncrease = () => {
		const newdata = products.sort((a, b) => a.price - b.price);
	};

	const sortDecrease = () => {
		const newdata = products.sort((a, b) => b.price - a.price);
	};

	const sortNewest = () => {
		const newdata = products.sort((a, b) => a.goodsReceipts - b.goodsReceipts);
	};

	const sortOldest = () => {
		const newdata = products.sort((a, b) => b.goodsReceipts - a.goodsReceipts);
	};

	const handleFilter = (e) => {
		let newFilters = [...filters];
		newFilters.forEach((filter) => {
			if (e.target.id === filter.name) {
				filter.stats = true;
			} else {
				filter.stats = false;
			}
		});
		
		setFilters(newFilters);

		switch (e.target.id) {
			case 'increase':
				sortIncrease();
				break;
			case 'decrease':
				sortDecrease();
				break;
			case 'newest':
				sortNewest();
				break;
			case 'oldest':
				sortOldest();
				break;
			default:
				break;
		}
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
			<div
				className='grid grid-cols-5 gap-[15px] mt-[20px] w-full px-20 md:px-14 sm:px-[18px] xl:grid-cols-4 lg:px-0 lg:gap-0 
				place-items-center ssm:flex-nowrap ssm:flex-col hlg:grid-cols-3 hsm:grid-cols-2'
			>
				{products?.map((product) => (
					<Product key={product._id} product={product} />
				))}
			</div>
		</>
	);
}

export const getStaticPaths = async () => {
	const categories = await fetch(request.fetchCategories).then((res) => res.json());

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
	return {
		props: {},
	};
};

Category.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
export default Category;
