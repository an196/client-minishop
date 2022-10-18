import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout2 } from '~/layouts';
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import {
	useSendOTPtoEmailMutation,
	useCompareOTPbyEmailMutation,
	useSendOTPtoChangePasswordMutation,
	useSendAcceptToChangePasswordMutation,
} from '~/features/otp/otpApiSlice';
import { selectCurrentEmail, selectCurrentAction, selectPasswordRechange } from '~/features/otp/otpSlice';
import { setCredentials,selectCurrentUser , logOut } from '~/features/auth/authSlice';



const MAX_DIGITS_OTP = 6;
const COUNT_DOWN = 60;

function otp() {
	const [state, setState] = useState({ otp: '' });
	const [countdown, setCountdown] = useState(COUNT_DOWN);
	const [otpOrigin, setOtpOrigin] = useState();

	const [sendOTPtoEmail] = useSendOTPtoEmailMutation();
	const [compareOTPbyEmail] = useCompareOTPbyEmailMutation();
	const [sendOTPtoChangePassword] = useSendOTPtoChangePasswordMutation();
	const [sendAcceptToChangePassword] = useSendAcceptToChangePasswordMutation();

	const currentEmail = useSelector(selectCurrentEmail);
	const currentAction = useSelector(selectCurrentAction);
	const passwordRechange = useSelector(selectPasswordRechange);

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
			doCompareOTP(otp);
			// const data = {
			// 	_id: userInfo?._id,
			// 	email: currentEmail,
			// 	otp,
			// };
			// compareOTPbyEmail(data)
			// 	.unwrap()
			// 	.then((res) => {
			// 		toast(res);
			// 		const newUserInfo = {
			// 			...userInfo,
			// 			email: currentEmail,
			// 		};
			// 		dispatch(setCredentials(newUserInfo));
			// 		router.replace('/');
			// 	})
			// 	.catch((error) => toast.error(error));
		}
	};

	const doActionOTP = () => {
		switch (currentAction) {
			case 'changePassword':
				doSendOTPtoChangePassword();
				return;
			case 'changeEmail':
				doSendOTPtoChangeEmail();
				return;
			default:
				console.log('not action suitable');
				return;
		}
	};

	const doCompareOTP = (otp) => {
		switch (currentAction) {
			case 'changePassword':
				doCompareToChangePassword(otp);
				return;
			case 'changeEmail':
				doCompareToChangeEmail(otp);
				return;
			default:
				console.log('not action suitable');
				return;
		}
	};

	const doCompareToChangeEmail = (otp) => {
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
	};

	const doCompareToChangePassword = (otp) => {
		if (otpOrigin === otp) {
			
			sendAcceptToChangePassword({_id: userInfo?._id, status: 'OTP_TRUE'}).unwrap()
				.then(res => {
					toast.success('New password is changed!');
					dispatch(logOut());
					router.replace('/');
				})
				.catch(err => console.log(err))
		}
	};

	const doSendOTPtoChangeEmail = () => {
		sendOTPtoEmail({ _id: userInfo?._id, toEmail: currentEmail })
			.unwrap()
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.log(err));
	};

	const doSendOTPtoChangePassword = () => {
		sendOTPtoChangePassword({ _id: userInfo?._id, passwordRechange })
			.unwrap()
			.then((res) => {
				setOtpOrigin(res);
			})
			.catch((err) => console.log(err));
	};

	//init time out to fill otp
	useEffect(() => {
		const fillTime = countdown > 0 && setTimeout(() => setCountdown(countdown - 1), 1000);
		return () => clearTimeout(fillTime);
	}, [countdown]);

	const initValue = useMemo(() => {
		if (currentAction && (currentEmail || passwordRechange)) {
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
	return <Layout2>{page}</Layout2>;
};

export default otp;
