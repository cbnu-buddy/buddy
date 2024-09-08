import Link from 'next/link';
import React from 'react';

export default function PartyLeaderList() {
  return (
    <div className='mx-auto w-[43.5rem]'>
      <h2 className='mt-16 font-semibold text-base'>파티장</h2>
      <div className='grid grid-cols-1 gap-y-3 mt-8'>
        <Link
          href='/faq/14'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>파티를 해산하고 싶어요.</span>
        </Link>
        <Link
          href='/faq/15'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>파티 시크릿 모드가 무엇인가요?</span>
        </Link>
        <Link
          href='/faq/16'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>파티원이 중간에 탈퇴하면 어떻게 하나요?</span>
        </Link>
        <Link
          href='/faq/17'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>공유 로그인 정보(아이디, 비밀번호)는 어떻게 변경하나요?</span>
        </Link>
        <Link
          href='/faq/18'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>
            파티원의 계정 정보가 틀려서 파티원을 초대/등록할 수 없는 경우엔
            어떻게 하나요?
          </span>
        </Link>
        <Link
          href='/faq/19'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>파티원을 초대하고 싶어요.</span>
        </Link>
        <Link
          href='/faq/20'
          className='flex items-center gap-x-3  hover:bg-[#f6f6f6] rounded-[0.625rem] px-4 py-[0.625rem]'
        >
          <span className='text-[#d3d3d3] text-base'>Q. </span>
          <span>파티 인원을 변경하고 싶어요.</span>
        </Link>
      </div>
    </div>
  );
}
