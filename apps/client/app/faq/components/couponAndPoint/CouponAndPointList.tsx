import Link from 'next/link';
import React from 'react';

export default function CouponAndPointList() {
  return (
    <div className='mx-auto w-[43.5rem]'>
      <h2 className='mt-16 font-semibold text-base'>쿠폰/포인트</h2>
      <div className='grid grid-cols-1 gap-y-3 mt-8'>
        <Link
          href='/faq/38'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>버디 쿠폰은 어떻게 등록하나요?</span>
        </Link>
        <Link
          href='/faq/39'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>버디 포인트를 충전할 수 있나요?</span>
        </Link>
        <Link
          href='/faq/40'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>버디 포인트는 어떻게 사용하나요?</span>
        </Link>
        <Link
          href='/faq/41'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>버디 쿠폰을 구매할 수 있나요?</span>
        </Link>
        <Link
          href='/faq/42'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>버디 쿠폰은 어떻게 사용하나요?</span>
        </Link>
      </div>
    </div>
  );
}
