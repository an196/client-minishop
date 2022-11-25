
import {  NoRecord, RowCartItems } from '../components';
import { Layout2 } from '../layouts';
import { useStateContext } from '../context/StateContext';
import getStripe from '../lib/getStripe';
import {toast} from 'react-toastify'
import requiredauth from '../features/auth/requiredauth';
import { useEffect } from 'react';

function cart() {
	const { totalPrice, totalQuantities, cartItems, toggleCartItemQuantity, onRemove, onPayment, setShowCart } = useStateContext();

	const handleCheckout = async () => {
		onPayment();
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

		toast.loading('Redirecting...');

		stripe.redirectToCheckout({ sessionId: data.id });
	};

	useEffect(()=> {
		setShowCart(false);
	},[])
	return (
		<>
			{cartItems.length > 0 ? (
				<div className='flex flex-col max-w-[800px] justify-center m-auto md:pb-0 bg-slate-200 rounded-md md:w-[100vw]'>
					<h4 className='text-[#324d67] text-[15px]  font-bold mt-4 pl-8'>Your cart: 
						<span className='text-[#f02d34]'>({totalQuantities} items) </span>
					</h4>
					<div className='bg-slate-100 w-[700px] p-8  mt-4 md:w-[100vw] space-y-4'>
						{cartItems.map((item) => (
							<RowCartItems
								key={item._id}
								item={item}
								toggleCartItemQuantity={toggleCartItemQuantity}
								onRemove={onRemove}
							/>
						))}
					</div>
					<h4 className='text-[#324d67] text-[16px] font-extrabold mt-4 pl-8'>Total: {totalPrice}$</h4>
					<div className='flex items-center justify-center w-full'>
						<button
							className='bg-[#f02d34] text-white font-[14px] rounded-[4px] py-1 px-4 mb-6 hover:scale-110 duration-300 
							ease-linear'
							onClick={handleCheckout}
						>
							Payment
						</button>
					</div>
				</div>
			) : (
				<div className='flex flex-col items-center justify-center mt-2'>
					<NoRecord width={200} height={200} des={'You have not added any product yet! Please choose item.'} />
				</div>
			)}
		</>
	);
}

cart.getLayout = function getLayout(page) {
	return <Layout2>{page}</Layout2>;
};

export default requiredauth(cart);
