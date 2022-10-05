import React, {useEffect} from 'react';
import Image from 'next/image';
import successImage from '~/assets/high_five.jpg';
import Link from 'next/link'; 
import { runFireworks } from '~/lib/utils';

function registerSuccessful() {
    useEffect(() => {
        runFireworks();
    },[])

	return (
		<div className='flex min-h-[100vh] text-center justify-center items-center flex-col'>
			<div>
				<h1 className='text-[#324d67] text-[40px] font-extrabold'>Congratulations!</h1>
				<p className='text-[16px] font-extralight'>You have successfully registered an account</p>
                <Link href='/login'>
				    <button className='bg-[#e50914] mt-2 mb-2 text-white rounded-sm p-2'>Back to sign in</button>
                </Link>
				<div className='w-[800px] h-[300px] md:w-[100vw] m-auto'>
					<Image src={successImage} layout='responsive' />
				</div>
			</div>
		</div>
	);
}

export default registerSuccessful;
