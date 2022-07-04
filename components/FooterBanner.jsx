import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../lib/client';
import fallbackImage from '~/assets/default-image.png';

function FooterBanner({ footerBanner }) {
	return (
		<div className='py-[100px] px-[40px] bg-[#f02d34] rounded-[15px] relative h-400 leading-none text-white w-full mt-[120px]'>
			<div className='flex justify-between'>
				<div className=''>
					<p className='m-[18px]'>{footerBanner?.discount}</p>
					<h3 className='text-[80px] font-black ml-[25px]'>{footerBanner?.largeText1}</h3>
					<h3 className='text-[80px] font-black ml-[25px]'>{footerBanner?.largeText2}</h3>
					<p className='m-[18px]'>{footerBanner?.saleTime}</p>
				</div>
				<div className=''>
					<p className='text-[18px]'>{footerBanner?.smallText}</p>
					<h3 className='font-extrabold text-[60px]'>{footerBanner?.midText}</h3>
					<p className='text-[18px]'>{footerBanner?.desc}</p>
					<Link href={`/product/${footerBanner?.product}`}>
						<button
							type='button'
							className='rounded-[15px] py-[10px] px-[16px] bg-white text-[#f02d34] border-none mt-[40px] text-[18px] font-medium cursor-pointer'
						>
							{footerBanner?.buttonText}
						</button>
					</Link>
				</div>
				<div className='absolute top-[-20%] left-[40%] w-[500px] h-[450px]'>
					<Image src={footerBanner?.image || fallbackImage} layout='fill' />
				</div>
			</div>
		</div>
	);
}

export default FooterBanner;
