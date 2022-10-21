import React from 'react';
import Link from 'next/link';

function RowLinkAndSecurity({ icon, title, desc, link = '' }) {
	return (
		<div className='flex flex-row items-center space-x-1'>
			<div className='flex-none w-14 flex items-center justify-center'>
				<div className='w-[25px] h-[25px] bg-white rounded-full border-2  border-black flex items-center justify-center p-1'>
					{icon}
				</div>
			</div>
			<div className='flex flex-col flex-auto  text-[14px] '>
				<h4 className='font-medium'>{title}</h4>
				{desc && <span className='flex-wrap'>{desc}</span>}
			</div>
			<Link href={link}>
				<button className='flex-none  border-1 border-[#0b74e5] text-[14px] px-2 py-1 text-[#0b74e5] font-semibold'>
					update
				</button>
			</Link>
		</div>
	);
}

export default RowLinkAndSecurity;
