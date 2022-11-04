import React from 'react';
import { useRouter } from 'next/router';

function ResultSearchBox({ data, setShowResultSearchBox }) {
	const router = useRouter();

	const handleClickItem = (item) => {
		setShowResultSearchBox(false);
		router.replace(`/product/${item?._id}`);
	};

	return (
		<>
			<div className='absolute bg-slate-50 w-full h-auto rounded-md mt-0.5 py-2 z-20'>
				<div className='space-y-2 '>
					{data.slice(0, 10).map((item) => (
						<div
							key={item._id}
							className='flex space-x-4 hover:bg-blue-200  px-4 cursor-pointer'
							onClick={() => handleClickItem(item)}
						>
							<img src={item.image[0]} className='w-[30px] h-[30px]' />
							<span className='font-normal'>{item.name}</span>
						</div>
					))}
				</div>
			</div>
			<div className='fixed inset-0 z-0 h-screen' onClick={() =>setShowResultSearchBox(false)}></div>
		</>
	);
}

export default ResultSearchBox;
