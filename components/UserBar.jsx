import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useStateContext } from '~/context/StateContext';

function UserBar() {
    const router = useRouter();
	const {isClicked, handleClick} = useStateContext();

	return (
		<div className='bg-white absolute top-[53px] w-[129px] right-[59px] rounded font-medium z-[100]'>
			<div className='flex flex-row items-center justify-between mx-3 my-2 cursor-pointer'
                onClick={()=> {
					router.replace('/login');
					handleClick('userBar', false);
				}}
            >
				<span>Login </span>
				<FiLogIn />
			</div>
		</div>
	);
}

export default UserBar;
