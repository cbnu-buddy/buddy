'use client';

import Link from 'next/link';
import axiosInstance from '@/utils/axiosInstance';
import { useEffect, useState } from 'react';
import { userInfoStore } from '@/store/UserInfo';
import { useMutation } from '@tanstack/react-query';
import { fetchCurrentUserInfo } from '@/utils/fetchCurrentUserInfo';

// 로그아웃 API
const logout = () => {
  return axiosInstance.get(`/private/auth/logout`);
};

export default function Navbar() {
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSettled: () => {
      localStorage.removeItem('activeAuthorization');
      if (typeof window !== 'undefined') window.location.href = '/login';
      removeUserInfo.mutate();
    },
  });

  const userInfo = userInfoStore((state: any) => state.userInfo);
  const updateUserInfo = userInfoStore((state: any) => state.updateUserInfo);
  const removeUserInfo = userInfoStore((state: any) => state.removeUserInfo);

  const [rightPos, setRightPos] = useState('-right-full');

  useEffect(() => {
    // const CT = new ChannelService();
    // CT.loadScript();
    // CT.boot({ pluginKey: process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY! });

    // (로그인 한) 사용자 정보 조회
    const activeAuthorization = localStorage.getItem('activeAuthorization');
    if (activeAuthorization) fetchCurrentUserInfo(updateUserInfo);

    //for unmount
    // return () => {
    //   CT.shutdown();
    // };
  }, [updateUserInfo]);

  return (
    <nav
      className={`w-screen z-10 py-3 px-2 pl-3 fixed top-0 border-b border-[#e6e8ea] whitespace-nowrap bg-white`}
    >
      <div className='2lg:w-[60rem] flex items-center justify-between mx-auto'>
        <div className='py-2 2md:py-0'>
          <Link href='/'>
            <div className='flex gap-1 items-center'>
              <img
                src='/images/logo.png'
                alt='logo'
                style={{ width: '40px' }}
                className=''
              />
              <span className='hidden 2lg:block tracking-tight text-lg font-semibold'>
                BUDDY
              </span>
            </div>
          </Link>
        </div>
        <div className='hidden 2md:flex'>
          <div className='flex gap-6 font-medium mx-auto'>
            {userInfo.isAuth && (
              <Link
                href='/my-party'
                className='px-4 py-2 rounded-md hover:bg-[#f3f4f5] focus:bg-[#f3f4f5]'
              >
                나의 파티
              </Link>
            )}
            <Link
              href='/add-party'
              className='px-4 py-2 rounded-md hover:bg-[#f3f4f5] focus:bg-[#f3f4f5]'
            >
              파티 만들기
            </Link>
            <Link
              href='/join-party'
              className='px-3 py-2 rounded-md hover:bg-[#f3f4f5] focus:bg-[#f3f4f5]'
            >
              파티 찾기
            </Link>
            <Link
              href='/community'
              className='px-3 py-2 rounded-md hover:bg-[#f3f4f5] focus:bg-[#f3f4f5]'
            >
              커뮤니티
            </Link>
            <Link
              href='/faq'
              className='px-3 py-2 rounded-md hover:bg-[#f3f4f5] focus:bg-[#f3f4f5]'
            >
              자주 묻는 질문
            </Link>
          </div>
          <div className='ml-24'>
            <div className='flex ml-auto gap-3'>
              {userInfo.isAuth ? (
                <>
                  <Link
                    href='/my-page'
                    className='px-3 py-2 rounded-md hover:bg-[#f3f4f5]'
                  >
                    <span className='font-semibold'>{userInfo.username}</span>님
                  </Link>
                  <button
                    className='px-3 py-2 rounded-md hover:bg-[#f3f4f5] mr-3'
                    onClick={() => {
                      localStorage.removeItem('activeAuthorization');
                      if (typeof window !== 'undefined')
                        window.location.href = '/login';
                      removeUserInfo();
                      logoutMutation.mutate();
                    }}
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href='/login'
                    className='px-3 py-2 rounded-md hover:bg-[#f3f4f5] mr-3'
                  >
                    로그인
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div
          onClick={(e) => {
            setRightPos('right-0');
          }}
          className={`block 2md:hidden px-[0.6rem] py-3 ml-auto rounded-full focus:outline-none text-center mr-3`}
        >
          <div className='w-[1.1rem] h-[2px] bg-[#262626] mb-[4px]'></div>
          <div className='w-[1.1rem] h-[2px] bg-[#262626] mb-[4px]'></div>
          <div className='w-[1.1rem] h-[2px] bg-[#262626]'></div>
          <div
            className={`absolute top-0 ${rightPos} w-full bg-white border opacity-95 duration-300 cursor-default`}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                setRightPos('-right-full');
              }}
              className='w-fit ml-auto mt-2 mr-2 p-1 rounded-full cursor-pointer'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='33'
                viewBox='0 -960 960 960'
                width='33'
              >
                <path d='M480-455.897 265.949-241.846q-4.795 4.795-11.667 5.179-6.872.385-12.436-5.179t-5.564-12.051q0-6.488 5.564-12.052L455.897-480 241.846-694.051q-4.795-4.795-5.179-11.667-.385-6.872 5.179-12.436t12.051-5.564q6.488 0 12.052 5.564L480-504.103l214.051-214.051q4.795-4.795 11.667-5.179 6.872-.385 12.436 5.179t5.564 12.051q0 6.488-5.564 12.052L504.103-480l214.051 214.051q4.795 4.795 5.179 11.667.385 6.872-5.179 12.436t-12.051 5.564q-6.488 0-12.052-5.564L480-455.897Z' />
              </svg>
            </div>
            <ul className='flex flex-col items-center w-full text-base cursor-pointer pt-4'>
              <div className='flex flex-col w-full border-b-[0.75rem] text-sm'>
                {userInfo.isAuth ? (
                  <>
                    <Link
                      href='/my-page'
                      onClick={(e) => {
                        e.stopPropagation();
                        setRightPos('-right-full');
                      }}
                      className='hover:bg-gray-200 focus:bg-grey-200 py-4 px-6 w-full'
                    >
                      <span className='font-semibold'>{userInfo.username}</span>
                      님
                    </Link>
                    <button
                      className='hover:bg-gray-200 focus:bg-grey-200 py-4 px-6 w-full'
                      onClick={(e) => {
                        e.stopPropagation();
                        setRightPos('-right-full');
                        localStorage.removeItem('activeAuthorization');
                        if (typeof window !== 'undefined')
                          window.location.href = '/login';
                        removeUserInfo();
                        // logoutMutation.mutate();
                      }}
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href='/login'
                      onClick={(e) => {
                        e.stopPropagation();
                        setRightPos('-right-full');
                      }}
                      className='hover:bg-gray-200 focus:bg-grey-200 py-4 px-6 w-full'
                    >
                      로그인
                    </Link>
                  </>
                )}
              </div>

              {userInfo.isAuth && (
                <Link
                  href='/my-party'
                  onClick={(e) => {
                    e.stopPropagation();
                    setRightPos('-right-full');
                  }}
                  className='hover:bg-gray-200 focus:bg-grey-200 py-4 px-6 w-full font-medium'
                >
                  나의 파티
                </Link>
              )}
              <Link
                href='/add-party'
                onClick={(e) => {
                  e.stopPropagation();
                  setRightPos('-right-full');
                }}
                className='hover:bg-gray-200 focus:bg-grey-200 py-4 px-6 w-full font-medium'
              >
                파티 만들기
              </Link>
              <Link
                href='/join-party'
                onClick={(e) => {
                  e.stopPropagation();
                  setRightPos('-right-full');
                }}
                className='hover:bg-gray-200 focus:bg-grey-200 py-4 px-6 w-full font-medium'
              >
                파티 찾기
              </Link>
              <Link
                href='/community'
                onClick={(e) => {
                  e.stopPropagation();
                  setRightPos('-right-full');
                }}
                className='hover:bg-gray-200 focus:bg-grey-200 py-4 px-6 w-full font-medium'
              >
                커뮤니티
              </Link>
              <Link
                href='/faq'
                onClick={(e) => {
                  e.stopPropagation();
                  setRightPos('-right-full');
                }}
                className='hover:bg-gray-200 focus:bg-grey-200 py-4 px-6 w-full font-medium'
              >
                자주 묻는 질문
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
