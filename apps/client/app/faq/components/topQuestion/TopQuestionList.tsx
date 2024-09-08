import Link from 'next/link';
import React from 'react';

export default function TopQuestionList() {
  return (
    <div className='mx-auto w-[43.5rem]'>
      <h2 className='mt-16 font-semibold text-base'>질문 TOP</h2>
      <div className='grid grid-cols-1 gap-y-3 mt-8'>
        <Link
          href='/faq/1'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>파티장의 파티 요금은 어떻게 산정되나요?</span>
        </Link>
        <Link
          href='/faq/2'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>디즈니 플러스 | 성인 인증 방법</span>
        </Link>
        <Link
          href='/faq/3'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>파티를 해산하고 싶어요.</span>
        </Link>
        <Link
          href='/faq/4'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>애플 | 파티원으로 애플 가족 공유 이용하기</span>
        </Link>
        <Link
          href='/faq/5'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>버디 쿠폰은 어떻게 등록하나요?</span>
        </Link>
        <Link
          href='/faq/6'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>결제 수단을 변경하고 싶어요.</span>
        </Link>
        <Link
          href='/faq/7'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>파티 요금은 언제 적립받나요?</span>
        </Link>
      </div>
    </div>
  );
}
