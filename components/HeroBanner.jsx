import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '~/lib/client';
import fallbackImage from '~/assets/default-image.png';

function HeroBanner({ heroBanner }) {
	return (
		<div className='py-[100px] px-[40px] bg-[#dcdcdc] rounded-[15px] relative h-[500px] leading-[0.9] w-full'>
			<div>
				<p className='text-[20px]'>{heroBanner?.smallText}</p>
				<h3 className='text-[4rem] mt-[4px]'>{heroBanner?.midText}</h3>
				<h1 className='text-white text-[10em] ml-[-20px] uppercase'>{heroBanner?.largeText1}</h1>
				<div className='absolute top-[0%] right-[20%] w-[500px] h-[450px] '>
					<Image src={heroBanner?.image || fallbackImage} alt='headphones' layout='fill' />
				</div>

				<div>
					<Link href={`/product/${heroBanner?.product}`}>
						<button type='button'
                            className='rounded-[15px] py-[10px] px-[16px] bg-[#f02d34] text-white border-none mt-[40px] 
                            text-[18px] font-medium cursor-pointer z-[1000] '
                        >
                            BUTTON TEXT
                        </button>
					</Link>
					<div className='absolute right-[10%] bottom-[5%] width-[300px] leading-[1.3] flex flex-col text-[#324d67]'>
						<h5 className='mb-[12px] font-bold text-[16px] self-end'>Description</h5>
						<p className='font-thin text-[#5f5f5f] text-end'>{heroBanner?.desc}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HeroBanner;
