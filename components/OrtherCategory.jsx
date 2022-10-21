import { BsArrowRight } from 'react-icons/bs';
import Image from 'next/image';
import earphone from '~/assets/earphone.jpg';
import headphone from '~/assets/headphone.jpg';
import accessory from '~/assets/accessory.jpg';
import smartwatch from '~/assets/smartwatch.jpg';
import HeadTitile from './HeadTitile';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const images = [
	{ src: smartwatch, lable: 'Watch' },
	{ src: headphone, lable: 'Headphone' },
	{ src: earphone, lable: 'Earphone' },
	{ src: accessory, lable: 'Accessories' },
];

function OrtherCategory({ categories }) {
	const router = useRouter();

	const slugCategories = () => {
		return images.map((image) => {
			const code = categories.find((category) => category.name === image.lable)?.code;
			return { ...image, code };
		});
	};

	let imagesPath;

	const handleClick = (image) => {
		if (imagesPath) {
			const code = imagesPath.filter((path) => path.lable === image.lable)[0].code;
			console.log('click',code)
			router.replace(`/category/${code}`);
		}
	};

	useEffect(() => {
		imagesPath = slugCategories();
	}, []);

	return (
		<div className='w-full'>
			<HeadTitile title={'Category'} subtitle={'Speakers of many variations'} />
			<div className='flex flex-wrap  justify-between sm:justify-evenly '>
				{images.map((image, _index) => (
					<div
						key={_index}
						className='relative w-[24%] h-[240px] lg:h-[23vw] sm:mt-4 sm:h-[30vw] sm:w-[45vw] rounded-md overflow-hidden'
					>
						<Image src={image.src} alt='dsd' layout='fill' objectFit='center' />
						<div className='absolute w-full h-[340px] md:h-[50vw]  bg-[#3d3d3d]/60 !z-10 '></div>

						<div
							className='absolute font-medium flex text-center justify-center items-center w-[100%] h-[100%] bg-white/10 !z-20 opacity-0 hover:opacity-100 
							duration-400 ease-linear'
						>
							<button
								className='py-2 px-4 bg-white rounded-full flex  items-center space-x-1 hover:scale-105 
									!z-30'
								onClick={() => handleClick(image)}
							>
								<div className='rounded-full text-black '> View</div>
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
