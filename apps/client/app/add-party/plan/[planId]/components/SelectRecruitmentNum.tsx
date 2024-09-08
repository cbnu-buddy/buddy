'use client';

import React, { useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { AddPartyInfoStore } from '@/store/party/AddPartyInfo';
import { AddPartyDetailProps } from '../page';

interface SelectRecruitmentNumProps {
  resData: AddPartyDetailProps;
}

export default function SelectRecruitmentNum({
  resData,
}: SelectRecruitmentNumProps) {
  const maxRecruitmentNum = resData?.maxMemberNum - 1;

  const partyInfo = AddPartyInfoStore((state: any) => state.partyInfo);
  const updateRecruitmentNum = AddPartyInfoStore(
    (state: any) => state.updateRecruitmentNum
  );
  const updateStepName = AddPartyInfoStore(
    (state: any) => state.updateStepName
  );

  const [recruitmentNum, setRecruitmentNum] = useState<number>(
    partyInfo.recruitmentNum === 0
      ? maxRecruitmentNum
      : partyInfo.recruitmentNum
  );

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className='w-[25rem]'>
      <p
        className='text-[1.35rem] leading-[1.55] font-semibold'
        data-aos='fade-zoom'
        data-aos-easing='ease-out'
        data-aos-duration='1500'
      >
        몇 명의 파티원을 <br />
        모집하실 건가요?
      </p>
      <div className='flex flex-col gap-y-[0.6rem] mt-8'>
        <div className='flex justify-between items-center border-[1.25px] border-[#d3d3d3] w-full p-2 rounded-lg'>
          <button
            disabled={recruitmentNum === 1 ? true : false}
            className={`p-1 ${
              recruitmentNum !== 1 && 'hover:bg-[#f6f6f6]'
            } rounded-lg`}
            onClick={() => setRecruitmentNum((prev) => prev - 1)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='35px'
              viewBox='0 -960 960 960'
              width='35px'
              fill={recruitmentNum === 1 ? '#b4b4b4' : '#1a1f27'}
            >
              <path d='M250-450q-12.75 0-21.37-8.63-8.63-8.63-8.63-21.38 0-12.76 8.63-21.37Q237.25-510 250-510h460q12.75 0 21.37 8.63 8.63 8.63 8.63 21.38 0 12.76-8.63 21.37Q722.75-450 710-450H250Z' />
            </svg>
          </button>
          <span className='font-semibold text-lg'>{recruitmentNum}명</span>
          <button
            disabled={recruitmentNum === maxRecruitmentNum ? true : false}
            className={`p-1 ${
              recruitmentNum !== maxRecruitmentNum && 'hover:bg-[#f6f6f6]'
            } rounded-lg`}
            onClick={() => setRecruitmentNum((prev) => prev + 1)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='35px'
              viewBox='0 -960 960 960'
              width='35px'
              fill={
                recruitmentNum === maxRecruitmentNum ? '#b4b4b4' : '#1a1f27'
              }
            >
              <path d='M450-450H250q-12.75 0-21.37-8.63-8.63-8.63-8.63-21.38 0-12.76 8.63-21.37Q237.25-510 250-510h200v-200q0-12.75 8.63-21.37 8.63-8.63 21.38-8.63 12.76 0 21.37 8.63Q510-722.75 510-710v200h200q12.75 0 21.37 8.63 8.63 8.63 8.63 21.38 0 12.76-8.63 21.37Q722.75-450 710-450H510v200q0 12.75-8.63 21.37-8.63 8.63-21.38 8.63-12.76 0-21.37-8.63Q450-237.25 450-250v-200Z' />
            </svg>
          </button>
        </div>
        <p className='text-xs font-light text-[#656565] mt-4'>
          - 파티 운영을 위해서는 최소 1명 이상의 파티원이 필요해요.
        </p>
      </div>

      <button
        className='w-full mt-20 h-13 p-4 text-[0.8rem] leading-[1] border-transparent bg-[#3a8af9] hover:bg-[#1c6cdb] rounded-lg text-white text-sm font-bold duration-150 ease-out'
        onClick={() => {
          updateRecruitmentNum(recruitmentNum);
          updateStepName('selectPartyDuration');
        }}
      >
        다음
      </button>
    </div>
  );
}
