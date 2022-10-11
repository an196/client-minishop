import React, { useState, useEffect } from 'react';
import { Layout, Product, HeadTitile, NoRecord } from '~/components';
import { useRouter } from 'next/router';
import request from '../helper/request';

const activeFilterStyle = 'bg-black text-white py-2 px-4 capitalize sm:text-[10px]';
const normalFilterStyle = 'py-2 px-3 capitalize sm:text-[12px]';

function searchResult({ data }) {
	const router = useRouter();
	const [result, setResult] = useState([]);

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

	useEffect(() => {
		getSearch();
	}, [router.query.p]);

	return (
		<div>
			{/* <div className='flex px-20 flex-wrap gap-[10px] mb-2'>
				<div className='font-medium'>Result:</div>
				<div className='font-normal text-blue-400'>{router.query.p}</div>
			</div> */}
			<HeadTitile title={''} subtitle={'Speakers of many variations'} />
			{result.length > 0 ? (
				<div className='px-20 flex justify-center '>
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

					<div
						className='grid grid-cols-5 gap-[15px] mt-[20px] w-full px-20 md:px-14 sm:px-[18px] xl:grid-cols-4 lg:px-0 lg:gap-0 
				place-items-center ssm:flex-nowrap ssm:flex-col hlg:grid-cols-3 hsm:grid-cols-2'
					>
						{result?.map((product) => (
							<Product key={product._id} product={product} />
						))}
					</div>
				</div>
			) : (
				<div className='flex flex-col items-center justify-center'>
					<NoRecord width={200} height={200} />
				</div>
			)}
		</div>
	);
}

searchResult.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default searchResult;
