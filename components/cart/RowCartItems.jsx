import React from 'react';
import { useStateContext } from '~/context/StateContext';
import { useRouter } from 'next/router';
import request from '~/helper/request';
import Image from 'next/image';
import defaultImage from '~/assets/default-image.png';
import { Product, HeadTitile, NoRecord } from '~/components';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

function RowCartItems() {
	const { decQty, incQty, qty, onAdd } = useStateContext();

	return (
		<div className='flex flex-row'>
			<div className='w-[100px] h-[100px] rounded-sm'>
				<Image src={defaultImage} width={100} height={100} layout='responsive' />
			</div>
			<div className='flex flex-col w-full px-6'>
				<h4 className='font-medium text-[16px] mt-1 text-[#324d67]'>
					Apple EarPods Headphones with Lightning Connector
				</h4>
				<div className='flex gap-5 mt-5 items-center w-full'>
					<div className='flex flex-row items-center justify-between  w-full'>
						<div className='flex flex-row space-x-3 items-center juce'>
							<div className='border-1 border-gray-700 flex  rounded-xl'>
								<span
									className='text-base py-1 px-3 border-r-1 border-gray-700 text-[#f02d34] cursor-pointer hover:bg-[#f02d34]/10 rounded-l-sm'
									onClick={decQty}
								>
									<AiOutlineMinus />
								</span>
								<span className='py-1 px-3 border-r-1 border-gray-700 text-xs'>{qty}</span>
								<span
									className='text-base py-1 px-3 plus text-[#31a831]  cursor-pointer hover:bg-[#31a831]/10 rounded-r-sm'
									onClick={incQty}
								>
									<AiOutlinePlus />
								</span>
							</div>
							<button
								type='button'
								className={`rounded-full bg-black/20 text-xl cursor-pointer outline-none 
								hover:shadow-md transition-all duration-500 ease-in-out hover:bg-black/40 w-[26px] h-[26px]`}
								// onClick={onClick}
							>
								<MdDelete className='text-red-600 m-auto' />
							</button>
						</div>
						<h3 className='text-[16px] font-bold'>100$ </h3>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RowCartItems;
