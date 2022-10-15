import React, { useState, useEffect } from 'react';
import { Product, HeadTitile, NoRecord, RowCartItems } from '~/components';
import { Layout } from '~/layouts';

function cart() {
	return (
		<div className='flex flex-col max-w-[800px] justify-center m-auto md:pb-0 bg-slate-200 rounded-md md:w-[100vw]'>
			<h4 className='text-[#324d67] text-[18px] font-extrabold mt-4 pl-8'>My cart</h4>
			<div className='bg-slate-100 w-[700px] p-8  mt-4 md:w-[100vw] space-y-4'>
				<RowCartItems />
				<RowCartItems />
				<RowCartItems />
				<RowCartItems />
			</div>
			<h4 className='text-[#324d67] text-[18px] font-extrabold mt-4 pl-8'>Total: 200$</h4>
			<div className='flex items-center justify-center w-full'>
				<button className='bg-[#0b74e5] text-white font-[14px] rounded-[4px] py-1 px-2 mb-6'>Payment</button>
			</div>
		</div>
	);
}

cart.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default cart;
