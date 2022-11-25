import React, { useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { runFireworks } from '../lib/utils';
import successImage from '../assets/high-five.jpg';
import Image from 'next/image';
import { selectCurrentUser } from '../features/auth/authSlice';
import { usePostOrderMutation } from '../features/order/orderApiSlice';
import { useSelector  } from 'react-redux';

function Success() {
	const userInfo = useSelector(selectCurrentUser);

	const [postOrder] = usePostOrderMutation();

	

	const getOrderSave = () => {
		const cartItems = JSON.parse(localStorage.getItem('cartItems'));
		const totalPrice = localStorage.getItem('totalPrice');
		const totalQuantities = localStorage.getItem('totalQuantities');

		if (userInfo && totalQuantities > 0) {
			const order = {
				orderID: 1,
				customerID: userInfo?.customerID,
				customerName: userInfo?.username,
				totalAmount: totalQuantities,
				details: [...cartItems],
				totalPayment: totalPrice,
				date: new Date(),
			};
			postOrder(order)
				.unwrap()
				.then((res) => {
					runFireworks();
				})
				.catch((err) => console.log(err));
		}
	};

	useEffect(() => {
		getOrderSave();
	}, []);

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

export default requiredAuth(Success);
