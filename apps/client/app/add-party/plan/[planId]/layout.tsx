'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { AddPartyInfoStore } from '@/store/party/AddPartyInfo';
import axiosInstance from '@/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/app/loading';

interface DefaultProps {
  children: React.ReactNode;
  params: {
    planId: string;
  };
}

// 플랜 정보 조회 API
const fetchPlanInfo = ({ queryKey }: any) => {
  const planId = queryKey[1];
  return axiosInstance.get(`/private/plan/${planId}`);
};

const LottieDotLoading = dynamic(
  () => import('./components/LottieDotLoading'),
  {
    ssr: false,
  }
);

export default function AddPartyDetailLayout(props: DefaultProps) {
  const planId = props.params.planId;

  const partyInfo = AddPartyInfoStore((state: any) => state.partyInfo);
  const updateStepName = AddPartyInfoStore(
    (state: any) => state.updateStepName
  );

  const { isPending, data } = useQuery({
    queryKey: ['planInfo', planId],
    queryFn: fetchPlanInfo,
  });

  const resData = data?.data.response;

  // 페이지 접근 시 반드시 로그인 정보를 입력받는 단계에서부터 시작하도록 강제시킴
  useEffect(() => {
    updateStepName('inputAccount');
  }, [updateStepName]);

  if (isPending) return <Loading />;

  return (
    <div className='mt-[4.5rem] mb-[7.5rem] flex justify-center gap-x-[7rem]'>
      <div className='mt-16 flex flex-col gap-y-3 w-[16rem] text-[0.775rem] leading-[1.25] font-light'>
        <button
          disabled
          className='flex justify-between bg-[#f5f5f5] p-4 rounded-[0.625rem] text-[#656565]'
        >
          <span className='text-inherit'>공유 서비스</span>
          <span className='font-medium'>{resData?.name}</span>
        </button>
        <button
          className='relative flex justify-between bg-[#f5f5f5] p-4 rounded-[0.625rem] text-[#656565]'
          onClick={() => updateStepName('inputAccount')}
        >
          <span
            className={`${
              partyInfo.stepName === 'inputAccount' &&
              'text-[#3a8af9] font-semibold'
            }`}
          >
            로그인 정보 입력
          </span>
          {partyInfo.stepName === 'inputAccount' ? (
            <LottieDotLoading />
          ) : (
            <span className='font-medium text-center'>완료</span>
          )}
        </button>
        <button
          disabled={partyInfo.accountInfo.id === '' ? true : false}
          className={`relative flex justify-between ${
            partyInfo.accountInfo.id === '' && 'opacity-40'
          } bg-[#f5f5f5] p-4 rounded-[0.625rem] text-[#656565]`}
          onClick={() => updateStepName('selectRecruitmentNum')}
        >
          <span
            className={`${
              partyInfo.stepName === 'selectRecruitmentNum' &&
              'text-[#3a8af9] transition font-semibold'
            }`}
          >
            모집 인원 설정
          </span>
          {partyInfo.stepName === 'selectRecruitmentNum' ? (
            <LottieDotLoading />
          ) : (
            <span>
              {partyInfo.recruitmentNum === 0
                ? '-'
                : `${partyInfo.recruitmentNum}명`}
            </span>
          )}
        </button>
        <button
          disabled={partyInfo.recruitmentNum === 0 ? true : false}
          className={`relative flex justify-between ${
            partyInfo.recruitmentNum === 0 && 'opacity-40'
          } bg-[#f5f5f5] p-4 rounded-[0.625rem] text-[#656565]`}
          onClick={() => updateStepName('selectPartyDuration')}
        >
          <span
            className={`${
              partyInfo.stepName === 'selectPartyDuration' &&
              'text-[#3a8af9] transition font-semibold'
            }`}
          >
            파티 기간 설정
          </span>
          {partyInfo.stepName === 'selectPartyDuration' ? (
            <LottieDotLoading />
          ) : (
            <span>
              {partyInfo.durationMonth === 0
                ? '-'
                : partyInfo.startDate.split('-').join('.') +
                  '~' +
                  partyInfo.endDate.split('-').join('.')}
            </span>
          )}
        </button>
        <button
          disabled={partyInfo.durationMonth === 0 ? true : false}
          className={`relative flex justify-between ${
            partyInfo.durationMonth === 0 && 'opacity-40'
          } bg-[#f5f5f5] p-4 rounded-[0.625rem] text-[#656565]`}
          onClick={() => updateStepName('confirmPartyRule')}
        >
          <span>파티 규칙 확인</span>
          {partyInfo.stepName === 'confirmPartyRule' ? (
            <LottieDotLoading />
          ) : (
            <span>{true ? '-' : '2024.04.11~2024.10.10'}</span>
          )}
        </button>
      </div>
      {props.children}
    </div>
  );
}
