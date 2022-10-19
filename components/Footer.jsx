import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

function Footer({ isBottom }) {
	const fixedBottom = 'absolute left-0 bottom-0 right-0 ';	
	const ref = useRef();
	var body = document.body,
	html = document.documentElement;

	useEffect(() => {
		const handleResizeHeight = () => {
			const clientHeight =  html.clientHeight;
			let screenHeight = screen?.height;
			console.log(clientHeight , screenHeight)
			console.log(ref.current?.classList)
			if(screenHeight === 'undefined' && isBottom){
				ref.current.classList.add('absolute');
				return
			}

			if (clientHeight < screenHeight) {
				ref.current.classList.add('absolute');
			} else {
				ref.current.classList.remove('absolute');
			}
		};

		window.addEventListener('resize-height', handleResizeHeight);
		handleResizeHeight();

		return () => window.removeEventListener('resize-height', handleResizeHeight);
	},[body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight]);

	return (
		<div
		className={`flex items-center justify-center flex-col w-full text-[#324d67] bg-slate-300 text-[20px] sm:text-[12px] md:mt-0  
      mt-[20px] font-bold gap-[10px] px-[30px] py-[10px] flex-wrap text-center ${isBottom && fixedBottom}`}
			ref={ref}
		>
			<p>2022 Headphone ALL right resered</p>
			<div className='flex flex-row gap-[10px] text-[30px] sm:text-[18px]'>
				<AiFillInstagram />
				<AiOutlineTwitter />
			</div>
		</div>
	);
}

export default Footer;
