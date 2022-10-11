import React from 'react';
import image from '~/assets/oop.png';
import Image from 'next/image';

function NoRecord({ width, height }) {
	return (
		<div className='text-center'>
			<div className={`w-[${width}px] h-[${height}px]`}>
				<Image src={image} width={width} height={height} layout='responsive' />
			</div>
			<h3 className='text-blue-600'>No products found!</h3>
		</div>
	);
}

export default NoRecord;
