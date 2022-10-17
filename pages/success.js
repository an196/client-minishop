import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { useStateContext } from '~/context/StateContext';
import { runFireworks } from '~/lib/utils';
import successImage from '~/assets/high_five.jpg';
import Image from 'next/image';

function Success() {
	const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
	const [order, setOrder] = useState(null);

	useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  },[]);

	return (
		<div className='flex min-h-[100vh]  text-center justify-center items-center  flex-col'>
			<div className='text-center text-[16px] '>
				<p className='flex items-center justify-center text-[40px] py-4 text-green-500'>
					<BsBagCheckFill />
				</p>
				<h2 className='text-[#324d67] text-[24px] font-extrabold'>Thank you for your order!</h2>
				<p className=' font-extralight'>Check your email inbox for the receipt</p>
				<p className='font-extralight text-[#0b74e5]'>
					If you have any questions, please mail
					<a className='email' href='mailto:order@example.com'>
						order@example.com
					</a>
				</p>
				<Link href={'/'}>
					<button type='button' className='my-4 text-white bg-[#e50914] py-2 px-5 rounded w-auto' width='300px'>
						Continue Shopping
					</button>
				</Link>
				
			</div>
			<div className=' w-[800px] h-[300px]  md:w-[100vw]'>
					<Image src={successImage} layout='responsive' />
			</div>
		</div>
	);
}

export default Success;
