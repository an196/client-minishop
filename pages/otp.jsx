import React, { useState, useEffect } from 'react';
import { Layout } from '~/components';
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useSendOTPtoEmailMutation, useCompareOTPbyEmailMutation } from '~/features/otp/otpApiSlice';
import { selectCurrentEmail, selectCurrentAction } from '~/features/otp/otpSlice';
import { setCredentials } from '~/features/auth/authSlice';
import { selectCurrentUser } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useMemo } from 'react';

const MAX_DIGITS_OTP = 6;
const COUNT_DOWN = 60;

function otp() {
	const [state, setState] = useState({ otp: '' });
	const [countdown, setCountdown] = useState(COUNT_DOWN);

	const [sendOTPtoEmail] = useSendOTPtoEmailMutation();
	const [compareOTPbyEmail] = useCompareOTPbyEmailMutation();

	const currentEmail = useSelector(selectCurrentEmail);
	const currentAction = useSelector(selectCurrentAction);
	const userInfo = useSelector(selectCurrentUser);

	//router
	const router = useRouter();
	//dispatch
	const dispatch = useDispatch();

	const handleChange = (otp) => {
		if (otp.length <= MAX_DIGITS_OTP) {
			setState({ otp });
		}
		if (countdown > 0 && otp.length === MAX_DIGITS_OTP) {
			const data = {
				_id: userInfo?._id,
				email: currentEmail,
				otp,
			};
			compareOTPbyEmail(data)
				.unwrap()
				.then((res) => {
					toast(res);
					const newUserInfo = {
						...userInfo,
						email: currentEmail,
					};
					dispatch(setCredentials(newUserInfo));
					router.replace('/');
				})
				.catch((error) => toast.error(error));
		}
	};

	const doActionOTP = () => {
		switch (currentAction) {
			case 'changePassword':
				console.log('changePassword');
				return;
			case 'changeEmail':
				doSendOTPtoEmail();
				return;
			default:
				console.log('not action suitable');
				return;
		}
	};

	const doSendOTPtoEmail = () => {
		sendOTPtoEmail({ _id: userInfo?._id, toEmail: currentEmail })
			.unwrap()
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.log(err));
	};

	//init time out to fill otp
	useEffect(() => {
		const fillTime = countdown > 0 && setTimeout(() => setCountdown(countdown - 1), 1000);
		return () => clearTimeout(fillTime);
	}, [countdown]);

	const initValue = useMemo(() => {
		if (currentAction && currentEmail) {
			doActionOTP();
		}
	}, []);

	return (
		<div className='flex w-[500px] justify-center m-auto bg-slate-200 rounded-md md:w-[100vw]'>
			<div className='flex flex-col items-center'>
				<h1 className='text-[#324d67] text-[28px] font-extrabold mt-4'>Fill OTP</h1>
				<div
					className='bg-slate-100  w-[400px] mb-10 p-10 md:mb-0 flex flex-col justify-center items-center mt-4 
					md:w-[100vw] space-y-3'
				>
					{countdown > 0 ? <p className=''>Time left: {countdown}s</p> : <p className='text-red-600'>Time out!</p>}
					<OtpInput value={state.otp} onChange={handleChange} numInputs={MAX_DIGITS_OTP} separator={<span>-</span>} />
				</div>
			</div>
		</div>
	);
}

otp.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default otp;
