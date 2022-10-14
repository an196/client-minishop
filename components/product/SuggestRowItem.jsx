import { products } from '~/data/dummy.data.js';
import { Product } from '~/components';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import { useRef, useState } from 'react';

function SuggestRowItem({ title }) {
	const rowRef = useRef();
	const [isMoved, setIsMoved] = useState(false);

	const handleClick = (direction) => {
		setIsMoved(true);
		if (rowRef.current) {
			const { scrollLeft, clientWidth } = rowRef.current;

			const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;

			rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
		}
	};

	return (
		<>
			<div className='space-y-2 md:space-y-0.5 w-[100%] xl:w-[100vw] px-7 mt-2 md:mt-0'>
				<h2 className='w-56 cursor-pointer text-[24px]  md:text-[16px] font-semibold text-[#324d67]/90 trainsition duration-200 '>
					{title || 'Headphone'}
				</h2>
				<div className='group relative'>
					<IoIosArrowDropleftCircle
						className={`absolute -top-12 bottom-0 -left-16 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 text-slate-400
                    transition hover:scale-125 hover:text-[#324d67] group-hover:opacity-100 xl:left-2 ${!isMoved && 'hidden'}`}
						onClick={() => handleClick('left')}
					/>
					<div
						className='group space-x-4 md:space-x-1 items-stretch  scrollbar-hide text-[16px] overflow-x-scroll md:p-2 
						sm:text-[12px] mt-[20px] w-full flex md:mt-2'
						ref={rowRef}
					>
						{products?.map((item) => (
							<Product key={item._id} product={item} minWidth={'200px'} />
						))}
					</div>

					<IoIosArrowDroprightCircle
						className='absolute -top-12  bottom-0 -right-16 z-40 m-auto h-9 w-9 cursor-pointer opacity-1  text-slate-400
                    		transition hover:scale-125 group-hover:opacity-100 hover:text-[#324d67] xl:right-2'
						onClick={() => handleClick('right')}
					/>
				</div>
			</div>
		</>
	);
}

export default SuggestRowItem;
