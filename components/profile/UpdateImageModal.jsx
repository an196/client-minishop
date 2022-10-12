import React, { useState } from 'react';
import { firebaseUploadImage } from '~/features/firebase/firebaseUpload';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, selectCurrentToken, setCredentials } from '~/features/auth/authSlice';
import CropImage from './CropImage';
import { useUpdateCustomerMutation } from '~/features/customer/customerApiSlice';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

function UpdateImageModal({ title, setShowModal, onSave }) {
	//init state
	const [avatar, setAvatar] = useState();

	//hook api
	const [updateCustomer] = useUpdateCustomerMutation();

	//get data
	const userInfo = useSelector(selectCurrentUser);
	const token = useSelector(selectCurrentToken);

	const dispatch = useDispatch();
	const router = useRouter();

	const handleSave = () => {
		firebaseUploadImage(avatar, 'customer').then((result) => {
			const infoUpdate = {
				_id: userInfo._id,
				username: userInfo.username,
				email: userInfo.email,
				imgProfile: result,
			};

			updateCustomer(infoUpdate)
				.then((res) => {
					dispatch(setCredentials({ user: { ...userInfo, imgProfile: result }, accessToken: selectCurrentToken }));
					setShowModal(false);
				})
				.catch((err) => toast.error('Can not change image profile'));
		});
	};

	return (
		<>
			<div className='justify-center mt-[10vh] flex overflow-x-hidden overflow-y-auto fixed inset-0 !z-50 outline-none focus:outline-none'>
				<div className='relative w-auto my-6 mx-auto max-w-3xl'>
					{/*content*/}
					<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
						{/*header*/}
						<div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
							<h3 className='text-xl font-semibold text-[#0b74e5]'>{title || 'Modal Title'}</h3>
							<button
								className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
								onClick={() => setShowModal(false)}
							>
								<span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
									×
								</span>
							</button>
						</div>
						{/*body*/}
						<div className='relative p-6 flex-auto bg-slate-100'>
							<CropImage setSelectedImage={setAvatar} />
						</div>
						{/*footer*/}
						<div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
							<button
								className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
								type='button'
								onClick={() => setShowModal(false)}
							>
								Close
							</button>
							<button
								className='bg-[#0b74e5] text-white active:bg-[#0b74e5] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
								type='button'
								onClick={handleSave}
							>
								Save Changes
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
		</>
	);
}

export default UpdateImageModal;
