'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import logoImg from '@/public/images/logo.png';
import axiosInstance from '@/utils/axiosInstance';
import { userInfoStore } from '@/store/UserInfo';
import { AxiosError } from 'axios';
import Link from 'next/link';
import PrivacyPolicyModal from '../components/PrivacyPolicyModal';
import { Label } from 'flowbite-react';
import { fetchCurrentUserInfo } from '@/utils/fetchCurrentUserInfo';

interface UserLoginInfoType {
  id: string;
  password: string;
}

// 로그인 API
const login = (userAccountInfo: UserLoginInfoType) => {
  const { id, password } = userAccountInfo;
  const reqBody = {
    userId: id,
    pwd: password,
  };
  return axiosInstance.post('/public/auth/login', reqBody);
};

export default function Login() {
  const updateUserInfo = userInfoStore((state: any) => state.updateUserInfo);

  const loginMutation = useMutation({
    mutationFn: login,
    onMutate: () => {},
    onError: (error: AxiosError) => {
      const resData: any = error.response;
      switch (resData?.status) {
        case 400:
          switch (resData?.data.error.status) {
            case 'BAD_REQUEST':
              setpasswordInputAnnouceMsg(
                '아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해 주세요'
              );
              break;
            default:
              alert('정의되지 않은 http code입니다.');
          }
          break;
        default:
          alert('정의되지 않은 http status code입니다');
      }
    },
    onSuccess: (data) => {
      localStorage.setItem('activeAuthorization', 'true');

      // 로그인 후 사용자 정보 조회
      fetchCurrentUserInfo(updateUserInfo);
      router.push('/');
    },
    onSettled: () => {},
  });

  const [userAccountInfo, setUserAccountInfo] = useState({
    id: '',
    password: '',
  });
  const [ispasswordVisibility, setIspasswordVisibility] = useState(false);
  const [idInputAnnounceMsg, setIdInputAnnouceMsg] = useState('');
  const [passwordInputAnnounceMsg, setpasswordInputAnnouceMsg] = useState('');
  const [openPrivacyPolicyModal, setOpenPrivacyPolicyModal] = useState<
    string | undefined
  >();

  const idInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIdInputAnnouceMsg('');
    setpasswordInputAnnouceMsg('');

    if (!userAccountInfo.id) {
      idInputRef.current?.focus();
      setIdInputAnnouceMsg('이메일을 입력하세요.');
      return;
    }

    if (!userAccountInfo.password) {
      passwordInputRef.current?.focus();
      setpasswordInputAnnouceMsg('비밀번호를 입력하세요.');
      return;
    }

    loginMutation.mutate(userAccountInfo);
  };

  return (
    <div className='mt-[4.25rem]'>
      <div className='w-[22.5rem] mx-auto'>
        <Image
          src={logoImg}
          alt='list'
          width={35}
          height={0}
          quality={100}
          className='mx-auto'
        />

        <div className='grid grid-cols-1 mt-3 text-center'>
          <h1 className='text-[1.7rem] leading-[1.75] font-bold'>로그인</h1>
          <p className='text-[#6a6c73]'>버디에 오신 걸 환영해요</p>
        </div>

        <form className='flex max-w-md flex-col mt-10'>
          <div className='relative'>
            <div className='mb-1'>
              <Label
                htmlFor='id'
                value='아이디'
                className={`text-[#a2a4a9] text-[0.5rem] leading-[1] font-light`}
              />
            </div>
            <input
              required
              placeholder='아이디를 입력해 주세요'
              type='text'
              value={userAccountInfo.id}
              onChange={(e) =>
                setUserAccountInfo({
                  ...userAccountInfo,
                  id: e.target.value,
                })
              }
              className={`placeholder-[#9ea3ae] rounded-[0.425rem] border ${
                idInputAnnounceMsg ? 'border-red-500' : 'border-[#d4d5d7]'
              } text-sm font-light w-full focus:ring-0 py-3 ${
                userAccountInfo.id && 'pr-[2.5rem]'
              }`}
            />
            {userAccountInfo.id && (
              <button
                className='absolute top-[2.05rem] right-3 p-1'
                onClick={(e) => {
                  e.preventDefault();
                  setUserAccountInfo({
                    ...userAccountInfo,
                    id: '',
                  });
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='22'
                  viewBox='0 -960 960 960'
                  width='22'
                  fill='#a2a4a9'
                >
                  <path d='M480-437.847 277.076-234.924q-8.307 8.308-20.884 8.5-12.576.193-21.268-8.5-8.693-8.692-8.693-21.076t8.693-21.076L437.847-480 234.924-682.924q-8.308-8.307-8.5-20.884-.193-12.576 8.5-21.268 8.692-8.693 21.076-8.693t21.076 8.693L480-522.153l202.924-202.923q8.307-8.308 20.884-8.5 12.576-.193 21.268 8.5 8.693 8.692 8.693 21.076t-8.693 21.076L522.153-480l202.923 202.924q8.308 8.307 8.5 20.884.193 12.576-8.5 21.268-8.692 8.693-21.076 8.693t-21.076-8.693L480-437.847Z' />
                </svg>
              </button>
            )}
            {idInputAnnounceMsg && (
              <div className='flex mt-[0.3rem]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='15'
                  viewBox='0 -960 960 960'
                  width='15'
                  fill='#c84031'
                  className='relative left-[0.1rem] top-[0.1rem]'
                >
                  <path d='M479.928-274.022q16.463 0 27.398-10.743 10.935-10.743 10.935-27.206 0-16.464-10.863-27.518-10.862-11.055-27.326-11.055-16.463 0-27.398 11.037-10.935 11.037-10.935 27.501 0 16.463 10.863 27.224 10.862 10.76 27.326 10.76Zm-30.993-158.739h68.13v-257.065h-68.13v257.065Zm31.364 358.74q-84.202 0-158.041-31.879t-129.159-87.199q-55.32-55.32-87.199-129.201-31.878-73.88-31.878-158.167t31.878-158.2q31.879-73.914 87.161-128.747 55.283-54.832 129.181-86.818 73.899-31.986 158.205-31.986 84.307 0 158.249 31.968 73.942 31.967 128.756 86.768 54.815 54.801 86.79 128.883 31.976 74.083 31.976 158.333 0 84.235-31.986 158.07t-86.818 128.942q-54.833 55.107-128.873 87.169-74.04 32.063-158.242 32.063Z' />
                </svg>
                <p
                  id='helper-checkbox-text'
                  className='relative pr-2 left-[0.5rem] w-full text-left text-xs font-normal text-[#c84031] dark:text-gray-300'
                >
                  {idInputAnnounceMsg}
                </p>
              </div>
            )}
          </div>
          <div className='mt-4 relative'>
            <div className='mt-1'>
              <Label
                htmlFor='password'
                value='비밀번호'
                className={`text-[#a2a4a9] text-[0.5rem] leading-[1] font-light`}
              />
            </div>
            <input
              required
              placeholder='비밀번호를 입력해 주세요'
              type={ispasswordVisibility ? 'text' : 'password'}
              value={userAccountInfo.password}
              onChange={(e) => {
                setUserAccountInfo({
                  ...userAccountInfo,
                  password: e.target.value,
                });
              }}
              className={`placeholder-[#9ea3ae] rounded-[0.425rem] border border-[#d4d5d7] text-sm font-light w-full focus:ring-0 py-3 ${
                userAccountInfo.password && 'pr-[2.5rem]'
              }`}
            />
            {userAccountInfo.password && (
              <button
                className='absolute top-[2.05rem] right-3 p-1'
                onClick={(e) => {
                  e.preventDefault();
                  setIspasswordVisibility((prev) => !prev);
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='22'
                  viewBox='0 -960 960 960'
                  width='22'
                  fill='#a2a4a9'
                >
                  {ispasswordVisibility ? (
                    <path d='M480.091-336.924q67.985 0 115.485-47.59 47.5-47.591 47.5-115.577 0-67.985-47.59-115.485-47.591-47.5-115.577-47.5-67.985 0-115.485 47.59-47.5 47.591-47.5 115.577 0 67.985 47.59 115.485 47.591 47.5 115.577 47.5ZM480-392q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm.055 171.999q-137.977 0-251.439-76.115Q115.155-372.231 61.54-500q53.615-127.769 167.022-203.884 113.406-76.115 251.383-76.115t251.439 76.115Q844.845-627.769 898.46-500q-53.615 127.769-167.022 203.884-113.406 76.115-251.383 76.115ZM480-500Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z' />
                  ) : (
                    <path d='M630.922-441.078 586-486q9-49.693-28.346-89.346Q520.307-615 466-606l-44.922-44.922q13.538-6.077 27.769-9.115 14.23-3.039 31.153-3.039 68.076 0 115.576 47.5T643.076-500q0 16.923-3.039 31.538-3.038 14.615-9.115 27.384Zm127.231 124.462L714-358q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-46.614-46.614q37.923-15.077 77.461-22.231 39.538-7.154 81.153-7.154 140.615 0 253.614 77.538 113 77.539 164.846 202.461-22.231 53.615-57.423 100.076-35.192 46.461-82.884 83.308Zm32.308 231.383L628.616-245.848q-30.769 11.385-68.192 18.616Q523-220.001 480-220.001q-140.999 0-253.614-77.538Q113.771-375.078 61.54-500q22.154-53 57.231-98.885 35.077-45.884 77.231-79.576l-110.77-112 42.154-42.153 705.228 705.228-42.153 42.153ZM238.155-636.309q-31.692 25.231-61.654 60.655Q146.539-540.231 128-500q50 101 143.5 160.5T480-280q27.308 0 54.386-4.616 27.077-4.615 45.923-9.538l-50.616-51.847q-10.231 4.153-23.693 6.615-13.461 2.462-26 2.462-68.076 0-115.576-47.5T316.924-500q0-12.154 2.462-25.423 2.462-13.27 6.615-24.27l-87.846-86.616ZM541-531Zm-131.768 65.769Z' />
                  )}
                </svg>
              </button>
            )}
            {passwordInputAnnounceMsg && (
              <div className='flex mt-[0.3rem] mb-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='15'
                  viewBox='0 -960 960 960'
                  width='15'
                  fill='#c84031'
                  className='relative left-[0.1rem] top-[0.1rem]'
                >
                  <path d='M479.928-274.022q16.463 0 27.398-10.743 10.935-10.743 10.935-27.206 0-16.464-10.863-27.518-10.862-11.055-27.326-11.055-16.463 0-27.398 11.037-10.935 11.037-10.935 27.501 0 16.463 10.863 27.224 10.862 10.76 27.326 10.76Zm-30.993-158.739h68.13v-257.065h-68.13v257.065Zm31.364 358.74q-84.202 0-158.041-31.879t-129.159-87.199q-55.32-55.32-87.199-129.201-31.878-73.88-31.878-158.167t31.878-158.2q31.879-73.914 87.161-128.747 55.283-54.832 129.181-86.818 73.899-31.986 158.205-31.986 84.307 0 158.249 31.968 73.942 31.967 128.756 86.768 54.815 54.801 86.79 128.883 31.976 74.083 31.976 158.333 0 84.235-31.986 158.07t-86.818 128.942q-54.833 55.107-128.873 87.169-74.04 32.063-158.242 32.063Z' />
                </svg>
                <p
                  id='helper-checkbox-text'
                  className='relative pr-2 left-[0.5rem] w-full text-left text-xs font-normal text-[#c84031] dark:text-gray-300'
                >
                  {passwordInputAnnounceMsg}
                </p>
              </div>
            )}
          </div>

          {/* <p className='text-[0.8rem] leading-[1rem] text-blue-500 mt-2'>
            비밀번호를 잊으셨나요?
          </p> */}

          <button
            type='submit'
            onClick={handleSignIn}
            disabled={
              userAccountInfo.id && userAccountInfo.password ? false : true
            }
            className={`mt-12 px-4 py-[0.75rem] rounded-[0.425rem] box-shadow font-medium duration-150 ease-out text-white ${
              userAccountInfo.id && userAccountInfo.password
                ? 'bg-[#3a8af9] hover:bg-[#1c6cdb]'
                : 'bg-[#d3d3d3]'
            }`}
          >
            로그인 하기
          </button>

          <div className='flex justify-between gap-x-1 mt-3'>
            <div>
              <span className='text-[#6a6c73] text-[0.8rem] leading-[1rem]'>
                버디를 처음 이용하시나요?{' '}
              </span>
              <Link
                href='/register'
                className='text-blue-500 text-[0.8rem] leading-[1rem] hover:underline'
              >
                회원가입
              </Link>
            </div>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setOpenPrivacyPolicyModal('default');
                }}
                className='text-[#6a6c73] text-[0.5rem] leading-[1] hover:text-black'
              >
                개인정보처리방침
              </button>
              {openPrivacyPolicyModal && (
                <PrivacyPolicyModal
                  openPrivacyPolicyModal={openPrivacyPolicyModal}
                  setOpenPrivacyPolicyModal={setOpenPrivacyPolicyModal}
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
