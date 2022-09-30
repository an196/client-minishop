import React, {useState} from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import request from '../helper/request';
import {useRouter} from 'next/router';


function SearchBox() {
	const [searchTerm, setSearchTerm ] = useState(); 
	const router = useRouter();

	const handleSearch = async () => {
		router.replace(`/searchresult?p=${searchTerm}`)
		console.log(searchTerm)
	}

	const hanldeChange = (e) => {
		setSearchTerm(e.target.value)
	}

	return (
			<div className='items-center bg-black/10 px-4  py-1 rounded-full  w-[380px] md:w-[100vw] md:rounded-none md:mb-3'>
				<form action='' className='py-1 pl-1 flex justify-between gap-2'>
					<input
						type='text'
						className='bg-transparent leading-6 outline-none font-normal grow '
						placeholder='Search...'
						onChange={hanldeChange}
					/>
					<button className='w-[20px]' type='button' onClick={handleSearch}>
						<AiOutlineSearch className='text-[16px] hover:scale-125 w-[20px] h-[20px] text-black/95' />
					</button>
				</form>
			</div>	
	);
}

export default SearchBox;
