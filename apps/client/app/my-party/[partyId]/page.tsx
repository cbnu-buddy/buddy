'use client';

import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

import dynamic from 'next/dynamic';

import bookImg from '@/public/images/book.png';
import emptyUserProfileImg from '@/public/images/default_user_profile_gray_img.png';
import leaderUserdefaultProfileImg from '@/public/images/default_user_profile_blue_img.png';
import defaultUserProfileImg from '@/public/images/default_user_profile_green_img.png';
import { usePathname } from 'next/navigation';
import { partySelectedPlanInfos } from '@/data/partySelectedPlanInfos';
import LeavePartyModal from './components/LeavePartyModal';
import Link from 'next/link';
import axiosInstance from '@/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { formatDate } from '@/utils/formatDate';
import Loading from '@/app/loading';
import questionMarkImg from '@/public/images/question_mark.png';
import { userInfoStore } from '@/store/UserInfo';
import { Toast } from 'flowbite-react';

import ModifyLeaderAccountInfoModal from './components/ModifyLeaderAccountInfoModal';
import ModifyPartyRecruitmentNumModal from './components/ModifyPartyRecruitmentNumModal';
import DisbandPartyModal from './components/DisbandPartyModal';

// 파티 정보 조회 API
const fetchPartyDetailInfo = ({ queryKey }: any) => {
  const planId = queryKey[1];
  return axiosInstance.get(`/private/party/${planId}`);
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

const getPlanHomePageUrl = (planId: number) => {
  for (const plan of partySelectedPlanInfos) {
    for (const detail of plan.planDetailInfos) {
      if (detail.id === planId) {
        return plan.homePageUrl;
      }
    }
  }
  return '#'; // 기본값으로 '#' 반환
};

const calculateDaysUntilNextMonth = () => {
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const timeDiff = nextMonth.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysLeft;
};

const getPartyStatus = (startDate: string, endDate: string) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (today < start) return '예정';
  if (today > end) return '종료됨';
  return '파티중';
};

const LottieCrown = dynamic(() => import('./components/LottieCrown'), {
  ssr: false,
});

