'use client';

import React, { useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { useQueries } from '@tanstack/react-query';
import PaymentAndTransferingReceiptModal from './components/PaymentAndTransferingReceiptModal';

interface PaymentAndTransferingInfoType {
  category: string;
  item: string;
  amount: number;
  createTime: string;
}

// 결제 내역 정보 목록 조회 API
const fetchPaymentHistory = () => {
  return axiosInstance.get(`/private/member/payments`);
};

// 포인트 내역 정보 목록 조회 API
const fetchPointHistory = () => {
  return axiosInstance.get(`/private/member/points`);
};

export default function PaymentHistory() {
  const results = useQueries({
    queries: [
      { queryKey: ['paymentHistory'], queryFn: fetchPaymentHistory },
      {
        queryKey: ['pointHistory'],
        queryFn: fetchPointHistory,
      },
    ],
  });

  const paymentHistory = results[0].data?.data?.response ?? [];
  const pointHistory = results[1].data?.data?.response ?? [];

  // 날짜를 "YYYY.MM.DD" 형식으로 변환하는 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const [tabName, setTabName] = useState('paymentAndTransfering');
  const [selectedPaymentAndTransferingInfo, setSelectedPaymentInfo] =
    useState<PaymentAndTransferingInfoType>();
  const [
    openPaymentAndTransferingReceiptModal,
    setOpenPaymentAndTransferingReceiptModal,
  ] = useState<string | undefined>();

  return (
    <div className='w-[30rem] flex flex-col gap-y-3'>
      <div className='w-full flex flex-col gap-y-4'>
        <div className='w-full flex flex-col items-start gap-y-[0.375rem] bg-white px-5 py-6 rounded-[0.6rem]'>
          <div className='w-full flex justify-start gap-x-5'>
            <button
              className={`mt-[0.1rem] font-semibold text-[0.9rem] ${
                tabName !== 'paymentAndTransfering' && 'text-[#b9b9b9]'
              }`}
              onClick={() => setTabName('paymentAndTransfering')}
            >
              결제/인출
            </button>

            <button
              className={`mt-[0.1rem] font-semibold text-[0.9rem] ${
                tabName !== 'point' && 'text-[#b9b9b9]'
              }`}
              onClick={() => setTabName('point')}
            >
              포인트
            </button>
          </div>

          <div className='w-full mt-3 border-[0.75px]' />

          <div className='w-full flex flex-col'>
            {tabName === 'paymentAndTransfering' && (
              <>
                <PaymentAndTransferingReceiptModal
                  openPaymentAndTransferingReceiptModal={
                    openPaymentAndTransferingReceiptModal
                  }
                  setOpenPaymentAndTransferingReceiptModal={
                    setOpenPaymentAndTransferingReceiptModal
                  }
                  paymentAndTransferingReceiptInfo={
                    selectedPaymentAndTransferingInfo
                  }
                />

                {paymentHistory.length === 0 ? (
                  <p className='mt-5 text-center text-[#9b9b9b] text-xs font-light'>
                    결제/인출 내역이 존재하지 않아요.
                  </p>
                ) : (
                  paymentHistory.map((paymentInfo: any, index: number) => (
                    <button
                      key={index}
                      className='flex justify-between py-5 border-b-[0.75px]'
                      onClick={() => {
                        setSelectedPaymentInfo(paymentInfo);
                        setOpenPaymentAndTransferingReceiptModal('default');
                      }}
                    >
                      <div className='flex gap-x-4'>
                        <span className='text-[#8b8b8b] text-[0.5rem] font-light'>
                          {formatDate(paymentInfo.createTime)}
                        </span>
                        <span className='text-[0.825rem]'>
                          {paymentInfo.item}
                        </span>
                      </div>

                      <div className='flex items-center gap-x-1'>
                        {paymentInfo.category === 'point' && (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            height='20px'
                            viewBox='0 -960 960 960'
                            width='20px'
                            fill='#1c6cdb'
                          >
                            <path d='M184.62-200q-27.62 0-46.12-18.5Q120-237 120-264.62v-430.76q0-27.62 18.5-46.12Q157-760 184.62-760h590.76q27.62 0 46.12 18.5Q840-723 840-695.38v430.76q0 27.62-18.5 46.12Q803-200 775.38-200H184.62ZM160-512.31h640v-95.38H160v95.38Z' />
                          </svg>
                        )}

                        <span
                          className={`text-[0.825rem] font-semibold ${
                            paymentInfo.category === 'transfer' &&
                            'text-red-500'
                          }`}
                        >
                          {paymentInfo.category === 'transfer' ? '+' : '-'}
                          {Number(paymentInfo.amount).toLocaleString()}원
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </>
            )}

            {tabName === 'point' && (
              <>
                {pointHistory.length === 0 ? (
                  <p className='mt-5 text-center text-[#9b9b9b] text-xs font-light'>
                    포인트 충전/사용 내역이 존재하지 않아요.
                  </p>
                ) : (
                  pointHistory.map((pointInfo: any, index: number) => (
                    <button
                      key={index}
                      className='flex justify-between py-5 border-b-[0.75px]'
                    >
                      <div className='flex gap-x-4'>
                        <span className='text-[#8b8b8b] text-[0.5rem] font-light'>
                          {formatDate(pointInfo.createTime)}
                        </span>
                        <div className='flex flex-col gap-y-1 text-left'>
                          <p className='text-[0.825rem]'>버디 포인트 충전</p>
                          <p className='text-[0.5rem] text-[#8b8b8b]'>
                            {pointInfo.item}
                          </p>
                        </div>
                      </div>

                      <div className='flex items-center gap-x-1'>
                        <span className='text-[0.825rem] font-semibold text-red-500'>
                          +{Number(pointInfo.point).toLocaleString()}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
