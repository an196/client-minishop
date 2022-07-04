import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '~/context/StateContext';
import { SiShopware } from 'react-icons/si';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import avatar from '~/assets/default-user.png';
import Image from 'next/image';
import {NavButton, Cart, UserBar} from '../components';
import { icons } from 'react-icons/lib';

function Navbar() {
	const [userBarActive, setUserBarActive] = useState(true);

	const { showCart, setShowCart, totalQuantities, isClicked, handleClick } = useStateContext();

	return (
		<>
			{showCart && <Cart />}
			<div className='navbar-container border-b-1 drop-shadow-lg mb-5 px-10 p-3'>
				<div className='logo'>
					<Link href={'/'}>
						<div className='flex space-x-2 items-center text-xl font-semibold'>
							<SiShopware />
							<p>MiniShop</p>
						</div>
					</Link>
				</div>
				<div className='flex flex-row space-x-4 items-center'>
					<div className='flex items-center'>
						<button
							type='button'
							className='text-[25px] text-gray-700 cursor-pointer relative transform duration-400 ease-linear border-none bg-transparent'
							onClick={() => setShowCart(true)}
						>
							<AiOutlineShopping />
							<span className='cart-item-qty'>{totalQuantities}</span>
						</button>
					</div>
					<div className='flex flex-row space-x-2 items-center'>
						<div className='text-gray-700 rounded-full border-1 overflow-hidden w-[25px] h-[25px]'>
							<Image src={avatar} layout='intrinsic' alt='user-profile' />
						</div>
						<div>
							<span className='text-gray-400 text-14'>Hi,</span>{' '}
							<span className='text-gray-400 font-bold ml-1 text-14'>Michael</span>
						</div>
						<NavButton
							customFunc={()=> handleClick('userBar', !isClicked.userBar)}
							icon={isClicked.userBar ? (
								<MdKeyboardArrowUp className='text-gray-400 text-14' />
							) : (
								<MdKeyboardArrowDown className='text-gray-400 text-14' />
							)}
						>
						</NavButton>
						{isClicked.userBar && <UserBar />}
					</div>
				</div>
			</div>
		</>
	);
}

export default Navbar;
