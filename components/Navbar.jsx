import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';
import { useStateContext } from '~/context/StateContext';
import { SiShopware } from 'react-icons/si';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import avatar from '~/assets/default-user.png';
import Image from 'next/image';
import { NavButton, Cart, UserBar, SearchBox, HamburgerButton } from '../components';
import { icons } from 'react-icons/lib';
import { useRouter } from 'next/router';

function Navbar() {
	const [userBarActive, setUserBarActive] = useState(true);

	const {
		showCart,
		setShowCart,
		totalQuantities,
		isClicked,
		handleClick,
		screenSize,
		setScreenSize,
		showHamburgerButton,
		setShowHamburgerButton,
		showSubSearchbar,
		setShowSubSearchbar,
	} = useStateContext();

	const router = useRouter();

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);

		window.addEventListener('resize', handleResize);

		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (screenSize <= 767) {
			handleClick('userBar', false);
			setShowHamburgerButton(true);
			setShowSubSearchbar(true);
		} else {
			setShowHamburgerButton(false);
			setShowSubSearchbar(false);
		}
	}, [screenSize]);

	return (
		<>
			{isClicked.userBar && !showCart && <UserBar />}
			{showCart && <Cart />}
			<div className='navbar-container border-b-1 drop-shadow-lg mb-5 px-10 p-3 hlg:px-3 hlg:mx-1 md:mb-0'>
				<div className='logo cursor-pointer flex justify-center space-x-3'>
					{showHamburgerButton && (
						<div className='cursor-pointer flex justify-center items-center text-[1.55rem] text-gray-500'>
							<HamburgerButton />
						</div>
					)}
					<Link href={'/'}>
						<div className='flex space-x-2 items-center text-xl font-semibold'>
							<SiShopware />
							<p>MiniShop</p>
						</div>
					</Link>
				</div>
				<div className='flex space-x-6 items-center font-extrabold'>
					<Link href={`/`}>
						<span
							className={
								router.pathname === '/'
									? `text-2xl nav-bar-item-active xl:hidden`
									: 'cursor-pointer nav-bar-item text-gray-700 text-2xl xl:hidden'
							}
						>
							Home
						</span>
					</Link>
					<Link href={`/category/1`}>
						<span
							className={
								router.query?.slug === '1'
									? `text-2xl nav-bar-item-active xl:hidden`
									: 'nav-bar-item text-gray-700 text-2xl xl:hidden'
							}
						>
							Earphone
						</span>
					</Link>
					<Link href={`/category/2`}>
						<span
							className={
								router.query?.slug === '2'
									? `text-2xl nav-bar-item-active xl:hidden`
									: 'nav-bar-item text-gray-700 text-2xl xl:hidden'
							}
						>
							Home
						</span>
					</Link>
					<div className='md:hidden'>
						<SearchBox />
					</div>
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
					<div className='flex flex-row space-x-2 items-center max-w-[135px]'>
						<div className='text-gray-700 rounded-full border-1 overflow-hidden w-[25px] h-[25px] cursor-pointer'>
							<Image src={avatar} layout='intrinsic' alt='user-profile' />
						</div>
						<FiLogIn />
					</div>
				</div>
			</div>
			{showSubSearchbar && (
				<div className=''>
					<SearchBox />
				</div>
			)}
		</>
	);
}

export default Navbar;
