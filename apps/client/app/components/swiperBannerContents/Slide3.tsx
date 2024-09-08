'use client';

import Image from 'next/image';
import { FC } from 'react';
import invitationImg from '@/public/images/invitation.png';

interface Slide3Props {
  handlePrev: () => void;
  handleNext: () => void;
}

export const Slide3: FC<Slide3Props> = ({ handlePrev, handleNext }) => {
  return (
    <div className='flex justify-center w-full h-[32.5rem] bg-gradient-to-r from-[#5f5fe7] to-[#a49cf7]'>
      <div className='flex flex-col items-start gap-8 mt-[5.75rem] w-[59.5rem]'>
        <div className='flex flex-col gap-4'>
          <h1 className='tracking-wide text-[2.75rem] leading-[1] text-white font-semibold'>
            나도 받고, 너도 받는 💌
          </h1>
          <h1 className='tracking-wide text-[2.75rem] leading-[1] text-white font-semibold'>
            버디 친구 초대 이벤트!
          </h1>
        </div>
        <p className='text-base text-white'>
          나는 매달 5,000 포인트! 친구는 가입 즉시 1,000 포인트! <br />
          버디를 친구들에게 소개해 주세요!
        </p>
        <button className='mt-3 px-11 py-[0.9rem] text-[#6666e7] bg-white rounded-xl text-lg font-semibold duration-300 hover:drop-shadow-lg'>
          친구 초대하기
        </button>
        <div className='absolute bottom-[2.3rem] flex items-center gap-4 mt-2'>
          <div className='flex gap-[0.4rem] text-xs font-extralight'>
            <span className='font-medium text-white'>03</span>
            <span className='text-white'>|</span>
            <span className='text-white'>03</span>
          </div>
          <div className='flex items-center gap-[0.15rem]'>
            <button
              onClick={handlePrev}
              className='p-[0.425rem] rounded-md hover:bg-[#8e8eed]'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='20'
                viewBox='0 -960 960 960'
                width='20'
                className='relative left-1'
                fill='white'
              >
                <path d='m127.384-480 301.308 301.308q11.923 11.923 11.615 28.077-.308 16.153-12.231 28.076-11.922 11.923-28.076 11.923t-28.076-11.923L65.078-428.77Q54.23-439.616 49-453.077 43.77-466.539 43.77-480q0-13.461 5.23-26.923 5.231-13.461 16.078-24.307l306.846-306.846q11.922-11.923 28.384-11.616 16.461.308 28.384 12.231 11.923 11.923 11.923 28.076 0 16.154-11.923 28.077L127.384-480Z' />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className='p-[0.425rem] rounded-md hover:bg-[#8e8eed]'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='20'
                viewBox='0 -960 960 960'
                width='20'
                className='relative right-1 scale-x-[-1]'
                fill='white'
              >
                <path d='m127.384-480 301.308 301.308q11.923 11.923 11.615 28.077-.308 16.153-12.231 28.076-11.922 11.923-28.076 11.923t-28.076-11.923L65.078-428.77Q54.23-439.616 49-453.077 43.77-466.539 43.77-480q0-13.461 5.23-26.923 5.231-13.461 16.078-24.307l306.846-306.846q11.922-11.923 28.384-11.616 16.461.308 28.384 12.231 11.923 11.923 11.923 28.076 0 16.154-11.923 28.077L127.384-480Z' />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div>
        <Image
          src={invitationImg}
          alt='invitationImage'
          width={475}
          height={0}
          quality={100}
          className='absolute top-[2.5rem] right-[12.5rem]'
        />
      </div>
    </div>
  );
};
