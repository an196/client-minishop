import { BsArrowRight } from 'react-icons/bs';
import Image from 'next/image';
import laptop from '~/assets/laptop.jpg';
import smartphone from '~/assets/smartphone.jpg';
import smartwatch from '~/assets/smartwatch.jpg';
import accessory from '~/assets/accessory.jpg';

const images = [laptop, smartphone, smartwatch, accessory];

function OrtherCategory() {
	return (
		<div className=''>
			<div className='text-center my-[40px] mx-0 text-[#324d67]'>
				<h2 className='text-[40px] font-extrabold md:text-[32px] sm:text-[24px] ssm:text-[18px]'>Category</h2>
				<p className='text-[16px] font-extralight'>Speakers of many variations</p>
			</div>

			<div className='flex gap-4'>
				{images.map((image) => (
					<div className='relative group w-[25%] h-[340px] rounded-md overflow-hidden'>
						<Image src={image} alt='dsd' layout='fill' objectFit='center' />
						<div className='absolute w-[100%] h-[340px] bg-[#3d3d3d]/60 !z-10 '></div>
						<div className='absolute flex text-center justify-center items-center w-[100%] h-[100%] bg-white/10 !z-20 opacity-0 hover:opacity-100  '>
							<button className='py-2 px-4 bg-white rounded-full flex  items-center space-x-1 hover:scale-105 !z-30'>
								<div className='rounded-full text-black'> View</div>
								<BsArrowRight />
							</button>
						</div>
					</div>
				))}
			</div>
			
		</div>
	);
}

export default OrtherCategory;
