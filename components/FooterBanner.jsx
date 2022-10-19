import Link from 'next/link';
import Image from 'next/image';
import fallbackImage from '~/assets/default-image.png';
import { localeTime } from '../helper/formatTime';

function FooterBanner({ footerBanner }) {
	return (
		<div
			className='py-[100px] px-[40px] bg-[#f02d34] rounded-[5px] relative h-400 leading-none text-white w-full mt-[120px] md:rounded-none
			sm:py-[40px] sm:px-[20px]'
		>
			<div className='flex justify-between xl:flex-col '>
				<div className='lg:space-y-3 ml-[18px] sm:m-0 sm:space-y-2'>
					<p className=' lg:m-0 sm:text-[14px]'>{footerBanner?.discount}</p>
					<h3 className='text-[80px] lg:text-[60px] md:text-[40px] sm:text-[24px] font-black lg:m-0'>
						{footerBanner?.largeText1}
					</h3>
					<h3 className='text-[80px] lg:text-[60px] md:text-[40px] sm:text-[24px] font-black lg:m-0'>
						{footerBanner?.largeText2}
					</h3>
					<p className=' font-bold lg:m-0'>
						{footerBanner?.saleTime ? localeTime(footerBanner?.saleTime, 'dd/MM/yyyy') : ''}
					</p>
				</div>
				<div
					className='lg:space-y-3 pt-3 lg:flex-row  
					lg:items-center lg:m-0 sm:space-y-2'
				>
					<div className='xl:m-[18px] sm:m-0 space-y-2'>
						<p className='text-[18px] sm:text-[12px]'>{footerBanner?.smallText}</p>
						<h3 className='font-extrabold text-[60px] md:text-[40px] sm:text-[24px]'>{footerBanner?.midText}</h3>
						<p className='text-[18px] sm:text-[12px]'>{footerBanner?.desc}</p>
					</div>
					<Link href={`/product/${footerBanner?.product}`}>
						<button
							type='button'
							className='xl:m-[18px] sm:m-0 rounded-[5px] py-[10px] px-[16px] bg-white text-[#f02d34] border-none mt-[40px] text-[18px] font-medium cursor-pointer 
							sm:mt-[20px] sm:py-[4px] sm:px-[8px] sm:text-[14px] sm:font-bold'
						>
							{footerBanner?.buttonText}
						</button>
					</Link>
				</div>
				<div className='absolute top-[-20%] left-[37%] w-[500px] h-[450px]  lg:w-[60%] sm:left[52%] md:w-[45vw] md:h-[40vw] 2xl:left-[40vw]'>
					<Image src={footerBanner?.image || fallbackImage} layout='fill' />
				</div>
			</div>
		</div>
	);
}

export default FooterBanner;
