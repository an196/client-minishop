import React, { useState, useMemo } from 'react';
import { Layout2 } from '../layouts';
import { GrContactInfo } from 'react-icons/gr';
import { selectCurrentUser, setCredentials, selectCurrentToken } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useUpdateCustomerMutation } from '../features/customer/customerApiSlice';

function changeUserName() {
    //get data from redux store
	const userInfo = useSelector(selectCurrentUser);
	const token = useSelector(selectCurrentToken);

	//init state
	const [currentUsername, setCurrentUsername] = useState(userInfo?.username);

	//hook rtk query
	const [updateCustomer] = useUpdateCustomerMutation();

	const dispatch = useDispatch();
	const router = useRouter();

	const handleOnClick = () => {
		if (currentUsername === userInfo?.username) {
			toast.error('user name not change!');
		} else {
			const infoUpdate = {
				_id: userInfo?._id,
				email: userInfo?.email,
				username: currentUsername,
			};

			updateCustomer(infoUpdate)
				.then((_) => {
					dispatch(setCredentials({ user: { ...userInfo, username: currentUsername }, accessToken: token }));
                    router.replace('/profile')
				})
				.catch((_) => toast.error('Can not change user name'));
		}
	};

	return (
		<div className='flex w-[500px] justify-center m-auto bg-slate-200 rounded-md md:w-[100vw]'>
			<div className='flex flex-col items-center'>
				<h1 className='text-[#324d67] text-[28px] font-extrabold mt-4'>Change name</h1>
				<div className='bg-slate-100  w-[400px] mb-10 p-10 md:mb-0 flex flex-col justify-center items-center mt-4 md:w-[100vw] space-y-3'>
					<h4 className='font-medium text-[18px] w-full'>New name</h4>
					<div className='flex flex-row justify-center items-center w-full  outline-blue-400 divide-x bg-white divide-blue-200 border-gray-300 border-1 pr-2 py-1'>
						<div className='p-2'>
							<GrContactInfo />
						</div>
						<input
							type='text'
							className='w-full outline-none px-2 '
							value={currentUsername || ''}
							onChange={(e) => setCurrentUsername(e.target.value)}
							placeholder='Please enter new name'
						/>
					</div>

					<div className='flex items-center justify-center w-full'>
						<button
							className='bg-[#0b74e5] text-white font-[14px] rounded-[4px] py-1 px-2 w-full'
							onClick={handleOnClick}
						>
							Update
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

changeUserName.getLayout = function getLayout(page) {
	return <Layout2>{page}</Layout2>;
};

export default changeUserName;
