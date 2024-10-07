'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import axiosInstance from '@/utils/axiosInstance';
import SettlementPreviewModal from './components/SettlementPreviewModal';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { UserInfoStore } from '@/store/UserInfo';
import { useQuery } from '@tanstack/react-query';
import { partySelectedPlanInfos } from '@/data/partySelectedPlanInfos';
import questionMarkImg from '@/public/images/question_mark.png';
import AddPointModal from './components/AddPointModal';
import { useRouter } from 'next/navigation';
import warningGrayImg from '@/public/images/warning_icon_gray.png';

const fetchMyPartyInfo = ({ queryKey }: any) => {
  const planId = queryKey[1];
  return axiosInstance.get(`/private/party/my`);
};

const getIconImg = (planId: number) => {
  for (const plan of partySelectedPlanInfos) {
    for (const detail of plan.planDetailInfos) {
      if (detail.id === planId) {
        return plan.iconImg;
      }
    }
  }
  return null; // 아이콘을 찾지 못했을 경우 null 반환
};

const calculateDaysUntil = (dateString: string) => {
  const today = new Date();
  const targetDate = new Date(dateString);

  // 오늘 날짜를 자정으로 설정
  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  // 타겟 날짜를 자정으로 설정
  const targetDateMidnight = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );

  const timeDiff = targetDateMidnight.getTime() - todayMidnight.getTime();
  const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24));
  return daysLeft;
};

