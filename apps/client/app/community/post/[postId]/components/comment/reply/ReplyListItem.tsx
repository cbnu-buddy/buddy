import { ReplyInfo } from '@/types/reply';
import { formatDateAndTimeAgo } from '@/utils/formatDate';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ReplyListItemProps {
  replyInfo: ReplyInfo;
  setIsOpenCommentAndReplyManagingBottomDrawer: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function ReplyListItem(props: ReplyListItemProps) {
  const { replyInfo, setIsOpenCommentAndReplyManagingBottomDrawer } = props;

  return (
    <div className='flex gap-x-1 px-1'>
      <span className={`before:content-['ㄴ'] text-[#949aa1]`} />
      <div className='w-full flex flex-col gap-y-2'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-x-[0.375rem]'>
            <div className='relative w-[30px] h-[30px]'>
              <Image
                src={replyInfo.writer.profileImagePathUrl}
                alt='profileImage'
                fill
                quality={100}
                className='rounded-full'
              />
            </div>
            <span className='text-[0.825rem] text-[#333d4b] font-medium'>
              {replyInfo.writer.username}
            </span>
          </div>

          <div className='flex items-center gap-x-1 text-xs text-[#4e5968] text-right'>
            {formatDateAndTimeAgo(replyInfo.createdAt)}

            <button
              onClick={() => {
                setIsOpenCommentAndReplyManagingBottomDrawer(true);
              }}
              className='p-[0.1rem] rounded-md hover:bg-[#f6f6f6]'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='25'
                viewBox='0 -960 960 960'
                width='25'
                fill='#282828'
              >
                <path d='M480-189.23q-24.75 0-42.37-17.63Q420-224.48 420-249.23q0-24.75 17.63-42.38 17.62-17.62 42.37-17.62 24.75 0 42.37 17.62Q540-273.98 540-249.23q0 24.75-17.63 42.37-17.62 17.63-42.37 17.63ZM480-420q-24.75 0-42.37-17.63Q420-455.25 420-480q0-24.75 17.63-42.37Q455.25-540 480-540q24.75 0 42.37 17.63Q540-504.75 540-480q0 24.75-17.63 42.37Q504.75-420 480-420Zm0-230.77q-24.75 0-42.37-17.62Q420-686.02 420-710.77q0-24.75 17.63-42.37 17.62-17.63 42.37-17.63 24.75 0 42.37 17.63Q540-735.52 540-710.77q0 24.75-17.63 42.38-17.62 17.62-42.37 17.62Z'></path>
              </svg>
            </button>
          </div>
        </div>

        <p className='mt-[0.175rem] text-xs text-[#333d4b]'>
          {replyInfo.replyContent}
        </p>

        <div className='flex items-center gap-x-2'>
          <button
            //   onClick={() => setIsLikedPost((prev) => !prev)}
            className={`relative ml-[-0.25rem] flex items-center bg-[#f2f4f6] text-[#4e5968] rounded-full px-2 py-[0.3rem] ${
              false && 'outline outline-1 outline-[#3a8af9]'
            }`}
          >
            <svg
              width='32'
              height='32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='absolute left-1 scale-[0.6]'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M26.14 10.126c.96 1.667 1.52 3.572 1.52 5.795l-.01 11.352H15.973c-2.162 0-4.163-.476-5.925-1.429-1.76-.953-3.122-2.223-4.163-3.97-.96-1.666-1.52-3.65-1.52-5.794 0-2.144.48-4.049 1.44-5.795 1.041-1.747 2.402-3.097 4.163-4.05 1.762-1.031 3.763-1.507 6.005-1.507 2.241 0 4.243.476 6.004 1.428 1.761.953 3.122 2.303 4.163 3.97zM11.46 14.42a1.028 1.028 0 100-2.056 1.028 1.028 0 000 2.056zm3.085 6.273a6.172 6.172 0 01-5.818-4.113h1.33a4.936 4.936 0 008.976 0h1.33a6.172 6.172 0 01-5.818 4.113zm4.113-7.3a1.028 1.028 0 11-2.056 0 1.028 1.028 0 012.056 0z'
                fill='#9ba2ac'
              />
            </svg>
            <span className='ml-[1.375rem] text-[#8b95a1] text-xs'>0</span>
          </button>

          <Link
            href={`/community/post/${1}/comment/${1}`}
            className='text-xs text-[#646464]'
          >
            답글쓰기
          </Link>
        </div>
      </div>
    </div>
  );
}
