import Link from 'next/link';
import React from 'react';

export default function UseBuddyList() {
  return (
    <div className='mx-auto w-[43.5rem]'>
      <h2 className='mt-16 font-semibold text-base'>버디 이용</h2>
      <div className='grid grid-cols-1 gap-y-3 mt-8'>
        <Link
          href='/faq/43'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>PIN 번호를 잊어버렸어요. 재설정 하고 싶어요.</span>
        </Link>
        <Link
          href='/faq/44'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>버디를 탈퇴하고 싶어요.</span>
        </Link>
        <Link
          href='/faq/45'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>미성년자도 버디를 이용할 수 있나요?</span>
        </Link>
        <Link
          href='/faq/46'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>개명 후 이름을 변경하고 싶어요.</span>
        </Link>
        <Link
          href='/faq/47'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>보조 연락처를 등록하고 싶어요.</span>
        </Link>
        <Link
          href='/faq/48'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>등록된 휴대폰 번호를 변경하고 싶어요.</span>
        </Link>
        <Link
          href='/faq/49'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>버디 닉네임을 바꿀 수 있나요?</span>
        </Link>
        <Link
          href='/faq/50'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>버디 닉네임이 무엇인가요?</span>
        </Link>
      </div>
    </div>
  );
}
