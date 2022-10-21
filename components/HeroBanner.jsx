import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import fallbackImage from '../assets/default-image.png';

function HeroBanner({ heroBanner }) {
	return (
		<div className='py-[100px] px-[40px] bg-[#dcdcdc] rounded-[15px] z-0 relative h-[500px] leading-[0.9] w-full
			md:h-[400px] md:rounded-none sm:py-[40px] sm:px-[20px] sm:h-[320px] '
		>
			<div>
				<p className='text-[20px]'>{heroBanner?.smallText}</p>
				<h3 className='text-[4rem] mt-[4px] md:font-extrabold md:text-[40px] sm:text-[24px] md:ml-1 '>{heroBanner?.midText}</h3>
				<h1 className='text-white text-[10em] lg:text-[140px] sm:text-[80px] uppercase'>{heroBanner?.largeText1}</h1>
				<div className='absolute top-[0%] right-[20%] w-[500px] h-[450px] md:w-[45vw] md:h-[40vw]  lg:right-[0%]
					'
				>
					<Image src={heroBanner?.item?.image[0] || fallbackImage} width={500} height={450} alt='headphones' layout='responsive' />
				</div>

				<div>
					<Link href={`/product/${heroBanner?.item._id}`}>
						<button type='button'
                            className='rounded-[5px] py-[10px] px-[16px] bg-[#f02d34] text-white border-none mt-[40px] 
                            text-[18px] font-medium cursor-pointer  sm:text-[14px]'
                        >
                           {heroBanner?.buttonText}
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
