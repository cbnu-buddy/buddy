'use client';

import { Modal } from 'flowbite-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { useQueries } from '@tanstack/react-query';

interface SettlementPreviewModalProps {
  openSettlementPreviewModal: string | undefined;
  setOpenSettlementPreviewModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

// 사용자 다음 달 정산 정보 미리보기 API
const fetchNextMonthMemberPaymentInfo = () => {
  return axiosInstance.get(`/private/member/payments-preview`);
};

// 파티장 다음 달 정산 정보 미리보기 API
const fetchNextMonthLeaderPaymentInfo = () => {
  return axiosInstance.get(`/private/member/leader/payments-preview`);
};

export default function SettlementPreviewModal({
  openSettlementPreviewModal,
  setOpenSettlementPreviewModal,
}: SettlementPreviewModalProps) {
  const [nextMonthFirstDay, setNextMonthFirstDay] = useState('');

  const results = useQueries({
    queries: [
      {
        queryKey: ['nextMonthMemberPaymentInfo'],
        queryFn: fetchNextMonthMemberPaymentInfo,
      },
      {
        queryKey: ['nextMonthLeaderPaymentInfo'],
        queryFn: fetchNextMonthLeaderPaymentInfo,
      },
    ],
  });

  const nextMonthMemberPaymentInfo = results[0].data?.data.response;
  const nextMonthLeaderPaymentInfo = results[1].data?.data.response;

  useEffect(() => {
    AOS.init();

    const getNextMonthFirstDay = () => {
      const now = new Date();
      const nextMonth = now.getMonth() + 1;
      const year = now.getFullYear();
      const firstDayOfNextMonth = new Date(year, nextMonth, 1);

      // 날짜를 원하는 형식으로 포맷팅
      const formattedDate = `${firstDayOfNextMonth.getFullYear()}.${(
        firstDayOfNextMonth.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}.${firstDayOfNextMonth
        .getDate()
        .toString()
        .padStart(2, '0')}`;

      return formattedDate;
    };

    setNextMonthFirstDay(getNextMonthFirstDay());
  }, []);

  return (
    <Modal
      size='sm'
      show={openSettlementPreviewModal === 'default'}
      data-aos='fade-zoom'
      data-aos-duration='300'
    >
      <Modal.Body className='pb-0 spacing-y-28'>
        <p className='text-lg font-bold'>버디 정산일 미리보기</p>

        <p className='mt-2 text-[0.5rem] text-[#656565] font-light'>
          오늘 기준 다음 버디 정산일({nextMonthFirstDay})의
          <br /> 예상 결제/적립 내역입니다.
        </p>

        <div className='w-full my-3 pt-4 pb-10 border-y-4'>
          <div className='flex items-center gap-x-[0.375rem] text-[0.8rem] font-medium'>
            <span>{nextMonthFirstDay}</span>
            <span className='text-[0.5rem] rounded-sm text-[#1c6cdb] bg-[#eaeffe] px-1'>
              정산일
            </span>
          </div>

          <div className='w-full my-3 border' />

          <div className='mt-5'>
            <div className='flex justify-between'>
              <span className='text-[0.8rem] font-semibold'>
                가입한 파티 요금 결제
              </span>
              <span className='text-[0.8rem] font-semibold'>
                <span>
                  {Number(
                    nextMonthMemberPaymentInfo?.totalAmount
                  ).toLocaleString()}
                </span>{' '}
                P
              </span>
            </div>

            <div className='mt-3 flex flex-col gap-y-2'>
              {nextMonthLeaderPaymentInfo?.parties?.length === 0 ? (
                <p className='mt-5 text-center text-[#9b9b9b] text-xs font-light'>
                  파티원으로 가입 중인 파티가 없어요.
                </p>
              ) : (
                nextMonthMemberPaymentInfo?.parties?.map(
                  (partyInfo: any, idx: number) => (
                    <div
                      className='ml-3 flex justify-between text-[#656565]'
                      key={idx}
                    >
                      <span className='text-[0.5rem] font-light text-inherit'>
                        {partyInfo.name}
                      </span>
                      <span className='text-[0.5rem] font-light text-inherit'>
                        {Number(partyInfo.monthlyFee).toLocaleString()}
                      </span>
                    </div>
                  )
                )
              )}
            </div>
          </div>

          <div className='mt-12'>
            <div className='flex justify-between'>
              <span className='text-[0.8rem] font-semibold'>
                파티장 요금 정산
              </span>
              <span className='text-[0.8rem] font-semibold'>
                <span>
                  {Number(
                    nextMonthLeaderPaymentInfo?.totalAmount
                  ).toLocaleString()}
                </span>{' '}
                P
              </span>
            </div>

            <div className='mt-3 flex flex-col gap-y-2'>
              {nextMonthLeaderPaymentInfo?.plans?.length === 0 ? (
                <p className='mt-5 text-center text-[#9b9b9b] text-xs font-light'>
                  파티장으로 운영 중인 파티가 없어요.
                </p>
              ) : (
                nextMonthLeaderPaymentInfo?.plans?.map(
                  (partyInfo: any, idx: number) => (
                    <div
                      className='ml-3 flex justify-between text-[#656565]'
                      key={idx}
                    >
                      <span className='text-[0.5rem] font-light text-inherit'>
                        {partyInfo.name}
                      </span>
                      <span className='text-[0.5rem] font-light text-inherit'>
                        {Number(partyInfo.totalMonthlyFee).toLocaleString()}
                      </span>
                    </div>
                  )
                )
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='border-none'>
        <button
          onClick={() => {
            setOpenSettlementPreviewModal(undefined);
          }}
          className='w-full text-white text-[0.8rem] bg-[#3a8af9] hover:bg-[#1c6cdb] duration-150 ease-out p-[0.825rem] rounded-[0.45rem] font-bold box-shadow'
        >
          확인
        </button>
      </Modal.Footer>
    </Modal>
  );
}
