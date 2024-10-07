'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import HotPostList from './components/hotPost/HotPostList';
import communityIconGif from '@/public/images/community_icon.gif';
import Image from 'next/image';
import HotTagList from './components/hotTag/HotTagList';
import TagPostList from './components/tagPost/TagPostList';
import { UserInfoStore } from '@/store/UserInfo';
import PostList from './components/entirePost/PostList';
import TagList from './components/tag/TagList';
import SwiperBanner from './components/SwiperBanner';
import { TagInfo } from '../../types/tag';

export default function Community() {
  const userInfo = UserInfoStore((state: any) => state.userInfo);

  const [selectedTagInfo, setSelectedTagInfo] = useState<TagInfo>({
    tagId: 0,
    tagName: '',
  });
  const [mySubscribedTagNum, setMySubscribedTagNum] = useState<number>(0);

  return (
    <div className='flex flex-col w-[37.5rem] mx-auto pt-6 pb-24'>
      <div className='h-16 flex items-center text-3xl font-semibold tracking-wide'>
        <div className='flex items-center gap-x-1'>
          <Image
            src={communityIconGif}
            alt='communityIconImgage'
            width={45}
            height={45}
            quality={100}
            className='rounded-md object-cover'
          />
          <span className='ml-2 lift-up text-[#333d4b] font-bold'>
            커뮤니티
          </span>
        </div>
      </div>
      <div className='mt-12 mb-4'>
        <div className='flex flex-col'>
          <Link
            href='/community/search'
            className='w-full h-[2.625rem] flex items-center gap-x-2 px-3 outline outline-1 outline-[#e6e8ea] rounded-lg hover:outline-[#93bcfa] hover:outline-2'
          >
            <svg
              fill='none'
              width='21'
              height='21'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='m19.59 18.41-3.205-3.203c1.0712-1.3712 1.579-3.0994 1.4197-4.832-.1593-1.73274-.9735-3.3394-2.2767-4.49233s-2.9972-1.76527-4.7364-1.71212c-1.73913.05315-3.39252.76779-4.62288 1.99815s-1.945 2.88375-1.99815 4.6229c-.05316 1.7392.55918 3.4332 1.71211 4.7364s2.7596 2.1174 4.49232 2.2767c1.7327.1592 3.4608-.3485 4.832-1.4197l3.204 3.204c.1567.1541.3678.24.5876.2391.2197-.0009.4302-.0886.5856-.2439.1554-.1554.243-.3659.2439-.5856.001-.2198-.085-.431-.2391-.5876zm-4.886-3.808c-.0183.0156-.036.032-.053.049-.042.044-.042.044-.08.092-.91.886-2.197 1.424-3.571 1.424-1.19232.0001-2.348-.4121-3.27107-1.1668s-1.55672-1.8055-1.79352-2.974c-.2368-1.1686-.06217-2.38311.49428-3.43762s1.46047-1.88413 2.55878-2.34819c1.09833-.46405 2.32333-.53398 3.46733-.19793s2.1365 1.0574 2.8094 2.04174c.6728.98434.9845 2.1711.8822 3.359-.1022 1.1879-.6122 2.3039-1.4434 3.1588z'
                fill='#8994a2'
              ></path>
            </svg>
            <span className='text-[0.825rem] text-[#888e96] font-extralight'>
              궁금한 것을 검색해 보세요.
            </span>
          </Link>

          <div className='mt-3 flex gap-x-[0.625rem] text-xs font-medium'>
            <div className='bg-[#f2f4f6] text-[#4e5968] rounded-full px-3 py-[0.3rem]'>
              게시글 제목
            </div>
            <div className='bg-[#f2f4f6] text-[#4e5968] rounded-full px-3 py-[0.3rem]'>
              내용
            </div>
            <div className='bg-[#f2f4f6] text-[#4e5968] rounded-full px-3 py-[0.3rem]'>
              태그
            </div>
            <div className='bg-[#f2f4f6] text-[#4e5968] rounded-full px-3 py-[0.3rem]'>
              작성자
            </div>
          </div>
        </div>
      </div>

      <section className='flex justify-between gap-x-6 mt-8'>
        <div className='w-full'>
          <div className='flex flex-col gap-y-10'>
            <div>
              <h2 className='font-bold text-lg text-[#333d4b]'>
                실시간 인기 글
              </h2>
              <HotPostList />
            </div>

            <div className='w-[28.5rem]'>
              <SwiperBanner />
            </div>

            {userInfo.isAuth && (
              <div>
                <div className='rounded-md px-[1rem] py-5 bg-[#f9fafb]'>
                  <div className='flex justify-between'>
                    <div className='flex items-center gap-x-[0.375rem]'>
                      <h2 className='font-semibold text-lg text-[#333d4b]'>
                        구독한 태그
                      </h2>
                      <span className='text-base font-semibold text-[#3a8af9]'>
                        {mySubscribedTagNum}
                      </span>
                    </div>

                    <Link
                      href='/community/my/subscribed-tags'
                      className='flex items-center group'
                    >
                      <span className='text-xs font-semibold text-[#333d4b]'>
                        설정
                      </span>
                      <svg
                        width='22'
                        height='22'
                        viewBox='0 0 32 32'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='group-hover:rotate-180 duration-500'
                      >
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M16 6C15.128 6 14.4211 6.70692 14.4211 7.57895V9.3411C13.6991 9.51168 13.0215 9.79655 12.4083 10.1754L10.8007 8.56773C10.1841 7.95111 9.18437 7.95111 8.56775 8.56773C7.95114 9.18435 7.95114 10.1841 8.56775 10.8007L10.1754 12.4083C9.79655 13.0214 9.51168 13.6991 9.34109 14.4211H7.57895C6.70692 14.4211 6 15.128 6 16C6 16.872 6.70692 17.5789 7.57895 17.5789L9.34108 17.579C9.50476 18.2717 9.77365 18.9236 10.1298 19.5169L8.56775 21.0789C7.95114 21.6955 7.95114 22.6953 8.56775 23.3119C9.18437 23.9285 10.1841 23.9285 10.8007 23.3119L12.3343 21.7783C12.9668 22.1803 13.67 22.4814 14.4211 22.6589V24.4211C14.4211 25.2931 15.128 26 16 26C16.8721 26 17.579 25.2931 17.579 24.4211V22.6589C18.3009 22.4883 18.9786 22.2034 19.5917 21.8246L21.079 23.3119C21.6956 23.9285 22.6953 23.9285 23.312 23.3119C23.9286 22.6953 23.9286 21.6955 23.312 21.0789L21.8247 19.5916C22.2035 18.9785 22.4883 18.3009 22.6589 17.5789L24.4211 17.579C25.2931 17.579 26 16.872 26 16C26 15.128 25.2931 14.4211 24.4211 14.4211H22.6589C22.4814 13.67 22.1802 12.9668 21.7783 12.3344L23.312 10.8007C23.9286 10.1841 23.9286 9.18435 23.312 8.56773C22.6953 7.95111 21.6956 7.95112 21.079 8.56773L19.5169 10.1298C18.9236 9.7737 18.2717 9.5048 17.579 9.34112V7.57895C17.579 6.70692 16.8721 6 16 6ZM12.3158 16C12.3158 13.9653 13.9653 12.3158 16 12.3158C18.0347 12.3158 19.6842 13.9653 19.6842 16C19.6842 18.0347 18.0347 19.6842 16 19.6842C13.9653 19.6842 12.3158 18.0347 12.3158 16Z'
                          fill='#98A4B7'
                        ></path>
                      </svg>
                    </Link>
                  </div>
                  <TagList
                    selectedTagInfo={selectedTagInfo}
                    setSelectedTagInfo={setSelectedTagInfo}
                    setMySubscribedTagNum={setMySubscribedTagNum}
                  />
                </div>

                {selectedTagInfo.tagId !== 0 && (
                  <>
                    <TagPostList searchQuery={selectedTagInfo.tagName} />
                    <Link
                      href={`/community/feed?tag=${selectedTagInfo.tagName}`}
                      className='w-full flex justify-center items-center gap-x-[0.175rem] mt-3 px-4 py-2 rounded-md bg-[#e8f3ff] hover:bg-[#c9e2ff]'
                    >
                      <span className='text-[0.8rem] font-medium text-[#1b64da]'>
                        게시글 더 보기
                      </span>
                    </Link>
                  </>
                )}
              </div>
            )}

            <div>
              <h2 className='font-bold text-lg text-[#333d4b]'>전체글</h2>
              <PostList />
              <Link
                href='/community/feed'
                className='w-full flex justify-center items-center gap-x-[0.175rem] mt-3 px-4 py-2 rounded-md bg-[#e8f3ff] hover:bg-[#c9e2ff]'
              >
                <span className='text-[0.8rem] font-medium text-[#1b64da]'>
                  게시글 더 보기
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className='mt-2 w-[9rem] sticky top-[4.75rem] h-fit flex flex-col gap-y-5'>
          <Link
            href='/community/post/new'
            className='flex justify-center items-center gap-x-[0.325rem] bg-[#3a8af9] px-3 py-[0.625rem] text-white text-center rounded-lg font-medium hover:bg-[#1b64da]'
          >
            글 작성하기
          </Link>

          <div>
            <h2 className='font-bold text-lg text-[#333d4b]'>HOT 태그</h2>
            <HotTagList />
          </div>
        </div>
      </section>
    </div>
  );
}
