import React from 'react';

function RowLinkAndSecurity({ icon, title, desc, handleUpdate }) {
	return (
		<div className='flex flex-row items-center space-x-3'>
			<div className='flex-none flex items-center justify-center'>
				<div className='w-[25px] h-[25px] bg-white rounded-full border-2  border-black flex items-center justify-center p-1'>
					{icon}
				</div>
			</div>
			<div className='flex flex-col flex-auto text-[14px]'>
				<h4 className='font-medium'>{title}</h4>
				{desc && <span className=''>{desc}</span>}
			</div>
			<button className='flex-none border-1 border-[#0b74e5] rounded-[4px] text-[14px] px-1 text-[#0b74e5] font-extralight'>
				update
			</button>
		</div>
	);
}

export default RowLinkAndSecurity;
