import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import Cart from './Cart';
import { useStateContext } from '~/context/StateContext';
import { SiShopware } from 'react-icons/si';

function Navbar() {
	const { showCart, setShowCart, totalQuantities } = useStateContext();

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
			<div>
				<button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
					<AiOutlineShopping />
					<span className='cart-item-qty'>{totalQuantities}</span>
				</button>
			</div>

			
		</div>
		</>
	);
}

export default Navbar;
