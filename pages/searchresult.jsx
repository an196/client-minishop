import React, { useState, useEffect } from 'react';
import { Product, HeadTitile, NoRecord, SuggestRowItem } from '~/components';
import { Layout } from '~/layouts';
import { useRouter } from 'next/router';
import request from '~/helper/request';
import { useStateContext } from '~/context/StateContext';

const activeFilterStyle = 'bg-black text-white py-2 px-4 capitalize sm:text-[10px]';
const normalFilterStyle = 'py-2 px-3 capitalize sm:text-[12px]';

function searchResult({ suggestItem1, suggestItem2, suggestItem3, suggestItem4 }) {
	const router = useRouter();
	const [result, setResult] = useState([]);
	const {categories} = useStateContext();

	const getSearch = async () => {
		const data = await fetch(request.fetchSearchResult(router.query.p)).then((res) => res.json());
		setResult(data);
	};

	const [filters, setFilters] = useState([
		{ name: 'increase', stats: true },
		{ name: 'decrease', stats: false },
		{ name: 'newest', stats: false },
		{ name: 'oldest', stats: false },
	]);

	const [currentFilter, setCurrentFilter] = useState(filters[0].name);

	const sortIncrease = () => {
		const newdata = result.sort((a, b) => a.price - b.price);
	};

	const sortDecrease = () => {
		const newdata = result.sort((a, b) => b.price - a.price);
	};

	const sortNewest = () => {
		const newdata = result.sort((a, b) => a.goodsReceipts - b.goodsReceipts);
	};

	const sortOldest = () => {
		const newdata = result.sort((a, b) => b.goodsReceipts - a.goodsReceipts);
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

	useEffect(() => {
		getSearch();
	}, [router.query.p]);

	return (
		<>
			<HeadTitile title={''} subtitle={'Speakers of many variations'} />
			{result.length > 0 ? (
				<>
					<div className=' flex justify-center '>
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

					<div className='product-container'>
						{result?.map((product) => (
							<Product key={product._id} product={product} />
						))}
					</div>
				</>
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

export const getServerSideProps = async () => {
	const categories = await fetch(request.fetchCategories).then((res) => res?.json());

	const [suggestItem1, suggestItem2, suggestItem3, suggestItem4] = await Promise.all([
		fetch(request.fetchProductByCategory(categories[0]?.code)).then((res) => res?.json()),
		fetch(request.fetchProductByCategory(categories[1]?.code)).then((res) => res?.json()),
		fetch(request.fetchProductByCategory(categories[2]?.code)).then((res) => res?.json()),
		fetch(request.fetchProductByCategory(categories[3]?.code)).then((res) => res?.json()),
	]);

	return {
		props: { suggestItem1, suggestItem2, suggestItem3, suggestItem4 },
	};
};

searchResult.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default searchResult;
