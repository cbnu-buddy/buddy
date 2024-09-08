'use client';

import React, { FormEvent, useState } from 'react';
import PrivacyPolicyModal from '../components/PrivacyPolicyModal';
import { Label } from 'flowbite-react';
import Link from 'next/link';
import axiosInstance from '@/utils/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface RegisterInfoType {
  id: string;
  password: string;
  email: string;
  username: string;
}

// 회원가입 API
const register = (registerInfo: RegisterInfoType) => {
  const { id, password, email, username } = registerInfo;
  const reqBody = {
    userId: id,
    pwd: password,
    email,
    username,
  };
  return axiosInstance.post('/public/auth/signup', reqBody);
};

export default function Register() {
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: register,
    onMutate: () => {},
    onError: (error: AxiosError) => {
      const resData: any = error.response;
      switch (resData?.status) {
        case 409:
          switch (resData?.data.error.status) {
            case 'CONFLICT':
              const responseMsg = resData?.data.error.message;
              if (responseMsg === '이미 존재하는 아이디입니다.') {
                alert('이미 존재하는 아이디입니다.');
                setIsIdValidFail(true);
                break;
              }

              if (responseMsg === '이미 존재하는 이메일입니다.') {
                alert('이미 존재하는 이메일입니다.');
                setIsEmailValidFail(true);
                isEmailValidFail;
                break;
              }

              if (responseMsg === '이미 존재하는 이름입니다.') {
                alert('이미 존재하는 닉네임입니다.');
                setIsUsernameValidFail(true);
                isEmailValidFail;
                break;
              }

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
      alert('회원가입이 완료되었습니다.');
      router.push('/login');
    },
    onSettled: () => {},
  });

  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ispasswordVisibility, setIspasswordVisibility] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isRepeatpasswordVisibility, setIsRepeatpasswordVisibility] =
    useState(false);
  const [username, setUsername] = useState('');
  const [isChckedPrivacyPolicy, setIsChckedPrivacyPolicy] = useState(false);

  const [isIdValidFail, setIsIdValidFail] = useState(false);
  const [isEmailValidFail, setIsEmailValidFail] = useState(false);
  const [isPasswordValidFail, setIsPasswordValidFail] = useState(false);
  const [isRepeatPasswordValidFail, setIsRepeatPasswordValidFail] =
    useState(false);
  const [isUsernameValidFail, setIsUsernameValidFail] = useState(false);
  const [openPrivacyPolicyModal, setOpenPrivacyPolicyModal] = useState<
    string | undefined
  >();

  const handleRepeatPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatPassword(e.target.value);
    setIsRepeatPasswordValidFail(false);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!id) {
      alert('아이디를 입력해 주세요');
      setIsIdValidFail(true);
      return;
    }

    if (!email) {
      alert('제목을 입력해 주세요');
      setIsEmailValidFail(true);
      return;
    }

    if (!password) {
      alert('비밀번호를 입력해 주세요');
      setIsPasswordValidFail(true);
      return;
    }

    if (!repeatPassword) {
      alert('비밀번호 확인을 완료해 주세요');
      setIsRepeatPasswordValidFail(true);
      return;
    }

    if (password !== repeatPassword) {
      alert('비밀번호가 일치하지 않습니다');
      setIsRepeatPasswordValidFail(true);
      true;
      return;
    }

    if (!email) {
      alert('닉네임을 입력해 주세요');
      setIsUsernameValidFail(true);
      return;
    }

    registerMutation.mutate({ id, password, email, username });
  };

  return (
    <div className='h-[42.5rem] mt-10 px-5 2lg:px-0'>
      <div className='relative flex flex-col w-[20rem] mx-auto'>
        <Link href='/login' className='absolute left-[-7.5rem]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='50'
            viewBox='0 -960 960 960'
            width='50'
            fill='#a2a4a9'
          >
            <path d='m404.308-480 169.846 169.846q5.615 5.615 6 13.769.385 8.154-6 14.539T560-275.461q-7.769 0-14.154-6.385L370.308-457.385q-5.231-5.23-7.347-10.692-2.115-5.461-2.115-11.923t2.115-11.923q2.116-5.462 7.347-10.692l175.538-175.539q5.615-5.615 13.769-6 8.154-.385 14.539 6T580.539-664q0 7.769-6.385 14.154L404.308-480Z' />
          </svg>
        </Link>
        <div className='grid grid-cols-1'>
          <h1 className='text-[1.7rem] leading-[1.75] font-bold'>회원가입</h1>
          <p className='text-[#6a6c73]'>
            버디에 오신 것을 환영해요, 먼저 계정을 생성해 볼까요?
          </p>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className='flex max-w-md flex-col gap-4 mt-10'
        >
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
              type='text'
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                setIsIdValidFail(false);
              }}
              className={`placeholder-[#9ea3ae] rounded-[0.425rem] border ${
                isIdValidFail ? 'border-red-500' : 'border-[#d4d5d7]'
              } text-sm font-light w-full focus:ring-0 py-3 ${
                id && 'pr-[2.5rem]'
              }`}
            />
            {id && (
              <button
                className='absolute top-[2.05rem] right-3 p-1'
                onClick={(e) => {
                  e.preventDefault();
                  setId('');
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
          </div>
          <div className='relative'>
            <div className='mb-1'>
              <Label
                htmlFor='password'
                value='비밀번호'
                className={`text-[#a2a4a9] text-[0.5rem] leading-[1] font-light`}
              />
            </div>
            <input
              required
              type={ispasswordVisibility ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsPasswordValidFail(false);
              }}
              className={`rounded-[0.425rem] border ${
                isPasswordValidFail ? 'border-red-500' : 'border-[#d4d5d7]'
              } text-sm font-light w-full focus:ring-0 py-3`}
            />
            {password && (
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
          </div>
          <div className='relative'>
            <div className='mb-1'>
              <Label
                htmlFor='repeat-password'
                value='비밀번호 확인'
                className={`text-[#a2a4a9] text-[0.5rem] leading-[1] font-light`}
              />
            </div>
            <input
              required
              type={isRepeatpasswordVisibility ? 'text' : 'password'}
              value={repeatPassword}
              onChange={handleRepeatPasswordChange}
              className={`rounded-[0.425rem] border ${
                isRepeatPasswordValidFail
                  ? 'border-red-500'
                  : 'border-[#d4d5d7]'
              } text-sm font-light w-full focus:ring-0 py-3`}
            />
            {repeatPassword && (
              <button
                className='absolute top-[2.05rem] right-3 p-1'
                onClick={(e) => {
                  e.preventDefault();
                  setIsRepeatpasswordVisibility((prev) => !prev);
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='22'
                  viewBox='0 -960 960 960'
                  width='22'
                  fill='#a2a4a9'
                >
                  {isRepeatpasswordVisibility ? (
                    <path d='M480.091-336.924q67.985 0 115.485-47.59 47.5-47.591 47.5-115.577 0-67.985-47.59-115.485-47.591-47.5-115.577-47.5-67.985 0-115.485 47.59-47.5 47.591-47.5 115.577 0 67.985 47.59 115.485 47.591 47.5 115.577 47.5ZM480-392q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm.055 171.999q-137.977 0-251.439-76.115Q115.155-372.231 61.54-500q53.615-127.769 167.022-203.884 113.406-76.115 251.383-76.115t251.439 76.115Q844.845-627.769 898.46-500q-53.615 127.769-167.022 203.884-113.406 76.115-251.383 76.115ZM480-500Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z' />
                  ) : (
                    <path d='M630.922-441.078 586-486q9-49.693-28.346-89.346Q520.307-615 466-606l-44.922-44.922q13.538-6.077 27.769-9.115 14.23-3.039 31.153-3.039 68.076 0 115.576 47.5T643.076-500q0 16.923-3.039 31.538-3.038 14.615-9.115 27.384Zm127.231 124.462L714-358q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-46.614-46.614q37.923-15.077 77.461-22.231 39.538-7.154 81.153-7.154 140.615 0 253.614 77.538 113 77.539 164.846 202.461-22.231 53.615-57.423 100.076-35.192 46.461-82.884 83.308Zm32.308 231.383L628.616-245.848q-30.769 11.385-68.192 18.616Q523-220.001 480-220.001q-140.999 0-253.614-77.538Q113.771-375.078 61.54-500q22.154-53 57.231-98.885 35.077-45.884 77.231-79.576l-110.77-112 42.154-42.153 705.228 705.228-42.153 42.153ZM238.155-636.309q-31.692 25.231-61.654 60.655Q146.539-540.231 128-500q50 101 143.5 160.5T480-280q27.308 0 54.386-4.616 27.077-4.615 45.923-9.538l-50.616-51.847q-10.231 4.153-23.693 6.615-13.461 2.462-26 2.462-68.076 0-115.576-47.5T316.924-500q0-12.154 2.462-25.423 2.462-13.27 6.615-24.27l-87.846-86.616ZM541-531Zm-131.768 65.769Z' />
                  )}
                </svg>
              </button>
            )}
          </div>
          <div className='relative'>
            <div className='mb-1'>
              <Label
                htmlFor='email'
                value='이메일'
                className={`text-[#a2a4a9] text-[0.5rem] leading-[1] font-light`}
              />
            </div>
            <input
              required
              placeholder='abc@naver.com'
              type='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEmailValidFail(false);
              }}
              className={`placeholder-[#9ea3ae] rounded-[0.425rem] border ${
                isEmailValidFail ? 'border-red-500' : 'border-[#d4d5d7]'
              } text-sm font-light w-full focus:ring-0 py-3 ${
                email && 'pr-[2.5rem]'
              }`}
            />
            {email && (
              <button
                className='absolute top-[2.05rem] right-3 p-1'
                onClick={(e) => {
                  e.preventDefault();
                  setEmail('');
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
          </div>
          <div className='relative'>
            <div className='mb-1'>
              <Label
                htmlFor='username'
                value='닉네임'
                className={`text-[#a2a4a9] text-[0.5rem] leading-[1] font-light`}
              />
            </div>
            <input
              required
              type='text'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setIsUsernameValidFail(false);
              }}
              className={`rounded-[0.425rem] border ${
                isUsernameValidFail ? 'border-red-500' : 'border-[#d4d5d7]'
              } text-sm font-light w-full focus:ring-0 py-3`}
            />
            {username && (
              <button
                className='absolute top-[2.05rem] right-3 p-1'
                onClick={(e) => {
                  e.preventDefault();
                  setUsername('');
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
          </div>

          <div className='flex items-center text-xs mt-[-0.25rem]'>
            <input
              type='checkbox'
              className='w-[0.825rem] h-[0.825rem] rounded-[0.2rem] text-sm'
              required
              onChange={() => setIsChckedPrivacyPolicy((prev) => !prev)}
            />
            <button className='ml-1'>
              <span
                onClick={() => setOpenPrivacyPolicyModal('default')}
                className='text-[#6a6c73] text-[0.5rem] leading-[1] hover:text-black'
              >
                개인정보 수집 및 이용
              </span>
              {openPrivacyPolicyModal && (
                <PrivacyPolicyModal
                  openPrivacyPolicyModal={openPrivacyPolicyModal}
                  setOpenPrivacyPolicyModal={setOpenPrivacyPolicyModal}
                />
              )}
            </button>
            <span className='text-[#6a6c73] text-[0.5rem] leading-[1]'>
              에 동의합니다
            </span>
          </div>
          <button
            type='submit'
            disabled={
              id &&
              email &&
              password &&
              repeatPassword &&
              username &&
              isChckedPrivacyPolicy
                ? false
                : true
            }
            className={`mt-6 px-4 py-[0.75rem] rounded-[0.425rem] box-shadow font-medium bg-[#eaeffe] ${
              id &&
              email &&
              password &&
              repeatPassword &&
              username &&
              isChckedPrivacyPolicy
                ? 'text-[#5880f8]'
                : 'text-[#9fb6fb]'
            }`}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
