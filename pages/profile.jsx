import React, { useState, useRef } from 'react';
import { Layout, RowLinkAndSecurity } from '~/components';
import Image from 'next/image';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import avatar from '~/assets/default-user.png';
import Select from 'react-select';
import { countries } from '~/data/countries';
import { day, month, year } from '~/data/date';

const evenMonth = [4, 6, 9, 11];
const oddMonth = [1, 3, 5, 7, 8, 10, 12];
const DAY_EVEN = 30;
const DAY_LEAP = 29;
const DAY_NOT_LEAP = 28;

function profile() {
	const [selectCountry, setSelectCountry] = useState(null);
	const [selectDay, setSelectDay] = useState(null);
	const [selectMonth, setSelectMonth] = useState(null);
	const [selectYear, setSelectYear] = useState(null);
	const [dayRange, setDayRange] = useState(null);

	const handleMonthChange = (selectedOption) => {
		if (selectedMonth(selectedOption.value)) {
			setSelectMonth(selectedOption.value);
			filterDaybyMonth(selectedOption.value);
		} else {
			console.log('not selected');
			setSelectMonth(selectedOption);
			filterDaybyMonth(selectedOption.value);
			setSelectDay(null);
		}
	};

	const handleYearChange = (selectedOption) => {
		setSelectYear(selectedOption);
		filterDayByYear(selectedOption.value);
	};

	const selectedMonth = (selectedMonth) => {
		console.log(selectDay);
		console.log(selectedMonth);
		//check when days of month are 31
		if (Number(selectDay?.value) <= 31 && oddMonth.includes(Number(selectedMonth))) {
			return true;
		}

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

	return (
		<div className='flex min-h-[100vh] w-[800px] justify-center m-auto  bg-slate-200 rounded-md'>
			<div className='flex flex-col items-center'>
				<h1 className='text-[#324d67] text-[28px] font-extrabold mt-4'>User Profile</h1>

				<div className='flex items-center justify-center w-[100px] h-[100px] mt-4 bg-white rounded-full  '>
					<Image src={avatar} width={50} height={50} />
				</div>
				<h4 className='font-medium text-[18px] mt-1'>User name</h4>
				<div className='bg-slate-100 w-[600px] mt-4 md:w-[100vw]'>
					<div className='grid grid-cols-2 place-content-center gap-4 divide-x divide-blue-200'>
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
								<div className='flex flex-row justify-between'>
									<Select
										key={selectDay}
										instanceId='selectDay'
										defaultValue={selectDay}
										onChange={setSelectDay}
										options={dayRange || day}
										placeholder='day'
									/>
									<Select
										instanceId='selectMonth'
										defaultValue={selectMonth}
										onChange={handleMonthChange}
										options={month}
										placeholder='month'
									/>
									<Select
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
								<div className='flex flex-row justify-between'>
									<div className='space-x-2 flex justify-center items-center'>
										<input type='radio' name='gender' id='men' value='men' />
										<label for='men'>Men</label>
									</div>
									<div className='space-x-2 flex justify-center items-center'>
										<input type='radio' name='gender' id='men' value='men' />
										<label for='men'>Woman</label>
									</div>
								</div>
							</div>
							<div className='flex flex-row space-x-1 text-[14px]'>
								<h4 className='float-left'>Total bill:</h4>
								<span className='font-bold'>300$</span>
							</div>
							<div className='flex items-center justify-center'>
								<button className='bg-[#0b74e5] text-white font-[14px] rounded-[4px] py-1 px-2'>Update</button>
							</div>
						</div>

						<div className='p-4 space-y-3'>
							<h4 className='font-medium text-[18px] mt-1 '>Link and Security</h4>
							<RowLinkAndSecurity icon={<BsFillTelephoneFill />} title={'Phone'} desc={'0901234567'} />
							<RowLinkAndSecurity icon={<MdEmail />} title={'Email'} desc={'abc@gmail.com'} />
							<RowLinkAndSecurity icon={<RiLockPasswordFill />} title={'Password'} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

profile.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
export default profile;
