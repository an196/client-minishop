import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { useRouter } from 'next/router';

function UserBar() {
    const router = useRouter();

	return (
		<div className='bg-white absolute top-[46px] w-[129px] right-[41px] rounded font-medium'>
			<div className='flex flex-row items-center justify-between mx-3 my-2 cursor-pointer'
                onClick={()=> router.push('login')}
            >
				<span>Login </span>
				<FiLogIn />
			</div>
		</div>
	);
}

export default UserBar;
