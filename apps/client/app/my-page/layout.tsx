'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { userInfoStore } from '@/store/UserInfo';

import questionMarkImg from '@/public/images/question_mark.png';

import { loadTossPayments } from '@tosspayments/payment-sdk';
import AddPointModal from './components/AddPointModal';
import { usePathname, useRouter } from 'next/navigation';
import SettlementPreviewModal from './components/SettlementPreviewModal';

export default function MyPage({ children }: { children: React.ReactNode }) {
  const userInfo = userInfoStore((state: any) => state.userInfo);

  const router = useRouter();
  const pathTabName = usePathname().split('/').pop();

  const [openAddPointModal, setOpenAddPointModal] = useState<
    string | undefined
  >();
  const [rechargePoint, setRechargePoint] = useState<string | number>(10000);
  const [openSettlementPreviewModal, setOpenSettlementPreviewModal] = useState<
    string | undefined
  >();

  const tossPaymentApiClientKey =
    process.env.NEXT_PUBLIC_TOSS_PAYMENT_API_CLIENT_KEY;

  if (!tossPaymentApiClientKey) {
    throw new Error('Toss Payments API client key is not defined');
  }

  const payment = () => {
    // 결제창 객체 생성
    loadTossPayments(tossPaymentApiClientKey).then((tossPayments) => {
      tossPayments.requestPayment('카드', {
        amount:
          typeof rechargePoint === 'number'
            ? rechargePoint
            : Number(rechargePoint),
        orderId: generateTimestampedRandomString(),
        orderName: '버디 포인트',
        customerName: userInfo.username,
        successUrl: 'http://localhost:3000/payments/success',
        failUrl: 'http://localhost:3000/payments/fail',
      });
    });
  };

  // 주문번호 생성 함수
  function generateTimestampedRandomString() {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');

    // 예: 202405131953010004
    const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;

    // 필요한 경우 추가 숫자 생성 (길이를 맞추기 위해)
    const randomNum = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');

    return `${timestamp}${randomNum}`;
  }

  return (
    <div className='w-full bg-[#f4f4f9] h-screen'>
      <div className='w-[60rem] mx-auto pt-12 pb-16'>
        <div className='flex justify-between'>
          <div className='w-[14rem] flex flex-col gap-y-4'>
            <div className='w-full flex flex-col gap-y-1 bg-white px-3 py-4 rounded-[0.6rem]'>
              <button
                className='flex items-center text-[0.825rem] p-2 rounded-lg hover:bg-[#f6f6f6]'
                onClick={() => router.push('/notices')}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='22.5'
                  height='22.5'
                  viewBox='0 0 24 24'
                >
                  <g>
                    <path
                      fill='none'
                      d='M0 0H24V24H0z'
                      transform='translate(0.018 -0.018) translate(-0.018 0.018)'
                    />
                  </g>
                  <g>
                    <path
                      fill='#222'
                      d='M21 11.948a3.413 3.413 0 0 0-2.421-3.254V4.686a1 1 0 0 0-1.392-.919L6.023 8.527H4.611A2.614 2.614 0 0 0 2 11.139v1.62a2.614 2.614 0 0 0 2.611 2.611H5.3c.153 1.264.652 3.355 2.283 4.348a3.756 3.756 0 0 0 1.955.589 3.213 3.213 0 0 0 1.583-.422 3.926 3.926 0 0 0 1.554-1.679l4.515 1.926a1 1 0 0 0 .943-.086 1 1 0 0 0 .449-.834V15.2A3.416 3.416 0 0 0 21 11.948zm-17 .81v-1.62a.612.612 0 0 1 .611-.611h.617v2.842h-.617A.612.612 0 0 1 4 12.758zm6.138 5.382a1.415 1.415 0 0 1-1.518-.132 3.23 3.23 0 0 1-1.179-2.035l3.382 1.442a1.856 1.856 0 0 1-.685.725zm6.441-.443l-4.172-1.78-5.179-2.209v-3.521L16.58 6.2v11.5zm2-4.741V10.94a1.417 1.417 0 0 1 0 2.016z'
                      transform='translate(0.018 -0.018)'
                    />
                  </g>
                </svg>
                <span className='ml-3'>공지사항</span>
              </button>
              <button
                className={`flex items-center text-[0.825rem] p-2 rounded-lg hover:bg-[#f6f6f6] ${
                  pathTabName === 'coupon' && 'fill-[#1c6cdb] text-[#1c6cdb]'
                }`}
                onClick={() => router.push('/my-page/coupon')}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  id='ic-coupon-24'
                  width='22.5'
                  height='22.5'
                  viewBox='0 0 24 24'
                  className='fill-inherit'
                >
                  <g id='레이어_3' transform='translate(-0.016 -0.018)'>
                    <path
                      id='사각형_3694'
                      fill='none'
                      d='M0 0H24V24H0z'
                      transform='translate(0.016 0.018)'
                    />
                  </g>
                  <g id='레이어_1' transform='translate(-0.016 -0.018)'>
                    <g id='그룹_2321'>
                      <path
                        id='패스_4028'
                        d='M20.217 4.739H16.3a1 1 0 0 0-1 1 .565.565 0 1 1-1.13 0 1 1 0 0 0-1-1H3.783A1.785 1.785 0 0 0 2 6.522v10.956a1.785 1.785 0 0 0 1.783 1.783h9.391a1 1 0 0 0 1-1 .565.565 0 1 1 1.13 0 1 1 0 0 0 1 1h3.913A1.785 1.785 0 0 0 22 17.478V6.522a1.785 1.785 0 0 0-1.783-1.783zM20 17.261h-2.9a2.578 2.578 0 0 0-1.583-1.443V15a.75.75 0 0 0-1.5 0v.8a2.572 2.572 0 0 0-1.641 1.459H4V6.739h8.377A2.572 2.572 0 0 0 14.018 8.2V9a.75.75 0 0 0 1.5 0v-.818A2.576 2.576 0 0 0 17.1 6.739H20z'
                        className='cls-2'
                      />
                      <path
                        id='패스_4029'
                        d='M14.768 10.75a.75.75 0 0 0-.75.75v1a.75.75 0 0 0 1.5 0v-1a.75.75 0 0 0-.75-.75z'
                        className='cls-2'
                      />
                      <path
                        id='패스_4030'
                        d='M11.279 8.516H6.136a.75.75 0 1 0 0 1.5h5.143a.75.75 0 0 0 0-1.5z'
                        className='cls-2'
                      />
                      <path
                        id='패스_4031'
                        d='M11.279 11.25H6.136a.75.75 0 0 0 0 1.5h5.143a.75.75 0 0 0 0-1.5z'
                        className='cls-2'
                      />
                      <path
                        id='패스_4032'
                        d='M11.279 14H6.136a.75.75 0 0 0 0 1.5h5.143a.75.75 0 1 0 0-1.5z'
                        className='cls-2'
                      />
                    </g>
                  </g>
                </svg>
                <span className='ml-3 text-inherit'>쿠폰</span>
              </button>
            </div>

            <div className='w-full flex flex-col gap-y-9 bg-white px-3 py-4 rounded-[0.6rem]'>
              <div className='w-full flex flex-col gap-y-1 items-start'>
                <p className='flex items-center text-[0.825rem] font-bold p-2 rounded-lg'>
                  회원 정보 관리
                </p>
                <button
                  className={`w-full flex items-center text-xs font-normal p-2 rounded-lg hover:bg-[#f6f6f6] ${
                    pathTabName === 'manage-account' &&
                    'fill-[#1c6cdb] text-[#1c6cdb]'
                  }`}
                  onClick={() => router.push('/my-page/manage-account')}
                >
                  정보 수정
                </button>
                {/* <button
                  className={`w-full flex items-center text-xs font-normal p-2 rounded-lg hover:bg-[#f6f6f6] ${
                    pathTabName === 'modify-pin' &&
                    'fill-[#1c6cdb] text-[#1c6cdb]'
                  }`}
                  onClick={() => router.push('/my-page/modify-pin')}
                >
                  PIN 재설정
                </button> */}
              </div>

              <div className='w-full flex flex-col gap-y-1 items-start'>
                <p className='flex items-center text-[0.825rem] font-bold p-2 rounded-lg'>
                  커뮤니티 관리
                </p>
                <button
                  className={`w-full flex items-center text-xs font-normal p-2 rounded-lg hover:bg-[#f6f6f6] ${
                    pathTabName === 'community-history' &&
                    'fill-[#1c6cdb] text-[#1c6cdb]'
                  }`}
                  onClick={() => router.push('/my-page/community-history')}
                >
                  내가 쓴 게시글
                </button>
                {/* <button
                  className={`w-full flex items-center text-xs font-normal p-2 rounded-lg hover:bg-[#f6f6f6] ${
                    pathTabName === 'modify-pin' &&
                    'fill-[#1c6cdb] text-[#1c6cdb]'
                  }`}
                  onClick={() => router.push('/my-page/modify-pin')}
                >
                  PIN 재설정
                </button> */}
              </div>

              <div className='flex flex-col gap-y-1 items-start'>
                <p className='flex items-center text-[0.825rem] font-bold p-2 rounded-lg'>
                  정산 관리
                </p>
                <button
                  className={`w-full flex items-center text-xs font-normal p-2 rounded-lg hover:bg-[#f6f6f6] ${
                    pathTabName === 'payment-method' &&
                    'fill-[#1c6cdb] text-[#1c6cdb]'
                  }`}
                  onClick={() => {
                    alert('개발 예정입니다 💻');
                    // router.push('/my-page/payment-method');
                  }}
                >
                  결제 수단 관리
                </button>

                <button
                  className={`w-full flex items-center text-xs font-normal p-2 rounded-lg hover:bg-[#f6f6f6] ${
                    pathTabName === 'payment-history' &&
                    'fill-[#1c6cdb] text-[#1c6cdb]'
                  }`}
                  onClick={() => router.push('/my-page/payment-history')}
                >
                  정산 내역
                </button>
              </div>
            </div>
          </div>

          {children}

          <div className='w-[14rem] flex flex-col gap-y-4'>
            <div className='w-full flex flex-col gap-y-5 bg-white px-2 py-[0.375rem] rounded-[0.6rem]'>
              <button
                className='flex items-center text-[0.825rem] p-2 rounded-lg hover:text-[#1c6cdb] hover:fill-[#1c6cdb]'
                onClick={() => setOpenSettlementPreviewModal('default')}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  id='ic-receipt'
                  width='22.5'
                  height='22.5'
                  viewBox='0 0 24 24'
                >
                  <path id='사각형_4012' fill='none' d='M0 0H24V24H0z' />
                  <g id='그룹_2825'>
                    <path
                      id='패스_4194'
                      d='M13.523 7.441H7.5a1 1 0 0 0 0 2h6.024a1 1 0 1 0 0-2z'
                      className='cls-2'
                    />
                    <path
                      id='패스_4195'
                      d='M13.523 10.959H7.5a1 1 0 0 0 0 2h6.024a1 1 0 1 0 0-2z'
                      className='cls-2'
                    />
                    <path
                      id='패스_4196'
                      d='M13.523 14.429H7.5a1 1 0 0 0 0 2h6.024a1 1 0 0 0 0-2z'
                      className='cls-2'
                    />
                    <path
                      id='패스_4197'
                      d='M21 14.375h-2.978V5.433A3.007 3.007 0 0 0 14.955 2.5H6.066A3.007 3.007 0 0 0 3 5.433v13.054a3.007 3.007 0 0 0 3.066 2.935h13.217A2.963 2.963 0 0 0 22 18.269v-2.893a1 1 0 0 0-1-1.001zM6.066 19.421A1.008 1.008 0 0 1 5 18.486V5.433A1.009 1.009 0 0 1 6.066 4.5h8.889a1.009 1.009 0 0 1 1.067.936V18.5a2.852 2.852 0 0 0 .163.918H6.066zM20 18.268c0 .66-.379 1.153-.717 1.153h-.334a.924.924 0 0 1-.927-.918v-2.128H20z'
                      className='cls-2'
                    />
                  </g>
                </svg>

                <span className='ml-2 text-inherit font-semibold'>
                  정산일 미리보기
                </span>
              </button>
              {openSettlementPreviewModal && (
                <SettlementPreviewModal
                  openSettlementPreviewModal={openSettlementPreviewModal}
                  setOpenSettlementPreviewModal={setOpenSettlementPreviewModal}
                />
              )}
            </div>

            <div className='w-full flex flex-col gap-y-10 bg-white px-5 pt-6 pb-4 rounded-[0.6rem]'>
              <div className='flex flex-col gap-y-2 items-start'>
                <div className='text-sm font-bold'>
                  <div className='flex items-center gap-x-1'>
                    <span>나의 버디 포인트</span>
                    {/* <Image
                      src={questionMarkImg}
                      alt='questionMarkImg'
                      width={22.5}
                      height={0}
                      quality={100}
                      className='rounded-full'
                    /> */}
                  </div>
                </div>

                <div className='mt-5 w-full flex justify-between py-[0.325rem] border-b'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='22.5'
                    height='22.5'
                    viewBox='0 0 18 18'
                  >
                    <path
                      data-name='사각형 4837'
                      style={{ fill: 'none' }}
                      d='M0 0h18v18H0z'
                    />
                    <g data-name='그룹 4902'>
                      <circle
                        cx='8'
                        cy='8'
                        r='8'
                        style={{ fill: '#1c6cdb' }}
                        transform='translate(1.013 1)'
                      />
                      <path
                        data-name='패스 4408'
                        d='M10.4 5.309H7.751a1.165 1.165 0 0 0-1.165 1.165v7.668a1.165 1.165 0 0 0 1.165 1.165h.076a1.165 1.165 0 0 0 1.165-1.165v-2.168h1.4a3.333 3.333 0 0 0 0-6.665zm-.212 4.533h-.837a.368.368 0 0 1-.368-.368V7.81a.368.368 0 0 1 .368-.368h.832a1.2 1.2 0 0 1 0 2.4z'
                        transform='translate(-.79 -1.23)'
                        style={{ fill: '#fff' }}
                      />
                    </g>
                  </svg>

                  <span className='font-semibold text-base'>
                    {Number(userInfo.point).toLocaleString()}
                  </span>
                </div>

                <div className='flex flex-col gap-y-3 w-full mt-2'>
                  <button
                    className='px-2 py-[0.625rem] text-xs text-[#5880f8] font-medium bg-[#eaeffe] rounded-lg hover:bg-[#e0e5f4]'
                    onClick={() => {
                      alert('개발 예정입니다 💻');
                    }}
                  >
                    인출하기
                  </button>

                  <button
                    className='px-2 py-[0.625rem] text-xs text-[#5880f8] font-medium bg-[#eaeffe] rounded-lg hover:bg-[#e0e5f4]'
                    onClick={() => {
                      setOpenAddPointModal('default');
                    }}
                  >
                    충전하기
                  </button>

                  {openAddPointModal && (
                    <AddPointModal
                      openAddPointModal={openAddPointModal}
                      setOpenAddPointModal={setOpenAddPointModal}
                      payment={payment}
                      setRechargePoint={setRechargePoint}
                      rechargePoint={rechargePoint}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
