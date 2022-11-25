import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { NoRecord, RowLinkAndSecurity, UpdateImageModal } from '../components';
import { Layout2 } from '../layouts';
import Image from 'next/image';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaPen } from 'react-icons/fa';
import avatar from '../assets/default-user.png';
import Select from 'react-select';
import { countries } from '../data/countries';
import { day, month, year } from '../data/date';
import { selectCurrentUser } from '../features/auth/authSlice';
import { useUpdateCustomerMutation, useGetCustomerQuery } from '../features/customer/customerApiSlice';
import { toast } from 'react-toastify';
import { useStateContext } from '../context/StateContext';
import Link from 'next/link';
import requiredauth from '../features/auth/requiredauth';

const evenMonth = [4, 6, 9, 11];
const oddMonth = [1, 3, 5, 7, 8, 10, 12];
const DAY_EVEN = 30;
const DAY_LEAP = 29;
const DAY_NOT_LEAP = 28;
const genderRadio = [
	{ id: 'men', label: 'men', checked: false },
	{ id: 'woman', label: 'woman', checked: false },
];

function profile() {
	// init state default
	const userInfo = useSelector(selectCurrentUser);
	const [selectCountry, setSelectCountry] = useState(null);
	const [selectDay, setSelectDay] = useState(null);
	const [selectMonth, setSelectMonth] = useState(null);
	const [selectYear, setSelectYear] = useState(null);
	const [dayRange, setDayRange] = useState(null);
	const [selectGender, setSelectGender] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const { data: profile, isSuccess } = useGetCustomerQuery(userInfo?._id);
	const { navbarRef } = useStateContext();
	//get hook from api slice
	const [updateCustomer] = useUpdateCustomerMutation();

	//setup hook form
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	//handle get data

	const handleMonthChange = (selectedOption) => {
		if (selectedMonth(selectedOption.value)) {
			setSelectMonth(selectedOption);
			filterDaybyMonth(selectedOption.value);
		} else {
			setSelectDay((selectDay) => (selectDay = day[0]));
			setSelectMonth(selectedOption);
			filterDaybyMonth(selectedOption.value);
		}
	};

	const handleYearChange = (selectedOption) => {
		setSelectYear(selectedOption);
		filterDayByYear(selectedOption.value);
	};

	const handleSelectGender = (e) => {
		setSelectGender(e.target.value);
	};

	const onSubmitInfo = (e) => {
		if (selectDay) {
			const newBirthday = new Date(selectYear.value, selectMonth.value, selectDay.value).toISOString();
			const newInfo = {
				_id: userInfo?._id,
				username: userInfo?.username,
				email: userInfo?.email,
				country: selectCountry.label,
				birthday: newBirthday,
				gender: selectGender,
			};

			if (isUserInfoChange(userInfo, newInfo)) {
				updateCustomer(newInfo)
					.unwrap()
					.then((res) => toast.success('Update successful'))
					.catch((error) => toast.error('Update failed'));
			} else {
				toast.error('Nothing changed');
			}
		} else {
			toast.error('Please select right date');
		}
	};

	const selectedMonth = (selectedMonth) => {
		//check when days of month are 31
		if (Number(selectDay?.value) <= 31 && oddMonth.includes(Number(selectedMonth))) return true;

		//check when days of month are 30
		if (Number(selectDay?.value) <= 30 && evenMonth.includes(Number(selectedMonth))) return true;

		//check when days of month are 29 and this year is leap year and selected month is 2
		if (Number(selectDay?.value) <= 29 && isLeapYear(selectYear?.value)) return true;

		//check when days of month are 28 and this year is not leap year and selected month is 2
		if (Number(selectDay?.value) <= 28 && Number(selectedMonth) === 2) return true;

		return false;
	};

	const filterDaybyMonth = (selectedMonth) => {
		if (evenMonth.includes(Number(selectedMonth))) {
			setDayRange((dayRange) => (dayRange = day.filter((d) => Number(d.value) <= DAY_EVEN)));
		} else {
			if (oddMonth.includes(Number(selectedMonth))) {
				setDayRange([...day]);
			} else {
				if (isLeapYear(selectYear)) {
					setDayRange((dayRange) => (dayRange = day.filter((d) => Number(d.value) <= DAY_LEAP)));
				} else setDayRange((dayRange) => (dayRange = day.filter((d) => Number(d.value) <= DAY_NOT_LEAP)));
			}
		}
	};

	const filterDayByYear = (selectedYear) => {
		if (Number(selectMonth?.value) === 2) {
			if (isLeapYear(selectedYear)) {
				return setDayRange((dayRange) => (dayRange = day.filter((d) => Number(d.value) <= DAY_LEAP)));
			} else {
				return setDayRange((dayRange) => (dayRange = day.filter((d) => Number(d.value) <= DAY_NOT_LEAP)));
			}
		} else {
			if (evenMonth.includes(selectMonth?.value))
				setDayRange((dayRange) => (dayRange = day.filter((d) => Number(d.value) <= DAY_EVEN)));
			else setDayRange([...day]);
		}
	};

	const isLeapYear = (year) => {
		return Number(year) % 400 === 0 || (Number(year) % 4 === 0 && Number(year) % 100 !== 0);
	};

	const isUserInfoChange = (pre, after) => {
		return !(pre.country === after.country && pre.birthday === after.birthday && pre.gender === after.gender);
	};

	const initInfo = useMemo(() => {
		if (userInfo) {
			//init country
			const country = countries.find((country) => country.label === userInfo.country);
			setSelectCountry((currentCountry) => (currentCountry = country));

			//init birthday
			const date = new Date(userInfo?.birthday);
			setSelectDay({ label: date.getDay(), value: date.getDay() });
			setSelectMonth({ label: date.getMonth(), value: date.getMonth() });
			setSelectYear({ label: date.getFullYear(), value: date.getFullYear() });

			//filter day by month
			filterDaybyMonth(date.getMonth());

			//init gender
			setSelectGender(userInfo?.gender);
		}
	}, []);

	useEffect(() => {
		if (showModal && navbarRef) {
			navbarRef.current.classList.remove('sticky');
		} else {
			navbarRef.current.classList.add('sticky');
		}
	}, [showModal]);

	return (
		<div className='flex w-[800px] justify-center m-auto pb-20 md:pb-0 bg-slate-200 rounded-md md:w-[100vw]'>
			{isSuccess ? (
				<>
					{showModal ? <UpdateImageModal setShowModal={setShowModal} title={'Update image profile'} /> : null}
					<div className='flex flex-col items-center'>
						<h1 className='text-[#324d67] text-[28px] font-extrabold mt-4'>User Profile</h1>
						<div className='relative'>
							<div className=' text-gray-700 rounded-full border-2 overflow-hidden w-[100px] h-[100px] border-gray-400'>
								<Image
									src={!profile ? avatar : profile.imgProfile}
									layout='responsive'
									width={100}
									height={100}
									alt='user-profile'
								/>
							</div>
							<div
								className='absolute bottom-2 right-1 w-5 h-5 rounded-full bg-[#0b74e5] z-10 overflow-hidden text-[10px] flex justify-center items-center p-1
						cursor-pointer'
								onClick={() => setShowModal(true)}
							>
								<FaPen />
							</div>
						</div>
						<div className='flex flex-row justify-center items-center space-x-2'>
							<h4 className='font-medium text-[18px] text-[#0b74e5]  mt-1'>{profile?.username || 'User name'}</h4>
							<Link href={'/changeUserName'}>
								<div
									className='w-5 h-5 rounded-full bg-[#0b74e5] z-10 overflow-hidden text-[10px] flex justify-center 
							items-center p-1 cursor-pointer'
								>
									<FaPen />
								</div>
							</Link>
						</div>
						<div className='bg-slate-100 w-[700px] mt-4 md:w-[100vw]'>
							<form onSubmit={handleSubmit(onSubmitInfo)}>
								<div className='grid grid-cols-2 place-content-center gap-4 divide-x divide-blue-200 md:grid-cols-1'>
									<div className='p-4 space-y-3'>
										<h4 className='font-medium text-[18px] mt-1 '>Infomation</h4>
										<div className='flex flex-col space-y-1'>
											<h4>Country</h4>
											<Select
												instanceId='selectCountry'
												defaultValue={selectCountry}
												onChange={setSelectCountry}
												options={countries}
												placeholder='country'
											/>
										</div>
										<div className='flex flex-col space-y-1 text-[14px] '>
											<h4 className='float-left '>Birthday</h4>
											<div className='flex flex-row space-x-2'>
												<Select
													key={'selectDay'}
													instanceId='selectDay'
													defaultValue={selectDay}
													onChange={setSelectDay}
													options={dayRange || day}
													placeholder='day'
												/>
												<Select
													key={'selectMonth'}
													instanceId='selectMonth'
													defaultValue={selectMonth}
													onChange={handleMonthChange}
													options={month}
													placeholder='month'
												/>
												<Select
													key={'selectYear'}
													instanceId='selectYear'
													defaultValue={selectYear}
													onChange={handleYearChange}
													options={year}
													placeholder='year'
												/>
											</div>
										</div>
										<div className='flex flex-col space-y-1  text-[14px]'>
											<h4 className='float-left'>Gender</h4>
											<div className='flex flex-row md:justify-start space-x-2'>
												{genderRadio.map((gender, index) => (
													<div className='space-x-1 flex justify-center items-center' key={index}>
														<input
															type='radio'
															name='gender'
															id={gender?.id}
															value={gender?.label}
															checked={selectGender === gender?.id}
															onChange={handleSelectGender}
														/>
														<label htmlFor={gender?.label} className='capitalize'>
															{gender?.label}
														</label>
													</div>
												))}
											</div>
										</div>
										<div className='flex flex-row space-x-1 text-[14px]'>
											<h4 className='float-left'>Total bill:</h4>
											<span className='font-bold'>{profile?.totalBill || '0'}$</span>
										</div>
										<div className='flex items-center justify-center'>
											<button className='bg-[#0b74e5] text-white font-[14px] rounded-[4px] py-1 px-2'>Update</button>
										</div>
									</div>

									<div className='p-4 space-y-3'>
										<h4 className='font-medium text-[18px] mt-1  '>Link and Security</h4>
										<RowLinkAndSecurity
											icon={<BsFillTelephoneFill />}
											title={'Phone'}
											desc={profile?.phone || '0901234567'}
											link={'/changePhone'}
										/>
										<RowLinkAndSecurity
											icon={<MdEmail />}
											title={'Email'}
											desc={profile?.email || 'abc@gmail.com'}
											link={'/changeEmail'}
										/>
										<RowLinkAndSecurity icon={<RiLockPasswordFill />} title={'Password'} link={'/changePassword'} />
									</div>
								</div>
							</form>
						</div>
					</div>
				</>
			) : (
				<NoRecord />
			)}
		</div>
	);
}

profile.getLayout = function getLayout(page) {
	return <Layout2>{page}</Layout2>;
};

export default requiredauth(profile);
