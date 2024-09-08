import Link from 'next/link';
import React from 'react';

export default function PaymentAndAccumulationList() {
  return (
    <div className='mx-auto w-[43.5rem]'>
      <h2 className='mt-16 font-semibold text-base'>결제/적립</h2>
      <div className='grid grid-cols-1 gap-y-3 mt-8'>
        <Link
          href='/faq/28'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>파티 기간 중 등록한 카드에 문제가 생기면 어떻게 되나요?</span>
        </Link>
        <Link
          href='/faq/29'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>100원 결제는 왜 필요한가요?</span>
        </Link>
        <Link
          href='/faq/30'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>결제 수단을 변경하고 싶어요.</span>
        </Link>
        <Link
          href='/faq/31'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>버디 머니를 충전할 수 있나요?</span>
        </Link>
        <Link
          href='/faq/32'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>버디 머니를 어떻게 인출하나요?</span>
        </Link>
        <Link
          href='/faq/33'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>버디를 탈퇴하면 버디 머니는 어떻게 되나요?</span>
        </Link>
        <Link
          href='/faq/34'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>버디 머니 인출이 안 돼요.</span>
        </Link>
        <Link
          href='/faq/35'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>버디 머니 인출 계좌를 변경하고 싶어요.</span>
        </Link>
        <Link
          href='/faq/36'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>버디 머니로 파티 요금을 결제하고 싶어요.</span>
        </Link>
        <Link
          href='/faq/37'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>버디 머니는 무엇인가요?</span>
        </Link>
      </div>
    </div>
  );
}
