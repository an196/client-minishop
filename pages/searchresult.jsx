import React, { useState, useEffect } from 'react';
import { Product, HeadTitile, NoRecord, SuggestRowItem } from '~/components';
import { Layout } from '~/layouts';
import { useRouter } from 'next/router';
import request from '~/helper/request';
import { useStateContext } from '~/context/StateContext';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectCurrentFilters,
	setFilters,
	setProducts,
	sortProduct,
	selectCurrentProducts,
} from '~/features/product/productSlice';
import { useSearchProductQuery } from '~/features/product/productApiSlice';


function searchResult({ suggestItem1, suggestItem2, suggestItem3, suggestItem4 }) {
	const router = useRouter();
	const dispatch = useDispatch();

	const { data, isSuccess  } = useSearchProductQuery(router.query.p);
	const { categories } = useStateContext();

	const filters = useSelector(selectCurrentFilters);
	const result = useSelector(selectCurrentProducts);

	if(isSuccess){
		dispatch(setProducts(data));
	}

	const getSearch = async () => {
		const data = await fetch(request.fetchSearchResult(router.query.p)).then((res) => res.json());
		dispatch(setProducts(data));
	};

	const handleFilter = (e) => {
		dispatch(setFilters({ name: e.target.id }));
		dispatch(sortProduct({ name: e.target.id }));
	};

	//get title of suggest items
	const getTitleSuggestItem = (suggestItem) => {
		if (suggestItem && suggestItem.length > 0) {
			return categories.find((category) => category.code === suggestItem[0]?.category)?.name;
		}

		return '';
	};

	useEffect(() => {
		// getSearch();
	}, [router.query.p]);

	return (
		<>
			<HeadTitile title={''} subtitle={'Variety of shapes'} />
			{result?.length > 0 ? (
				<>
					<div className=' flex justify-center '>
						<div className='rounded-full  ring overflow-hidden flex font-normal cursor-pointer'>
							{filters.map((filter, _index) => (
								<div
									onClick={handleFilter}
									id={filter.name}
									className={`${filter.stats ? 'active-filter-style' : 'normal-filter-style'}`}
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
