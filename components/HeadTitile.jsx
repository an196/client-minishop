function HeadTitile({ title, subtitle }) {
	return (
		<div className='text-center my-[30px] mx-0 text-[#324d67]'>
			<h2 className='text-[40px] font-extrabold md:text-[32px] sm:text-[24px] ssm:text-[18px]'>{title}</h2>
			<p className='text-[16px] font-extralight'>{subtitle}</p>
		</div>
	);
}

export default HeadTitile;
