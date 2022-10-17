import { useState } from 'react';
import { Product, HeadTitile, NoRecord, SuggestRowItem } from '~/components';
import { Layout } from '~/layouts';
import request from '~/helper/request';
import { useStateContext } from '~/context/StateContext';

const activeFilterStyle = 'bg-black text-white py-2 px-4 capitalize sm:text-[10px] sm:px-2';
const normalFilterStyle = 'py-2 px-3 capitalize sm:text-[12px] sm:px-2';

function Category({ products, suggestItem1, suggestItem2, suggestItem3, suggestItem4 }) {
	const [filters, setFilters] = useState([
		{ name: 'increase', stats: true },
		{ name: 'decrease', stats: false },
		{ name: 'newest', stats: false },
		{ name: 'oldest', stats: false },
	]);

	const [currentFilter, setCurrentFilter] = useState(filters[0].name);
	const { categories } = useStateContext();

	const sortIncrease = () => {
		const newdata = products.sort((a, b) => a.price - b.price);
	};

	const sortDecrease = () => {
		const newdata = products.sort((a, b) => b.price - a.price);
	};

	const sortNewest = () => {
		const newdata = products.sort(
			(a, b) => new Date(a?.goodsReceipts).getTime() - new Date(b?.goodsReceipts).getTime(),
		);
	};

	const sortOldest = () => {
		const newdata = products.sort(
			(a, b) => new Date(b?.goodsReceipts).getTime() - new Date(a?.goodsReceipts).getTime(),
		);
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

	//get title of suggest items
	const getTitleSuggestItem = (suggestItem) => {
		if (suggestItem && suggestItem.length > 0) {
			return categories.find((category) => category.code === suggestItem[0]?.category)?.name;
		}

		return '';
	};

	return (
		<>
			<HeadTitile title={''} subtitle={'Variety of shapes'} />
			<div className='px-20 flex flex-wrap  justify-center sm:px-4'>
				<div className='rounded-full  ring overflow-hidden flex font-normal cursor-pointer'>
					{filters.map((filter, _index) => (
						<div
							onClick={handleFilter}
							id={filter.name}
							className={`${filter.stats ? activeFilterStyle : normalFilterStyle}`}
							key={_index}
						>
							{filter.name}
						</div>
					))}
				</div>
			</div>
			{products.length !== 0 ? (
				<div className='product-container'>
					{products?.map((product) => (
						<Product key={product._id} product={product} />
					))}
				</div>
			) : (
				<div className='flex flex-col items-center justify-center mt-2'>
					<NoRecord width={200} height={200} />
				</div>
			)}
			<div className='w-full'>
				<h2 className='text-center m-12 text-[#324d67] text-[24px] font-semibold'>You may also like</h2>
				<SuggestRowItem items={suggestItem1} title={getTitleSuggestItem(suggestItem1)} />
				<SuggestRowItem items={suggestItem2} title={getTitleSuggestItem(suggestItem2)} />
				<SuggestRowItem items={suggestItem3} title={getTitleSuggestItem(suggestItem3)} />
				<SuggestRowItem items={suggestItem4} title={getTitleSuggestItem(suggestItem4)} />
			</div>
		</>
	);
}

export const getStaticPaths = async () => {
	const categories = await fetch(request.fetchCategories).then((res) => res?.json());

	const paths = categories.map((category) => ({
		params: {
			slug: category.code.toString(),
		},
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps = async ({ params: { slug } }) => {
	const categories = await fetch(request.fetchCategories).then((res) => res?.json());

	const [products, suggestItem1, suggestItem2, suggestItem3, suggestItem4] = await Promise.all([
		fetch(request.fetchProductByCategory(slug)).then((res) => res?.json()),
		fetch(request.fetchProductByCategory(categories[0]?.code)).then((res) => res?.json()),
		fetch(request.fetchProductByCategory(categories[1]?.code)).then((res) => res?.json()),
		fetch(request.fetchProductByCategory(categories[2]?.code)).then((res) => res?.json()),
		fetch(request.fetchProductByCategory(categories[3]?.code)).then((res) => res?.json()),
	]);

	return {
		props: { products, suggestItem1, suggestItem2, suggestItem3, suggestItem4 },
	};
};

Category.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default Category;
