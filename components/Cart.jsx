import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '~/context/StateContext';
import { urlFor } from '~/lib/client';
import getStripe from '~/lib/getStripe';

function Cart() {
	const cartRef = useRef();
	const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();

	const handleCheckout = async () => {
		const stripe = await getStripe();

		const response = await fetch('/api/stripe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cartItems),
		});

		if (response.statusCode === 500) return;

		const data = await response.json();

		toast.loading('Redirecting~.');

		stripe.redirectToCheckout({ sessionId: data.id });
	};

	return (
		<div className='w-screen h-screen bg-black/50 fixed right-0 top-0 duration-1000 ease-in-out z-10' ref={cartRef}>
			<div className='h-screen w-[600px] bg-white float-right py-10 px-2'>
				<button
					type='button'
					className='flex items-center text-[18px] font-medium cursor-pointer gap-[2px] ml-[10px] border-none bg-transparent md:mt-[35px]'
					onClick={() => setShowCart(false)}
				>
					<AiOutlineLeft />
					<span className='ml-3'>Your Cart</span>
					<span className='ml-3 text-[#f02d34]'>({totalQuantities} items)</span>
				</button>
				{cartItems.length < 1 && (
					<div className='flex flex-col m-[40px] text-center justify-center  items-center'>
						<AiOutlineShopping size={150} />
						<h3>Your shopping bag is empty</h3>
						<Link href={'/'}>
							<button type='button' onClick={() => setShowCart(false)} className='w-400 m-auto'>
								Continue Shopping
							</button>
						</Link>
					</div>
				)}

				<div className='mt-[15px] overflow-auto max-h-[70vh] py-5 px-3'>
					{cartItems.length >= 1 &&
						cartItems.map((item, index) => (
							<div className='flex gap-7 p-5' key={item._id}>
								<img src={urlFor(item?.image[0])} alt='' className='w-[120px] h-[120px] rounded-[15px] bg-[#ebebeb]' />
								<div className=''>
									<div className='flex justify-between items-center w-[350px] text-[#324d67] font-medium'>
										<h5 className='text-[24px] text-[#324d67]'>{item.name}</h5>
										<h4 className='text-[20px] text-black'>${item.price}</h4>
									</div>
									<div className='flex mb-0 mt-[40px]'>
										<p className='border-1 rounded-xl border-gray-700 flex flex-row mt-1 '>
											<span
												className='text-base py-1 px-3 border-r-1 border-gray-700 text-[#f02d34] cursor-pointer hover:bg-black/10'
												onClick={() => toggleCartItemQuantity(item._id, 'dec')}
											>
												<AiOutlineMinus />
											</span>
											<span className='py-1 px-3 border-r-1 border-gray-700 text-xs'>{item.quantity}</span>
											<span
												className='text-base py-1 px-3 plus text-[#31a831] border-gray-700 cursor-pointer hover:bg-black/10'
												onClick={() => toggleCartItemQuantity(item._id, 'inc')}
											>
												<AiOutlinePlus />
											</span>
										</p>

										<button
											type='button'
											className='text-[24px] text-[#f02d34] cursor-pointer bg-transparent border-none'
											onClick={() => onRemove(item)}
										>
											<TiDelete />
										</button>
									</div>
								</div>
							</div>
						))}
				</div>
				{cartItems.length >= 1 && (
					<div className='absolute bottom-3 w-[600px] py-[30px] px-[65px]'>
						<div className='flex justify-between font-medium mb-2'>
							<h3 className='text-[22px] text-[#324d67]'>Subtotal:</h3>
							<h3 className='text-[22px] text-black'>${totalPrice}</h3>
						</div>
						<div className='flex w-full'>
							<button
								type='button'
								className='w-full py-[10px] px-[12px] rounded-[15px] border-none text-[20px] mt-[10px] uppercase bg-[#f02d34] 
								text-white cursor-pointer scale-100 duration-500 ease-linear hover:scale-105 md:w-[300px] m-auto'
								onClick={handleCheckout}
							>
								Payment with Stripe
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Cart;
