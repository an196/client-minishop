import { BsArrowRight } from 'react-icons/bs';
import Image from 'next/image';
import laptop from '~/assets/laptop.jpg';
import smartphone from '~/assets/smartphone.jpg';
import smartwatch from '~/assets/smartwatch.jpg';
import accessory from '~/assets/accessory.jpg';
import HeadTitile from './HeadTitile';

const images = [laptop, smartphone, smartwatch, accessory];

function OrtherCategory() {
	return (
		<div className='w-full'>
            <HeadTitile title={'Category'} subtitle={'Speakers of many variations'}/>
			<div className='flex gap-4 hlg:grid hlg:grid-cols-2 hlg:place-items-center sm:gap-1 m-1 sm:grid-cols-1 md:gap-1'>
				{images.map((image, _index) => (
					<div key={_index} className='relative w-[25%] h-[280px] hlg:w-full md:h-[40vw] lg:h-[25vw] sm:h-[50vw] rounded-md overflow-hidden'>
						<Image src={image} alt='dsd' layout='fill' objectFit='center'  />
						<div className='absolute w-full h-[340px] md:h-[50vw]  bg-[#3d3d3d]/60 !z-10 '></div>
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
