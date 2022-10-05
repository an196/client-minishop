import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { SiShopware } from 'react-icons/si';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { IoMdArrowRoundBack } from 'react-icons/io';
import backgroundImg from '~/assets/headphone.jpg';
import Image from 'next/image';

function register() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = () => {};

	return (
		<div className='flex relative justify-start item-center flex-row w-screen h-screen duration-300 ease-linear'>
			<form
				className='w-[600px] relative space-y-8 rounded bg-white py-10 px-6 md:mt-0 md:px-14 flex flex-col items-center
				md:w-screen duration-100 ease-out ssm:px-4 ssm:py-8'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='flex items-center space-x-3'>
					<SiShopware className='w-10 h-10 cursor-pointer object-contain md:left-10 md:top-6 z-10' />
					<span className='font-semibold text-xl'>MiniShop</span>
				</div>
				<div className='p-5 flex flex-col items-center space-y-10'>
					<h1 className='text-4xl font-semibold'>Sign up</h1>
					<div className='space-y-2'>
						<div>
							<h4 className='font-normal'>User name</h4>
							<label className='inline-block w-full'>
								<input
									type='text'
									placeholder='User name'
									className='w-[320px] h-10 p-3 border-2 text-md rounded-sm'
									{...register('username', { required: true })}
								/>
								{errors.username && (
									<p className='p-1 text-[13px] font-light  text-orange-500'>Please enter a username.</p>
								)}
							</label>
						</div>
						<div>
							<h4 className='font-normal'>Email</h4>
							<label className='inline-block w-full'>
								<input
									type='text'
									placeholder='Email'
									className='w-[320px] h-10 p-3 border-2 text-md rounded-sm'
									{...register('email', { required: true })}
								/>
								{errors.email && (
									<p className='p-1 text-[13px] font-light  text-orange-500'>Please enter a valid email.</p>
								)}
							</label>
						</div>
						<div>
							<h4 className='font-normal'>Password</h4>
							<label className='inline-block w-full'>
								<input
									type='password'
									placeholder='Password'
									className='w-full h-10 p-3 text-md border-2 rounded-sm'
									{...register('password', { required: true })}
								/>
								{errors.password && (
									<p className='p-1 text-[13px] font-light  text-orange-500'>
										Your password must contain between 4 and 60 characters.
									</p>
								)}
							</label>
						</div>
					</div>

					<button type='submit' className='w-full rounded bg-[#e50914] py-3 font-semibold text-medium text-white'>
						Sign Up
					</button>
				</div>
				<div
					className='flex text-sm float-left text-blue-900 items-center cursor-pointer'
					onClick={() => router.push('/')}
				>
					<div>
						<IoMdArrowRoundBack />
					</div>
					<p>Back to home page</p>
				</div>
				<div
					className='flex text-sm float-left text-blue-900 items-center cursor-pointer'
					onClick={() => router.replace('/login')}
				>
					<div></div>
					<p className='underline'>Signin</p>
				</div>
			</form>
			<div className='absolute w-full h-[100vh] opacity-90 -z-20'>
				<Image src={backgroundImg} layout='fill' />
			</div>
		</div>
	);
}

export default register;
