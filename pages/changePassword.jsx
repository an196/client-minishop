import React from 'react'

import { Layout } from '~/components';

function changePassword() {
  return (
    <div className='flex w-[500px] justify-center m-auto bg-slate-200 rounded-md md:w-[100vw]'>
			<div className='flex flex-col items-center'>
				<h1 className='text-[#324d67] text-[28px] font-extrabold mt-4'>Change Password</h1>
				<div className='bg-slate-100  w-[400px] mb-10 p-10 md:mb-0 flex flex-col justify-center items-center mt-4 md:w-[100vw] space-y-3'>
					<h4 className='font-medium text-[18px] w-full'>Password</h4>
					<input type='text' className='w-full outline-blue-400 border-gray-300 border-1 px-3 py-1' />
					<div className='flex items-center justify-center w-full'>
						<button className='bg-[#0b74e5] text-white font-[14px] rounded-[4px] py-1 px-2 w-full'>Update</button>
					</div>
				</div>
			</div>
		</div>
  )
}

changePassword.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default changePassword;