export default function PartyDetail() {
  const userInfo = userInfoStore((state: any) => state.userInfo);

  const partyId = usePathname().split('/').pop() || ''; // Ensure partyId is never undefined

  const { isPending, data } = useQuery({
    queryKey: ['unMatchedPlanPartyInfo', partyId],
    queryFn: fetchPartyDetailInfo,
    retry: 0,
  });

  const resData = data?.data.response;

  const [
    isOpenPaymentScheduleGuideWindow,
    setIsOpenPaymentScheduleGuideWindow,
  ] = useState(false);
  const [isDropdownMousedown, setIsDropdownMousedown] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isClickedShowLeaderAccountInfo, setIsClickedShowLeaderAccountInfo] =
    useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [copyType, setCopyType] = useState('');
  const [openLeavePartyModal, setOpenLeavePartyModal] = useState<
    string | undefined
  >();
  const [openDisbandPartyModal, setOpenDisbandPartyModal] = useState<
    string | undefined
  >();
  const [
    openModifyLeaderAccountInfoModal,
    setOpenModifyLeaderAccountInfoModal,
  ] = useState<string | undefined>();
  const [
    openModifyPartyRecruitmentNumModal,
    setOpenModifyPartyRecruitmentNumModal,
  ] = useState<string | undefined>();
  const [isToastClosing, setIsToastClosing] = useState(false);
  const [isOpenCopyCompleteToast, setIsOpenCopyCompleteToast] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownMousedown(true);
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (resData?.party.partyLeaderMemberId === userInfo.memberId)
      setIsClickedShowLeaderAccountInfo(true);
  }, [resData, userInfo]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mouseup', () => {
      if (setIsDropdownMousedown) setIsDropdownMousedown(false);
    });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mouseup', () => {
        if (setIsDropdownMousedown) setIsDropdownMousedown(false);
      });
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    if (isOpenCopyCompleteToast) {
      const fadeOutTimer = setTimeout(() => {
        setIsToastClosing(true);
      }, 3000); // 3초 후에 toast-fade-out 클래스 추가

      const closeTimer = setTimeout(() => {
        setIsOpenCopyCompleteToast(false);
        setIsToastClosing(false);
      }, 4500); // 4.5초 후에 토스트 닫기

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [isOpenCopyCompleteToast]);

  const daysUntilNextMonth = calculateDaysUntilNextMonth();
  const today = new Date();
  const startDate = new Date(resData?.party.startDate);
  const endDate = new Date(resData?.party.endDate);
  const isSameDayAsStartDate =
    today.getFullYear() === startDate.getFullYear() &&
    today.getMonth() === startDate.getMonth() &&
    today.getDate() === startDate.getDate();
  const isWithinPartyDuration = today >= startDate && today <= endDate;
  const partyStatus = getPartyStatus(
    resData?.party.startDate,
    resData?.party.endDate
  );

  const sortedMembers = resData?.party.members.sort((a: any, b: any) => {
    if (a.memberId === resData.party.partyLeaderMemberId) return -1;
    if (b.memberId === resData.party.partyLeaderMemberId) return 1;
    return 0;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsOpenCopyCompleteToast(false);

        setTimeout(() => {
          setIsOpenCopyCompleteToast(true);
        }, 50);
      })
      .catch(() => {
        alert('복사에 실패했습니다.');
      });
  };

  if (isPending || !userInfo) return <Loading />;

  return (
    <div className='flex justify-center bg-[#f4f4f9] text-center'>
      <div className='w-[43rem] mt-[2rem] mb-[7.5rem]'>
        <Link href='/my-party'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='27.5'
            viewBox='0 -960 960 960'
            width='27.5'
            fill='#656565'
          >
            <path d='m112.769-480 308.616 308.615q8.846 8.846 8.731 21.154-.116 12.308-8.962 21.154T400-120.231q-12.308 0-21.154-8.846L73.154-434.538Q63.46-444.231 59-456.154 54.538-468.077 54.538-480T59-503.846q4.461-11.923 14.154-21.616l305.692-305.692q8.846-8.846 21.269-8.731 12.424.116 21.27 8.962t8.846 21.154q0 12.308-8.846 21.154L112.769-480Z' />
          </svg>
        </Link>
        <div className='mt-[1.5rem] relative w-full flex flex-col items-center bg-white rounded-[0.625rem] pt-8 pb-4'>
          <Image
            src={getIconImg(resData?.plan.planId) || questionMarkImg}
            alt='main_2Image'
            width={55}
            height={0}
            quality={100}
            className='absolute top-[-1.5rem]'
          />
          <button
            className='absolute top-5 right-5 p-[0.1rem] hover:bg-[#f6f6f6] rounded-md'
            onMouseUp={() => {
              if (!isDropdownMousedown) setIsDropdownOpen(true);
            }}
            onClick={() => setIsDropdownMousedown(false)}
          >
            <div className='relative'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='31px'
                viewBox='0 -960 960 960'
                width='31px'
                fill='#282828'
              >
                <path d='M480-189.23q-24.75 0-42.37-17.63Q420-224.48 420-249.23q0-24.75 17.63-42.38 17.62-17.62 42.37-17.62 24.75 0 42.37 17.62Q540-273.98 540-249.23q0 24.75-17.63 42.37-17.62 17.63-42.37 17.63ZM480-420q-24.75 0-42.37-17.63Q420-455.25 420-480q0-24.75 17.63-42.37Q455.25-540 480-540q24.75 0 42.37 17.63Q540-504.75 540-480q0 24.75-17.63 42.37Q504.75-420 480-420Zm0-230.77q-24.75 0-42.37-17.62Q420-686.02 420-710.77q0-24.75 17.63-42.37 17.62-17.63 42.37-17.63 24.75 0 42.37 17.63Q540-735.52 540-710.77q0 24.75-17.63 42.38-17.62 17.62-42.37 17.62Z' />
              </svg>
            </div>
          </button>

          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className='window absolute top-[3.25rem] right-5 w-[8rem] bg-white p-[0.4rem] rounded-[0.625rem]'
            >
              {userInfo.memberId === resData?.party.partyLeaderMemberId ? (
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setOpenDisbandPartyModal('default');
                  }}
                  className='w-full text-start p-[0.4rem] text-[0.5rem] text-[#4a4a4a] hover:bg-[#f6f6f6] rounded-md'
                >
                  파티 해산하기
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setOpenLeavePartyModal('default');
                  }}
                  className='w-full text-start p-[0.4rem] text-[0.5rem] text-[#4a4a4a] hover:bg-[#f6f6f6] rounded-md'
                >
                  파티 탈퇴하기
                </button>
              )}

              {/* <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                    }}
                    className='w-full text-start p-[0.4rem] text-[0.5rem] text-[#4a4a4a] hover:bg-[#f6f6f6] rounded-md'
                  >
                    파티 동의 내역 확인
                  </button> */}
            </div>
          )}
          <DisbandPartyModal
            openDisbandPartyModal={openDisbandPartyModal}
            setOpenDisbandPartyModal={setOpenDisbandPartyModal}
            partyId={partyId}
          />
          <LeavePartyModal
            openLeavePartyModal={openLeavePartyModal}
            setOpenLeavePartyModal={setOpenLeavePartyModal}
            partyId={partyId}
          />
          <p className='mt-1 font-semibold text-[1.05rem]'>
            {resData?.plan.name}
          </p>
          <div className='mt-1 flex gap-x-[0.375rem]'>
            <span
              className={`mt-1 w-[2.75rem] py-[0.1rem] text-xs font-medium rounded-[0.2rem] ${
                isWithinPartyDuration || isSameDayAsStartDate
                  ? 'text-[#5880f8] bg-[#eaeffe]'
                  : today < startDate
                  ? 'text-[#005500] bg-[#eaf8e6]'
                  : 'text-[#808080] bg-[#f0f0f0]'
              }`}
            >
              {isWithinPartyDuration || isSameDayAsStartDate
                ? '파티중'
                : today < startDate
                ? '예정'
                : '종료됨'}
            </span>

            <span className='mt-1 w-[2.75rem] py-[0.1rem] text-xs text-white font-medium rounded-[0.2rem] bg-[#5880f8]'>
              {userInfo.memberId === resData?.party.partyLeaderMemberId ? (
                <>파티장</>
              ) : (
                <>파티원</>
              )}
            </span>
          </div>
        </div>

        <div className='mt-4 flex justify-between gap-x-4'>
          <div className='w-[20rem] flex flex-col gap-4'>
            <div className='flex flex-col items-start bg-white rounded-[0.625rem] px-5 py-6'>
              <p className='font-semibold'>파티 정보</p>

              <div className='mt-4 flex flex-col items-start gap-y-1'>
                <p className='text-[0.825rem] text-[#8b8b8b]'>파티 기간</p>
                <div className='flex gap-x-1 text-xs font-medium'>
                  <span>{formatDate(resData?.party.startDate)}</span> ~{' '}
                  <span>{formatDate(resData?.party.endDate)}</span>
                </div>
              </div>
            </div>

            <a
              target='_blank'
              href='http://localhost:3000/faq/24'
              className='flex justify-between bg-white rounded-[0.625rem] px-5 py-4'
            >
              <div className='flex flex-col items-start '>
                <p className='text-[#656565] text-xs font-light'>파티 가이드</p>
                <div className='mt-1 flex flex-col items-start gap-y-1'>
                  <p className='text-[0.825rem] text-left font-semibold'>
                    서비스 계정 <br />
                    성인인증 필요 시
                  </p>
                </div>
              </div>

              <Image
                src={bookImg}
                alt='hot image'
                width={62.5}
                height={0}
                quality={100}
                className='scale-[0.65] mr-[-1rem]'
              />
            </a>
          </div>

          <div className='w-full flex flex-col gap-y-4'>
            <div className='flex flex-col gap-y-5 items-start bg-white rounded-[0.625rem] px-5 py-6'>
              <p className='font-semibold'>결제 예정 파티 요금</p>

              <button
                className='w-full bg-[#f6f6f6] p-3 rounded-lg'
                onClick={() =>
                  setIsOpenPaymentScheduleGuideWindow(
                    !isOpenPaymentScheduleGuideWindow
                  )
                }
              >
                <div className='w-full flex justify-between items-center'>
                  <p className='text-xs font-semibold'>
                    📃 {daysUntilNextMonth}일 후 총{' '}
                    {Number(
                      Math.ceil(
                        resData?.plan.monthlyFee /
                          resData?.party.members?.length
                      )
                    ).toLocaleString()}
                    원이 결제될 예정이에요.
                  </p>

                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='27.5px'
                    viewBox='0 -960 960 960'
                    width='27.5px'
                    fill='#8b8b8b'
                    className={`${
                      isOpenPaymentScheduleGuideWindow
                        ? '-rotate-180'
                        : 'rotate-0'
                    } duration-200`}
                  >
                    <path d='M480-373.54q-7.23 0-13.46-2.31-6.23-2.3-11.85-7.92L274.92-563.54q-8.3-8.31-8.5-20.88-.19-12.58 8.5-21.27 8.7-8.69 21.08-8.69 12.38 0 21.08 8.69L480-442.77l162.92-162.92q8.31-8.31 20.89-8.5 12.57-.19 21.27 8.5 8.69 8.69 8.69 21.07 0 12.39-8.69 21.08L505.31-383.77q-5.62 5.62-11.85 7.92-6.23 2.31-13.46 2.31Z' />
                  </svg>
                </div>

                <div
                  className={`${
                    isOpenPaymentScheduleGuideWindow && 'mt-4 '
                  } text-[#656565] text-left flex flex-col gap-y-2 text-[0.5rem] leading-[1.5] font-extralight overflow-hidden transition-all duration-[400ms] ${
                    isOpenPaymentScheduleGuideWindow ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className='text-inherit'>
                    {`파티 시작일에는 첫 달 파티 요금과 파티 보증금이 결제될
                    거예요. 버디 머니 우선결제 옵션을 켜두셨다면 결제시
                    자동으로 버디 머니가 먼저 사용될테니 걱정 마세요.`}
                  </p>
                  <p className='text-inherit'>
                    {`
                      '첫 달 파티요금'은 파티 시작일부터 다음 버디 정산일까지의
                    파티 요금을 계산한 금액이고, '파티 보증금'은 약정 파티
                    기간(약 12개월)에 대한 금액으로 파티가 끝나면 100%
                    환급됩니다.
                  `}
                  </p>
                </div>
              </button>
            </div>

            <div className='flex flex-col gap-y-5 items-start bg-white rounded-[0.625rem] px-5 py-6'>
              <div className='w-full flex justify-between items-center'>
                <p className='font-semibold'>로그인 정보</p>
                {userInfo.memberId === resData?.party.partyLeaderMemberId && (
                  <button
                    onClick={() =>
                      setOpenModifyLeaderAccountInfoModal('default')
                    }
                    className='bg-[#f6f6f6] hover:bg-[#eaeaea] text-[0.5rem] font-semibold rounded-full px-3 py-1'
                  >
                    변경하기
                  </button>
                )}

                <ModifyLeaderAccountInfoModal
                  openModifyLeaderAccountInfoModal={
                    openModifyLeaderAccountInfoModal
                  }
                  setOpenModifyLeaderAccountInfoModal={
                    setOpenModifyLeaderAccountInfoModal
                  }
                  partyId={partyId}
                />
              </div>

              {userInfo.memberId !== resData?.party.partyLeaderMemberId ? (
                isWithinPartyDuration || isSameDayAsStartDate ? (
                  !isClickedShowLeaderAccountInfo && (
                    <button
                      onClick={() => setIsClickedShowLeaderAccountInfo(true)}
                      className='w-full bg-[#eaeffe] p-4 rounded-lg'
                    >
                      <div className='w-full flex justify-center items-center gap-x-1'>
                        <p className='text-xs text-[#1c6cdb] font-semibold'>
                          아이디, 비밀번호 확인하기
                        </p>

                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          height='20px'
                          viewBox='0 -960 960 960'
                          width='20px'
                          fill='#1c6cdb'
                        >
                          <path d='M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h360v-80q0-50-35-85t-85-35q-42 0-73.5 25.5T364-751q-4 14-16.5 22.5T320-720q-17 0-28.5-11t-8.5-26q14-69 69-116t128-47q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM240-160v-400 400Z' />
                        </svg>
                      </div>
                    </button>
                  )
                ) : (
                  <div className='w-full bg-[#f6f6f6] p-4 rounded-lg'>
                    <div className='w-full flex justify-center items-center gap-x-1'>
                      <p className='text-xs text-[#9d9d9d] font-semibold'>
                        파티 시작일에 확인할 수 있어요.
                      </p>

                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='20px'
                        viewBox='0 -960 960 960'
                        width='20px'
                        fill='#9d9d9d'
                      >
                        <path d='M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z' />
                      </svg>
                    </div>
                  </div>
                )
              ) : (
                <></>
              )}

              {isOpenCopyCompleteToast && (
                <Toast
                  className={`w-[15rem] fixed bottom-14 left-14 bg-[#222222] py-3 ${
                    isToastClosing ? 'toast-fade-out' : 'toast-fade-in'
                  }`}
                >
                  <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-green-500 dark:bg-green-800 dark:text-green-200'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='27.5px'
                      viewBox='0 -960 960 960'
                      width='27.5px'
                      fill='#75d5ad'
                    >
                      <path d='m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z' />
                    </svg>
                  </div>
                  <div className='ml-1 text-[0.825rem] font-medium text-white'>
                    {copyType}가 복사되었습니다.
                  </div>
                </Toast>
              )}

              {isClickedShowLeaderAccountInfo && (
                <div className='w-full flex flex-col gap-y-2'>
                  <div className='w-full flex justify-between items-center text-[#8b8b8b] fill-[#8b8b8b] bg-[#f6f6f6] pl-4 pr-2 py-3 rounded-lg'>
                    <span className='text-inherit font-light text-[0.5rem]'>
                      아이디
                    </span>
                    <div className='flex items-center gap-x-3'>
                      <span className='text-[0.825rem] font-medium'>
                        {resData?.party.account.id}
                      </span>
                      <button
                        onClick={() => {
                          setCopyType('아이디');
                          copyToClipboard(resData?.party.account.id);
                        }}
                        className='p-[0.425rem] rounded-md hover:bg-[#eaeaea]'
                      >
                        <svg
                          aria-hidden='true'
                          viewBox='0 0 16 16'
                          fill='currentColor'
                          height='14'
                          width='14'
                          className='fill-inherit'
                        >
                          <path
                            fillRule='evenodd'
                            d='M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z'
                          ></path>
                          <path
                            fillRule='evenodd'
                            d='M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z'
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className='w-full flex justify-between items-center text-[#8b8b8b] fill-[#8b8b8b] bg-[#f6f6f6] pl-4 pr-2 py-3 rounded-lg'>
                    <span className='text-inherit font-light text-[0.5rem]'>
                      비밀번호
                    </span>
                    <div className='flex items-center gap-x-3'>
                      <span className='text-[0.825rem] font-medium'>
                        {isPasswordVisible
                          ? resData?.party.account.pwd
                          : '********'}
                      </span>

                      <div className='flex items-center gap-x-1'>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setIsPasswordVisible((prev) => !prev);
                          }}
                          className='p-[0.425rem] rounded-md hover:bg-[#eaeaea]'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            height='20'
                            viewBox='0 -960 960 960'
                            width='20'
                            fill='fill-inherit'
                          >
                            {isPasswordVisible ? (
                              <path d='M480.091-336.924q67.985 0 115.485-47.59 47.5-47.591 47.5-115.577 0-67.985-47.59-115.485-47.591-47.5-115.577-47.5-67.985 0-115.485 47.59-47.5 47.591-47.5 115.577 0 67.985 47.59 115.485 47.591 47.5 115.577 47.5ZM480-392q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm.055 171.999q-137.977 0-251.439-76.115Q115.155-372.231 61.54-500q53.615-127.769 167.022-203.884 113.406-76.115 251.383-76.115t251.439 76.115Q844.845-627.769 898.46-500q-53.615 127.769-167.022 203.884-113.406 76.115-251.383 76.115ZM480-500Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z' />
                            ) : (
                              <path d='M630.922-441.078 586-486q9-49.693-28.346-89.346Q520.307-615 466-606l-44.922-44.922q13.538-6.077 27.769-9.115 14.23-3.039 31.153-3.039 68.076 0 115.576 47.5T643.076-500q0 16.923-3.039 31.538-3.038 14.615-9.115 27.384Zm127.231 124.462L714-358q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-46.614-46.614q37.923-15.077 77.461-22.231 39.538-7.154 81.153-7.154 140.615 0 253.614 77.538 113 77.539 164.846 202.461-22.231 53.615-57.423 100.076-35.192 46.461-82.884 83.308Zm32.308 231.383L628.616-245.848q-30.769 11.385-68.192 18.616Q523-220.001 480-220.001q-140.999 0-253.614-77.538Q113.771-375.078 61.54-500q22.154-53 57.231-98.885 35.077-45.884 77.231-79.576l-110.77-112 42.154-42.153 705.228 705.228-42.153 42.153ZM238.155-636.309q-31.692 25.231-61.654 60.655Q146.539-540.231 128-500q50 101 143.5 160.5T480-280q27.308 0 54.386-4.616 27.077-4.615 45.923-9.538l-50.616-51.847q-10.231 4.153-23.693 6.615-13.461 2.462-26 2.462-68.076 0-115.576-47.5T316.924-500q0-12.154 2.462-25.423 2.462-13.27 6.615-24.27l-87.846-86.616ZM541-531Zm-131.768 65.769Z' />
                            )}
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            setCopyType('비밀번호');
                            copyToClipboard(resData?.party.account.pwd);
                          }}
                          className='p-[0.425rem] rounded-md hover:bg-[#eaeaea]'
                        >
                          <svg
                            aria-hidden='true'
                            viewBox='0 0 16 16'
                            fill='currentColor'
                            height='14'
                            width='14'
                            className='fill-inherit'
                          >
                            <path
                              fillRule='evenodd'
                              d='M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z'
                            ></path>
                            <path
                              fillRule='evenodd'
                              d='M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z'
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <a
                target='_blank'
                href={getPlanHomePageUrl(resData?.plan.planId)}
                className='mt-2 mx-auto text-[0.5rem] leading-[1] font-extralight text-[#8b8b8b] underline'
              >
                {resData?.service.name} 바로가기
              </a>
            </div>

            <div className='flex flex-col gap-y-5 items-start bg-white rounded-[0.625rem] px-5 py-6'>
              <div className='w-full flex justify-between items-center'>
                <p className='font-semibold'>파티 구성원</p>
                {userInfo.memberId === resData?.party.partyLeaderMemberId &&
                  !resData?.party.progressStatus && (
                    <button
                      onClick={() => {
                        setOpenModifyPartyRecruitmentNumModal('default');
                      }}
                      className='bg-[#f6f6f6] hover:bg-[#eaeaea] text-[0.5rem] font-semibold rounded-full px-3 py-1'
                    >
                      모집인원 변경
                    </button>
                  )}

                <ModifyPartyRecruitmentNumModal
                  openModifyPartyRecruitmentNumModal={
                    openModifyPartyRecruitmentNumModal
                  }
                  setOpenModifyPartyRecruitmentNumModal={
                    setOpenModifyPartyRecruitmentNumModal
                  }
                  partyId={partyId}
                  sortedMembers={sortedMembers}
                  resData={resData}
                />
              </div>

              <div className='mt-2 flex gap-x-5'>
                {sortedMembers.map((member: any, index: number) => (
                  <div
                    key={index}
                    className='relative flex flex-col items-center gap-y-2'
                  >
                    <Image
                      src={
                        member.memberId === resData.party.partyLeaderMemberId
                          ? leaderUserdefaultProfileImg
                          : defaultUserProfileImg
                      }
                      alt='user image'
                      width={62.5}
                      height={0}
                      quality={100}
                      className=''
                    />
                    {member.memberId === resData.party.partyLeaderMemberId && (
                      <LottieCrown />
                    )}
                    <p className='w-[2rem] flex text-xs justify-center font-semibold'>
                      {member.username}
                    </p>
                    {userInfo.memberId === member.memberId && (
                      <p className='w-[1.125rem] h-[1.125rem] text-white bg-[#a9bbfc] rounded-full text-xs flex justify-center items-center'>
                        나
                      </p>
                    )}
                  </div>
                ))}

                {Array.from({
                  length: Math.max(
                    0,
                    resData?.party.recLimit + 1 - resData.party.members.length
                  ),
                }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className='flex flex-col items-center gap-y-2'
                  >
                    <Image
                      src={emptyUserProfileImg}
                      alt='empty user image'
                      width={62.5}
                      height={0}
                      quality={100}
                      className=''
                    />
                    <p className='w-[2rem] flex text-xs text-[#9d9d9d] font-medium'>
                      모집중
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
