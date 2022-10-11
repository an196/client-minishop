import React, { useState } from 'react';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Layout } from '~/components';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setPasswordRechange, setAction } from '~/features/otp/otpSlice';
import { useRouter } from 'next/router';

function changePassword() {
	const [showPassword, setShowPassword] = useState(false);
	const [newPassword, setNewPassword] = useState('11111111');

	const dispatch = useDispatch();
	const router = useRouter();

	const handleUpdate = () => {
		dispatch(setAction('changePassword'));
		dispatch(setPasswordRechange(newPassword));
		router.replace('/otp');
	};

	const handleChange = (e) => {
		setNewPassword(e.target.value);
	}
	
	return (
		<div className='flex w-[500px] justify-center m-auto bg-slate-200 rounded-md md:w-[100vw]'>
			<div className='flex flex-col items-center'>
				<h1 className='text-[#324d67] text-[28px] font-extrabold mt-4'>Change Password</h1>
				<div className='bg-slate-100  w-[400px] mb-10 p-10 md:mb-0 flex flex-col justify-center items-center mt-4 md:w-[100vw] space-y-3'>
					<h4 className='font-medium text-[18px] w-full'>New Password</h4>
					<div className='flex flex-row justify-center items-center w-full  outline-blue-400 divide-x bg-white divide-blue-200 border-gray-300 border-1 pr-2 py-1'>
						<div className='p-2'>
							<RiLockPasswordFill />
						</div>
						<input
							type={!showPassword ? `password` : 'text'}
							className='w-full outline-none px-2 '
							value={newPassword}
							onChange={handleChange}
						/>
						<div className='p-2 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
							{!showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
						</div>
					</div>

					<div className='flex items-center justify-center w-full'>
						<button
							className='bg-[#0b74e5] text-white font-[14px] rounded-[4px] py-1 px-2 w-full'
							onClick={handleUpdate}
						>
							Update
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

changePassword.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default changePassword;
