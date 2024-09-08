import Link from 'next/link';
import React from 'react';

export default function NoticeList() {
  return (
    <div className='grid grid-cols-1 gap-y-4'>
      <Link
        href='/notices/1'
        className='flex justify-between hover:bg-[#f6f6f6] rounded-[0.625rem] px-6 py-4'
      >
        <div className='flex gap-x-5'>
          <span className='text-[0.775rem] leading-[1.5] font-semibold text-red-500 px-5'>
            [공지]
          </span>
          <div className='grid grid-cols-1 gap-y-1'>
            <span>추가 공유부터 가구공유까지. 넷플릭스 공유의 모든 것!</span>
            <span className='text-[#8b8b8b] text-[0.5rem] leading-[1] font-extralight'>
              2024.03.14
            </span>
          </div>
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='40'
          viewBox='0 -960 960 960'
          width='40'
          fill='#a2a4a9'
        >
          <path d='M531.692-480 361.846-649.846q-5.615-5.615-6-13.769-.385-8.154 6-14.539T376-684.539q7.769 0 14.154 6.385l175.538 175.539q5.231 5.23 7.347 10.692 2.115 5.461 2.115 11.923t-2.115 11.923q-2.116 5.462-7.347 10.692L390.154-281.846q-5.615 5.615-13.769 6-8.154.385-14.539-6T355.461-296q0-7.769 6.385-14.154L531.692-480Z' />
        </svg>
      </Link>

      <Link
        href='/notices/2'
        className='flex justify-between hover:bg-[#f6f6f6] rounded-[0.625rem] px-6 py-4'
      >
        <div className='flex gap-x-5'>
          <span className='text-[0.775rem] leading-[1.5] font-semibold text-blue-700 px-5'>
            [공지]
          </span>
          <div className='grid grid-cols-1 gap-y-1'>
            <span>버디 홀리데이 스탬프 이벤트 당첨자 발표</span>
            <span className='text-[#8b8b8b] text-[0.5rem] leading-[1] font-extralight'>
              2024.03.14
            </span>
          </div>
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='40'
          viewBox='0 -960 960 960'
          width='40'
          fill='#a2a4a9'
        >
          <path d='M531.692-480 361.846-649.846q-5.615-5.615-6-13.769-.385-8.154 6-14.539T376-684.539q7.769 0 14.154 6.385l175.538 175.539q5.231 5.23 7.347 10.692 2.115 5.461 2.115 11.923t-2.115 11.923q-2.116 5.462-7.347 10.692L390.154-281.846q-5.615 5.615-13.769 6-8.154.385-14.539-6T355.461-296q0-7.769 6.385-14.154L531.692-480Z' />
        </svg>
      </Link>

      <Link
        href='/notices/3'
        className='flex justify-between hover:bg-[#f6f6f6] rounded-[0.625rem] px-6 py-4'
      >
        <div className='flex gap-x-5'>
          <span className='text-[0.775rem] leading-[1.5] font-semibold text-blue-700 px-5'>
            [공지]
          </span>
          <div className='grid grid-cols-1 gap-y-1'>
            <span>테니스TV 요금 인상 관련 공지</span>
            <span className='text-[#8b8b8b] text-[0.5rem] leading-[1] font-extralight'>
              2024.03.14
            </span>
          </div>
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='40'
          viewBox='0 -960 960 960'
          width='40'
          fill='#a2a4a9'
        >
          <path d='M531.692-480 361.846-649.846q-5.615-5.615-6-13.769-.385-8.154 6-14.539T376-684.539q7.769 0 14.154 6.385l175.538 175.539q5.231 5.23 7.347 10.692 2.115 5.461 2.115 11.923t-2.115 11.923q-2.116 5.462-7.347 10.692L390.154-281.846q-5.615 5.615-13.769 6-8.154.385-14.539-6T355.461-296q0-7.769 6.385-14.154L531.692-480Z' />
        </svg>
      </Link>

      <Link
        href='/notices/4'
        className='flex justify-between gap-x-3 hover:bg-[#f6f6f6] rounded-[0.625rem] px-6 py-4'
      >
        <div className='flex gap-x-5'>
          <span className='text-[0.775rem] leading-[1.5] font-semibold text-blue-700 px-5'>
            [공지]
          </span>
          <div className='grid grid-cols-1 gap-y-1'>
            <span>티빙 요금 인상 관련 공지</span>
            <span className='text-[#8b8b8b] text-[0.5rem] leading-[1] font-extralight'>
              2024.03.14
            </span>
          </div>
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='40'
          viewBox='0 -960 960 960'
          width='40'
          fill='#a2a4a9'
        >
          <path d='M531.692-480 361.846-649.846q-5.615-5.615-6-13.769-.385-8.154 6-14.539T376-684.539q7.769 0 14.154 6.385l175.538 175.539q5.231 5.23 7.347 10.692 2.115 5.461 2.115 11.923t-2.115 11.923q-2.116 5.462-7.347 10.692L390.154-281.846q-5.615 5.615-13.769 6-8.154.385-14.539-6T355.461-296q0-7.769 6.385-14.154L531.692-480Z' />
        </svg>
      </Link>

      <Link
        href='/notices/5'
        className='flex justify-between hover:bg-[#f6f6f6] rounded-[0.625rem] px-6 py-4'
      >
        <div className='flex gap-x-5'>
          <span className='text-[0.775rem] leading-[1.5] font-semibold text-blue-700 px-5'>
            [공지]
          </span>
          <div className='grid grid-cols-1 gap-y-1'>
            <span>넷플릭스 공유 방식 변경 관련 공지</span>
            <span className='text-[#8b8b8b] text-[0.5rem] leading-[1] font-extralight'>
              2024.03.14
            </span>
          </div>
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='40'
          viewBox='0 -960 960 960'
          width='40'
          fill='#a2a4a9'
        >
          <path d='M531.692-480 361.846-649.846q-5.615-5.615-6-13.769-.385-8.154 6-14.539T376-684.539q7.769 0 14.154 6.385l175.538 175.539q5.231 5.23 7.347 10.692 2.115 5.461 2.115 11.923t-2.115 11.923q-2.116 5.462-7.347 10.692L390.154-281.846q-5.615 5.615-13.769 6-8.154.385-14.539-6T355.461-296q0-7.769 6.385-14.154L531.692-480Z' />
        </svg>
      </Link>

      <Link
        href='/notices/6'
        className='flex justify-between hover:bg-[#f6f6f6] rounded-[0.625rem] px-6 py-4'
      >
        <div className='flex gap-x-5'>
          <span className='text-[0.775rem] leading-[1.5] font-semibold text-blue-700 px-5'>
            [공지]
          </span>
          <div className='grid grid-cols-1 gap-y-1'>
            <span>디즈니플러스 요금 인상 관련 공지</span>
            <span className='text-[#8b8b8b] text-[0.5rem] leading-[1] font-extralight'>
              2024.03.14
            </span>
          </div>
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='40'
          viewBox='0 -960 960 960'
          width='40'
          fill='#a2a4a9'
        >
          <path d='M531.692-480 361.846-649.846q-5.615-5.615-6-13.769-.385-8.154 6-14.539T376-684.539q7.769 0 14.154 6.385l175.538 175.539q5.231 5.23 7.347 10.692 2.115 5.461 2.115 11.923t-2.115 11.923q-2.116 5.462-7.347 10.692L390.154-281.846q-5.615 5.615-13.769 6-8.154.385-14.539-6T355.461-296q0-7.769 6.385-14.154L531.692-480Z' />
        </svg>
      </Link>
    </div>
  );
}
