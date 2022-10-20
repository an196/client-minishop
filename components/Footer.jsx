import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { AiFillInstagram, AiOutlineTwitter,AiFillFacebook } from 'react-icons/ai';
import { SiFacebook} from 'react-icons/si';

function Footer({ isBottom }) {
	const fixedBottom = 'absolute left-0 bottom-0 right-0 ';	
	const ref = useRef();
	
	useEffect(() => {
		let html = document.documentElement;
		const handleResizeHeight = () => {
			const clientHeight =  html.clientHeight;
			let screenHeight = screen?.height;
			

			if (clientHeight < screenHeight ) {
				ref.current.classList.add('absolute');
			} else {
				ref.current.classList.remove('absolute');
			}
		};
	
		window.addEventListener('resize-height', handleResizeHeight);
		handleResizeHeight();

		return () => window.removeEventListener('resize-height', handleResizeHeight);
	},[]);

	return (
		<div
		className={`flex items-center justify-center flex-col w-full text-[#324d67] bg-slate-300 text-[16px] sm:text-[12px] md:mt-0  
      mt-[20px] font-bold gap-[10px] px-[30px] py-[10px] flex-wrap text-center ${isBottom && fixedBottom}`}
			ref={ref}
		>
			<p>2022 Headphone ALL right resered</p>
			<div className='flex flex-row gap-[10px] text-[30px] sm:text-[18px]'>
				<AiFillInstagram />
				<AiOutlineTwitter />
				<AiFillFacebook />
			</div>
		</div>
	);
}

export default Footer;
