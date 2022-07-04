import React from 'react';
import backgroundImg from '~/assets/headphone.jpg';
import { useForm } from 'react-hook-form';
import { SiShopware } from 'react-icons/si';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setCredentials } from '~/features/auth/authSlice';
import { useLoginMutation } from '~/features/auth/authApiSlice';
import Image from 'next/image';
import toast from 'react-hot-toast';

function Login() {
	const router = useRouter();
	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = async ({ email, password }) => {
		try {
			const userData = await login({ email, password }).unwrap();
			dispatch(setCredentials({ ...userData, email }));
			toast.success('login successfully');
			// navigate('/dashboard');
		} catch (err) {
			if (!err?.originalStatus) {
				// isLoading: true until timeout occurs
				toast.error('No Server Response');
			} else if (err.originalStatus === 400) {
				toast.error('Missing Username or Password');
			} else if (err.originalStatus === 401) {
				toast.error('Unauthorized');
			} else {
				toast.error('Login Failed');
			}
			// errRef.current.focus();
		}
	};

	return (
		<div className='flex justify-start item-center flex-col h-screen'>
			<div className='relative md:w-full h-full justify-items-center flex '>
				<div className='absolute overflow-hidden object-cover w-screen h-screen opacity-90 -z-10'>
					<Image blurDataURL={backgroundImg} width={500} height={500} layout='intrinsic' />
				</div>
				<form
					className='relative space-y-8 rounded bg-white/75 py-10 px-6 md:mt-0 md:max-w-md w-[400px]  md:px-14 flex flex-col items-center'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className='flex items-center space-x-3'>
						<SiShopware className='w-10 h-10 cursor-pointer object-contain md:left-10 md:top-6 z-10' />
						<span className='font-semibold text-xl'>MiniShop</span>
					</div>
					<div className='p-5 flex flex-col items-center space-y-10'>
						<h1 className='text-4xl font-semibold'>Sign in</h1>
						<div className='space-y-4'>
							<label className='inline-block w-full'>
								<input
									type='text'
									placeholder='Email'
									className='input w-full h-10 p-3 outline-none text-md rounded-sm'
									{...register('email', { required: true })}
								/>
								{errors.email && (
									<p className='p-1 text-[13px] font-light  text-orange-500'>Please enter a valid email.</p>
								)}
							</label>
							<label className='inline-block w-full'>
								<input
									type='password'
									placeholder='Password'
									className='input w-full h-10 p-3 outline-none text-md rounded-sm'
									{...register('password', { required: true })}
								/>
								{errors.password && (
									<p className='p-1 text-[13px] font-light  text-orange-500'>
										Your password must contain between 4 and 60 characters.
									</p>
								)}
							</label>
						</div>

						<button type='submit' className='w-full rounded bg-[#e50914] py-3 font-semibold text-medium text-black'>
							Sign In
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
				</form>
			</div>
		</div>
	);
}

Login.getLayout = function getLayout(page) {
	return <>{page}</>;
};

export default Login;
