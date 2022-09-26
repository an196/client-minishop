import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiShopware } from 'react-icons/si';
import { MdCancel } from 'react-icons/md';
import { useStateContext } from '~/context/StateContext';
import { useRouter } from 'next/router';

function SliderNavBar({ setShowSliderNavbar }) {
	const { categories } = useStateContext();
  const router = useRouter();

	const handleClose = () => {
		setShowSliderNavbar(false);
	};

  const handleClick = (id) => {
    router.replace(`/category/${id}`);
    handleClose();
  }

	return (
		<div className='w-screen h-screen bg-white absolute z-20 duration-500 ease-linear'>
			<div className='logo cursor-pointer flex space-x-3 p-5 items-center justify-between border-b-2'>
				<Link href={'/'}>
					<div className='flex space-x-2 items-center text-xl font-semibold'>
						<SiShopware />
						<p>MiniShop</p>
					</div>
				</Link>
				<div className='text-[1.56rem]' onClick={handleClose}>
					<MdCancel />
				</div>
			</div>
			<div className='p-5 space-y-3 font-medium text-[1.12rem] text-gray-500'>
				{categories?.map((category) => (
					
					<div onClick={() => handleClick(category._id)}>{category.name}</div>
				
				))}
			</div>
		</div>
	);
}

export default SliderNavBar;
