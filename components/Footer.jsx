import React from 'react'
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';

function Footer() {
  return (
    <div className='flex items-center justify-center flex-col text-[#324d67] bg-slate-200 text-[20px] sm:text-[12px] mt-[20px] font-bold gap-[10px] px-[30px] 
      py-[10px] flex-wrap text-center'>
      <p>2022 Headphone ALL right resered</p>
      <div className='flex flex-row gap-[10px] text-[30px] sm:text-[18px]'>
        <AiFillInstagram/>
        <AiOutlineTwitter/>
      </div>
    </div>
  )
}

export default Footer