import React from 'react';
import { FcAddImage } from 'react-icons/fc';

function DropImageArea() {
	return (
		<label className='mt-1 flex justify-center px-6 pt-5 pb-6 h-full items-center bg-slate-300  rounded-md cursor-pointer'>
			<div className='space-y-1 text-center items-center flex flex-col text-indigo-600'>
				<FcAddImage className='h-10 w-10' />
				<div className='flex text-sm text-gray-600 items-center flex-col'>
					<label className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 px-2 py-1'>
						<span>Upload a file</span>
					</label>
					<p className='pl-1'>or drag and drop</p>
				</div>
				<p className='text-xs text-gray-500'>PNG, JPG, GIF</p>
			</div>
		</label>
	);
}

export default DropImageArea;
