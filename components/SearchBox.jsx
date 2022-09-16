import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
function SearchBox() {
	return (
		<div className='items-center bg-black/10 px-4  py-1 rounded-full  w-max-[380px]'>
			<form action='' className='py-1 pl-1 flex justify-between gap-2'>
				<input type='text' 
				className='bg-transparent leading-6 outline-none font-normal grow ' 
				placeholder='Search...' 
				/>
				<button className='w-[20px]' type='button'>
					<AiOutlineSearch className='text-[16px] hover:scale-125 w-[20px] h-[20px] text-black/95' />
				</button>
			</form>
		</div>
	);
}

export default SearchBox;
