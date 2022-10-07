import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { useStateContext } from '~/context/StateContext';
import { SiShopware } from 'react-icons/si';
import avatar from '~/assets/default-user.png';
import Image from 'next/image';
import { Cart, UserBar, SearchBox, HamburgerButton, SliderNavBar } from '../components';
import { useRouter } from 'next/router';
import request from '../helper/request';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentToken, selectCurrentUser, logOut } from '~/features/auth/authSlice';

function Navbar() {
	const { categories, setCategories } = useStateContext();
	const token = useSelector(selectCurrentToken);
	const userInfo = useSelector(selectCurrentUser);
	const dispatch = useDispatch();

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
		showSliderNavbar,
		setShowSliderNavbar,
	} = useStateContext();

	const router = useRouter();

	const handleHamburgerButtonClick = () => {
		setShowSliderNavbar(true);
	};

	const handleLogOut = () => {
		dispatch(logOut());
		router.replace('/');
	}

	const getCategories = async () => {
		const data = await fetch(request.fetchCategories).then((res) => res.json());
		setCategories(data);
	};

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);

		window.addEventListener('resize', handleResize);

		handleResize();

		getCategories();

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
			{showSliderNavbar && <SliderNavBar setShowSliderNavbar={setShowSliderNavbar} />}
			<div className='navbar-container border-b-1 drop-shadow-lg mb-5 px-10 p-3 hlg:px-3 hlg:mx-1 md:mb-0'>
				<div className='logo cursor-pointer flex justify-center space-x-3'>
					{showHamburgerButton && (
						<div
							className='cursor-pointer flex justify-center items-center text-[1.55rem] text-gray-500'
							onClick={handleHamburgerButtonClick}
						>
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
							<Image
								src={!userInfo ? avatar : userInfo.imgProfile}
								layout='responsive'
								width={25}
								height={25}
								alt='user-profile'
							/>
						</div>
						{!token ? (
							<Link href={`/login`}>
								<div className='cursor-pointer'>
									<FiLogIn />
								</div>
							</Link>
						) : (
							<div className='cursor-pointer' onClick={handleLogOut}>
								<FiLogOut />
							</div>
						)}
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
