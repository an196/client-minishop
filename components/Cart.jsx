import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';
import { toast } from 'react-toastify';
import { useStateContext } from '~/context/StateContext';
import fallbackImage from '~/assets/default-image.png';
import getStripe from '~/lib/getStripe';
import { formatName } from '~/helper/formatProduct';
import { useRouter } from 'next/router';
import { selectCurrentToken } from '~/features/auth/authSlice';
import { useSelector} from 'react-redux';


function Cart() {
	const cartRef = useRef();
	const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove, onPayment } = useStateContext();
	const token = useSelector(selectCurrentToken);
	const router = useRouter();

	const handleCheckout = async () => {
		//router.replace('/success');
		if(token){
		onPayment();

		const stripe = await getStripe();
		const response = await fetch('/api/stripe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cartItems),
		});
		if (response.status === 500) {
			console.log('An error has occurred! Can not make payment');
				return;
		};
		const data = await response?.json();
		
		toast.loading('Redirecting~.');
		stripe.redirectToCheckout({ sessionId: data.id });
		}else{
			router.replace('/login');
			toast.warn('Please login to payment!');
		 }
	};

	return (
		<div
			className='w-screen h-screen bg-black/50 fixed right-0 top-0 duration-300 ease-in-out z-10000000'
			ref={cartRef}
		>
			<div className='h-screen w-[500px] bg-white float-right py-10 px-6 sm:w-full sm:px-6  sm:py-3'>
				<div className='flex flex-row justify-between items-center text-[16px]'>
					<div className='flex flex-row items-center font-medium space-x-1'>
						<button
							type='button'
							className='m-auto  cursor-pointer font-extrabold border-none bg-transparent '
							onClick={() => setShowCart(false)}
						>
							<AiOutlineLeft />
						</button>
						<span>Your Cart</span>
						<span className='text-[#f02d34]'>({totalQuantities} items)</span>
					</div>
					<Link href={'/cart'}>
						<span
							className=' text-black  cursor-pointer  px-[12px] py-[4px] bg-slate-300 rounded-full sm:py-[4px]
						hover:font-medium text-[12px]'
						>
							View full
						</span>
					</Link>
				</div>
				{cartItems.length < 1 && (
					<div className='flex flex-col m-[40px] text-center justify-center  items-center'>
						<AiOutlineShopping size={150} />
						<h3>Your shopping bag is empty</h3>
						<Link href={'/'}>
							<button
								type='button'
								onClick={() => setShowCart(false)}
								className='m-auto bg-[#f02d34] mt-4 flex py-2 px-5 rounded text-white'
							>
								Continue Shopping
							</button>
						</Link>
					</div>
				)}

				<div className='mt-[15px] overflow-auto py-5 sm:mt-0 space-y-3 '>
					{cartItems.length >= 1 &&
						cartItems.map((item, index) => (
							<div className='flex space-x-3' key={item._id}>
								<div className='w-[120px] h-[120px] sm:w-[80px] sm:h-[80px]'>
									<div className='w-[120px] h-[120px] sm:w-[80px] sm:h-[80px] rounded-[5px] bg-[#ebebeb] relative'>
										<Image src={item?.image[0] || fallbackImage} alt='product image' layout='fill' />
									</div>
								</div>
								<div className='w-full flex flex-col justify-between'>
									<div className='flex flex-row justify-between w-full text-[#324d67] font-medium'>
										<h5 className='text-[16px] text-[#324d67]'>{formatName(item?.name, 50)}</h5>
									</div>
									<div className='flex justify-between  items-center'>
										<div className='flex flex-row'>
											<p className='border-1 rounded-xl border-gray-700 flex flex-row '>
												<span
													className='text-base py-1 px-3 sm:py-0.5 border-r-1 border-gray-700 text-[#f02d34] cursor-pointer hover:bg-black/10 hsm:px-2'
													onClick={() => toggleCartItemQuantity(item._id, 'dec')}
												>
													<AiOutlineMinus />
												</span>
												<span className='py-1 px-3 border-r-1 sm:py-0.5 border-gray-700 font-medium text-[12px]'>
													{item.quantity}
												</span>
												<span
													className='text-base py-1 px-3 sm:py-0.5 plus text-[#31a831] border-gray-700 cursor-pointer hover:bg-black/10 hsm:px-2'
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
										<h4 className='text-[16px] text-black font-bold sm:text-[16px]'>${item.price}</h4>
									</div>
								</div>
							</div>
						))}
				</div>
				{cartItems.length >= 1 && (
					<div className='absolute bottom-3 w-[500px] py-[30px] p-7 right-0 sm:w-full sm:px-12 hsm:px-5'>
						<div className='flex justify-between font-medium mb-2 items-center'>
							<h3 className='text-[20px] text-[#324d67] font-semibold sm:text-[16px]'>Subtotal:</h3>
							<h3 className='text-[20px] text-black font-bold sm:text-[16px]'>${totalPrice}</h3>
						</div>
						<div className='flex w-full'>
							<button
								type='button'
								className='w-full py-[10px] px-[12px] rounded-[5px] border-none text-[20px] mt-[10px] uppercase bg-[#f02d34] 
								text-white cursor-pointer duration-300 ease-linear hover:bg-[#f02d34]/80 m-auto sm:text-[16px]'
								onClick={handleCheckout}
							>
								Payment
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Cart;