export default function MyParty() {
  const userInfo = UserInfoStore((state: any) => state.userInfo);

  const { isPending, data } = useQuery({
    queryKey: ['myPartyInfo'],
    queryFn: fetchMyPartyInfo,
  });

  const resData = data?.data.response;

  const [openAddPointModal, setOpenAddPointModal] = useState<
    string | undefined
  >();
  const [rechargePoint, setRechargePoint] = useState<string | number>(10000);
  const [openSettlementPreviewModal, setOpenSettlementPreviewModal] = useState<
    string | undefined
  >();

  const router = useRouter();

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

  function generateTimestampedRandomString() {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');

    const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    const randomNum = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');

    return `${timestamp}${randomNum}`;
  }

  return (
    <div className='flex justify-center bg-[#f4f4f9] text-center h-screen'>
      <div className='flex justify-between gap-x-4 w-[50rem] mt-14 mb-[7.5rem]'>
        <div className='w-full'>
          <p className='text-[#333d4b] text-[1.375rem] font-semibold text-left'>
            나의 파티
          </p>
          <div className='mt-8 flex flex-wrap gap-4'>
            {resData?.length === 0 ? (
              <div className='mt-20 w-full flex flex-col gap-y-3 items-center'>
                <Image
                  src={warningGrayImg}
                  alt='warning icon image'
                  width={35}
                  height={35}
                  quality={100}
                />
                <p className='text-[#9b9b9b] text-xs'>
                  운영/가입 중인 파티가 존재하지 않아요.
                </p>
              </div>
            ) : (
              <>
                {resData?.map((partyInfo: any, index: number) => {
                  const iconImg = getIconImg(partyInfo.plan.planId);
                  const daysUntilEnd = calculateDaysUntil(
                    partyInfo.party.endDate
                  );
                  const daysUntilStart = calculateDaysUntil(
                    partyInfo.party.startDate
                  );
                  let startDateMessage = '';
                  let endDateMessage = '';

                  if (daysUntilStart > 0) {
                    startDateMessage = `${daysUntilStart}일 후 시작`;
                  } else {
                    if (daysUntilEnd > 0) {
                      endDateMessage = `${daysUntilEnd}일 후 종료`;
                    } else if (daysUntilEnd === 0) {
                      endDateMessage = '오늘 종료';
                    } else {
                      endDateMessage = '종료됨';
                    }
                  }

                  const today = new Date();
                  const startDate = new Date(partyInfo.party.startDate);
                  const endDate = new Date(partyInfo.party.endDate);

                  const isTodayEndDate =
                    today.getFullYear() === endDate.getFullYear() &&
                    today.getMonth() === endDate.getMonth() &&
                    today.getDate() === endDate.getDate();

                  const isWithinPartyDuration =
                    today.getTime() >= startDate.getTime() &&
                    today.getTime() <= endDate.getTime();

                  const isSameDayAsStartDate =
                    today.getFullYear() === startDate.getFullYear() &&
                    today.getMonth() === startDate.getMonth() &&
                    today.getDate() === startDate.getDate();

                  return (
                    <button
                      key={index}
                      className='relative w-[10rem] h-[10rem] flex flex-col justify-center items-center gap-y-2 bg-white rounded-xl hover:scale-105 hover:shadow-md duration-300 ease-out'
                      onClick={() =>
                        router.push(`/my-party/${partyInfo.party.partyId}`)
                      }
                    >
                      <Image
                        src={iconImg || questionMarkImg} // 아이콘 이미지가 없을 경우 대체 이미지 사용
                        alt='plan icon image'
                        width={80}
                        height={0}
                        quality={100}
                        className='border-4 p-[0.375rem] rounded-full'
                      />

                      {userInfo.memberId ===
                        partyInfo.party.partyLeaderMemberId && (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          id='img-flag-crown'
                          width='40.007'
                          height='48'
                          viewBox='0 0 40.007 48'
                          fill='#fff'
                          className='absolute top-[-0.275rem] right-2'
                        >
                          <path
                            id='패스_2189'
                            fill='#074aa8'
                            d='M0 0l5 8V0z'
                            transform='translate(8) rotate(90)'
                          />
                          <path
                            id='빼기_37'
                            fill='#3a8af9'
                            d='M32 48l-16-8.777L0 48V0h25a7.008 7.008 0 0 1 7 7v41z'
                            transform='translate(8.009 0)'
                          />
                          <g id='ic-crown-24' transform='translate(12 8)'>
                            <g id='레이어_3' transform='translate(0)'>
                              <path
                                id='사각형_3695'
                                fill='none'
                                d='M0 0H24V24H0z'
                                transform='translate(0)'
                              />
                            </g>
                            <g id='레이어_1' transform='translate(2.467 3)'>
                              <path
                                id='패스_4033'
                                d='M16.412 21H7.671a2.393 2.393 0 0 1-2.235-1.689l-1.989-7.006a1.349 1.349 0 0 1 .435-1.6 1.35 1.35 0 0 1 1.651.145l3.134 2.281L10.7 8.992a1.5 1.5 0 0 1 1.339-.928 1.5 1.5 0 0 1 1.338.928l2.036 4.139 3.137-2.281a1.292 1.292 0 0 1 2.086 1.455l-1.989 7.006A2.393 2.393 0 0 1 16.412 21zM5.891 13.584l1.47 5.181a.431.431 0 0 0 .31.235h8.741a.431.431 0 0 0 .311-.235l1.471-5.181-1.753 1.275a1.814 1.814 0 0 1-2.736-.676L12.041 10.8l-1.663 3.381a1.814 1.814 0 0 1-2.736.676z'
                                className='cls-4'
                                transform='translate(-2.5 -3)'
                              />
                              <path
                                id='패스_4034'
                                d='M13.5 4.5A1.5 1.5 0 1 1 12 3a1.5 1.5 0 0 1 1.5 1.5z'
                                className='cls-4'
                                transform='translate(-2.5 -3)'
                              />
                              <path
                                id='패스_4035'
                                d='M5.5 7.037A1.5 1.5 0 1 1 4 5.536a1.5 1.5 0 0 1 1.5 1.501z'
                                className='cls-4'
                                transform='translate(-2.5 -3)'
                              />
                              <path
                                id='패스_4036'
                                d='M21.5 7.037a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5z'
                                className='cls-4'
                                transform='translate(-2.5 -3)'
                              />
                            </g>
                          </g>
                        </svg>
                      )}

                      <div className='flex flex-col items-center'>
                        <p className='font-semibold'>{partyInfo.plan.name}</p>
                        <p className='text-xs font-light text-[#7f7f7f]'>
                          {startDate > today && !isSameDayAsStartDate
                            ? startDateMessage
                            : isTodayEndDate
                            ? '오늘 종료'
                            : isWithinPartyDuration || isSameDayAsStartDate
                            ? `${daysUntilEnd}일 후 종료`
                            : endDateMessage}
                        </p>
                        {startDate > today && !isSameDayAsStartDate ? (
                          <p className='mt-1 w-[3rem] text-xs text-[#005500] font-medium rounded-[0.2rem] bg-[#eaf8e6]'>
                            예정
                          </p>
                        ) : isWithinPartyDuration || isSameDayAsStartDate ? (
                          <p className='mt-1 w-[3rem] text-xs text-[#5880f8] font-medium rounded-[0.2rem] bg-[#eaeffe]'>
                            파티중
                          </p>
                        ) : null}
                      </div>
                    </button>
                  );
                })}
              </>
            )}
          </div>
        </div>
        <div className='w-[21.5rem] flex flex-col gap-y-4'>
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
  );
}
