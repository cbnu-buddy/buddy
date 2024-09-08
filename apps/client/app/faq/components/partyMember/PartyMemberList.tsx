import Link from 'next/link';
import React from 'react';

export default function PartyMemberList() {
  return (
    <div className='mx-auto w-[43.5rem]'>
      <h2 className='mt-16 font-semibold text-base'>파티원</h2>
      <div className='grid grid-cols-1 gap-y-3 mt-8'>
        <Link
          href='/faq/21'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>파티를 탈퇴하고 싶어요.</span>
        </Link>
        <Link
          href='/faq/22'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>가입한 파티의 파티원 리스트에 파티장과 저만 보여요.</span>
        </Link>
        <Link
          href='/faq/23'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>파티장이 서비스 이용권을 결제하지 않았어요.</span>
        </Link>
        <Link
          href='/faq/24'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>파티장의 계정에 성인 인증이 안되어 있어요.</span>
        </Link>
        <Link
          href='/faq/25'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>파티장이 초대를 진행하지 않아요.</span>
        </Link>
        <Link
          href='/faq/26'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>파티장의 공유 로그인 정보에 문제가 있어요.</span>
        </Link>
        <Link
          href='/faq/27'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>파티원이 무엇인가요?</span>
        </Link>
      </div>
    </div>
  );
}
