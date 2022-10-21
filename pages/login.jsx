import React from 'react';
import backgroundImg from '../assets/headphone.jpg';
import { useForm } from 'react-hook-form';
import { SiShopware } from 'react-icons/si';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setCredentials } from '../features/auth/authSlice';
import { useLoginMutation } from '../features/auth/authApiSlice';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import { WarningText } from '../components';
import  Head from 'next/head'
import TitleLayout from '../layouts/TitleLayout';
 
function Login() {
	const router = useRouter();
	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: 'lngocan1996@gmail.com',
			password: '11111111',
		},
	});

	const onSubmit = async ({ email, password }) => {
		try {
			const userData = await login({ email, password }).unwrap();
			dispatch(setCredentials({ ...userData, email }));
			router.replace('/');
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
		<div className='flex relative justify-start item-center flex-row w-screen h-screen'>
			{/* <ToastContainer/> */}
			<form
				className='w-[600px] relative space-y-8 rounded bg-white py-10 px-6 md:mt-0 md:px-14 flex flex-col items-center
				md:w-screen duration-100 ease-out ssm:px-4 ssm:py-8 bg-opacity-90' 
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='flex items-center space-x-3'>
					<SiShopware className='w-10 h-10 cursor-pointer object-contain md:left-10 md:top-6 z-10' />
					<span className='font-semibold text-xl'>MiniShop</span>
				</div>
				<div className='p-5 flex flex-col items-center space-y-10'>
					<h1 className='text-4xl font-semibold'>Sign in</h1>
					<div className='space-y-4'>
						<div>
							<h4 className='font-normal'>Email</h4>
							<label className='inline-block w-full'>
								<input
									type='text'
									placeholder='Email'
									// className=' w-[320px] h-10 p-3 border-2 text-md rounded-sm'
									className='w-[320px] h-10 p-3 px-6 text-md bg-slate-200 rounded outline-none'
									{...register('email', { required: true })}
								/>
								{errors.email && <WarningText message={'Please enter a valid email.'} />}
							</label>
						</div>
						<div>
							<h4 className='font-normal'>Password</h4>
							<label className='inline-block w-full'>
								<input
									type='password'
									placeholder='Password'
									// className='w-full h-10 p-3 text-md border-2 rounded-sm'
									className='w-[320px] h-10 p-3 px-6 text-md bg-slate-200 rounded outline-none'
									{...register('password', { required: true })}
								/>
								{errors.password && <WarningText message={'Your password must contain between 4 and 60 characters.'} />}
							</label>
						</div>
					</div>

					<button type='submit' className='w-full rounded bg-[#e50914] py-3 font-semibold text-medium text-white'>
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
				<div
					className='flex text-sm float-left text-blue-900 items-center cursor-pointer'
					onClick={() => router.replace('/register')}
				>
					<div></div>
					<p className='underline'>Signup</p>
				</div>
			</form>
			<div className='absolute w-full h-full opacity-90 -z-20'>
				<Image src={backgroundImg} layout='fill' />
			</div>
		</div>
	);
}

Login.getLayout = function getLayout(page) {
	return <TitleLayout>{page}</TitleLayout>;
};

export default Login;
