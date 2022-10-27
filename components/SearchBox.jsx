import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { ResultSearchBox } from '../components';
import { useSearchProductQuery } from '../features/product/productApiSlice';

function SearchBox() {
	const [searchTerm, setSearchTerm] = useState('');
	const [skip, setSkip] = useState(true);
	const { data, isSuccess } = useSearchProductQuery(searchTerm, { skip });
	const [showResultSearchBox, setShowResultSearchBox] = useState(false);
	const router = useRouter();

	const debounce = (func, timeout = 2000) => {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				func.apply(this, args);
			}, timeout);
		};
	};

	//handle for components when changed
	const handleSearch = async () => {
		if (searchTerm) {
			router.replace(`/searchresult?p=${searchTerm}`);
		}
	};

	const hanldeChange = (e) => {
		setSearchTerm(e.target.value);
		if (e.target.value !== '') {
			console.log(e.target.value);
			debounce(() => {
				setSkip(false);
			})();
		}
		setSkip(true);
	};

	const handleKeydown = (event) => {
		if (event.code === 'Enter' && searchTerm !== '') {
			handleSearch();
		}
	};

	
	return (
		<>
			<div className='items-center bg-black/10  rounded-full  w-[380px] md:w-[100vw] md:rounded-none relative'>
				<div className='py-1 px-4  flex justify-between gap-2 md:mb-3'>
					<input
						type='text'
						className='bg-transparent leading-6 outline-none font-normal grow ml-2'
						placeholder='Search...'
						onChange={hanldeChange}
						onKeyDown={handleKeydown}
						onFocus={() =>setShowResultSearchBox(true)}
						// onBlur={() => setShowResultSearchBox(false)}
					/>
					<button className='w-[20px]' type='button' onClick={handleSearch}>
						<AiOutlineSearch className='text-[16px] hover:scale-125 w-[20px] h-[20px] text-black/95' />
					</button>
				</div>
				{isSuccess && showResultSearchBox && (
					<ResultSearchBox data={data} setShowResultSearchBox={setShowResultSearchBox} />
				)}
			</div>
			{/* <div className='absolute w-screen h-screen bg-black/5 z-0 inset-0'>

			</div> */}
		</>
	);
}

export default SearchBox;
