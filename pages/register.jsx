import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { SiShopware } from 'react-icons/si';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { IoMdArrowRoundBack } from 'react-icons/io';
import backgroundImg from '~/assets/headphone.jpg';
import Image from 'next/image';
import { WarningText } from '~/components';
import { useDispatch } from 'react-redux';
import { useRegisterAccountMutation } from '~/features/register/registerSlice';
import toast from 'react-hot-toast';
import TitleLayout from '~/layouts/TitleLayout';

function register() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [registerAccount, { isLoading }] = useRegisterAccountMutation();
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		watch,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: 'Nirav Joshi 8',
			password: 'nirav8@gmail.com',
			email: 'nirav8@gmail.com',
		},
	});

	const validateInfomation = (username, password, email) => {
		let validate = true;
		if (username.length < 6) {
			validate = false;
			setError('username', {
				types: {
					minLength: 'Username at least 6 characters!',
				},
			});
		}
		if (password.length < 8) {
			validate = false;
			setError('password', {
				types: {
					minLength: 'Passowrd at least 8 characters!',
				},
			});
		}
		if (
			!email.match(
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			)
		) {
			validate = false;
			setError('email', {
				types: {
					type: 'Email not validate! Example is "email@gmail.com"',
				},
			});
		}

		return validate;
	};

	const onSubmit = ({ username, password, email }) => {
		if (validateInfomation(username, password, email)) {
			const registerInfo = {
				username,
				password,
				email,
			};
			
			registerAccount(registerInfo)
				.then((res) => {
                    if(res?.error?.originalStatus === 409 )
                        toast.error('Username or email has been existed!')
					else{
						if(res?.data?.success){
							router.replace('/registerSuccessful');
						}
					}
                })
				.catch((errors) => {
					toast.error('Error! Cant register account')
				});
		}
	};

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
									className='w-[320px] h-10 p-3 px-6 text-md bg-slate-200 rounded outline-none'
									{...register('username', { required: true })}
								/>
								{errors.username && <WarningText message={'Please enter a username.'} />}
								{errors.username?.types && <WarningText message={errors.username?.types?.minLength} />}
							</label>
						</div>
						<div>
							<h4 className='font-normal'>Email</h4>
							<label className='inline-block w-full'>
								<input
									type='text'
									placeholder='Email'
									className='w-[320px] h-10 p-3 px-6 text-md bg-slate-200 rounded outline-none'
									{...register('email', { required: true })}
								/>
								{errors.email && <WarningText message={errors?.email?.types?.type} />}
							</label>
						</div>
						<div>
							<h4 className='font-normal'>Password</h4>
							<label className='inline-block w-full'>
								<div className='flex justify-center items-center border-2 rounded-sm bg-slate-200'>
									<input
										type={!showPassword ? `password` : 'text'}
										placeholder='Password'
										className='w-full h-10 p-3 px-6 text-md bg-slate-200 rounded outline-none'
										{...register('password', { required: true })}
									/>

									<div className='p-2 cursor-pointer bg-slate-200' onClick={() => setShowPassword(!showPassword)}>
										{!showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
									</div>
								</div>
								{errors.password && <WarningText message={'Your password must at least 8 characters'} />}
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

register.getLayout = function getLayout(page) {
	return <TitleLayout>{page}</TitleLayout>;
};
export default register;
