'use client';

import React, { useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { useQueries } from '@tanstack/react-query';
import { communityPostInfos } from '@/data/mock/communityPostInfos';
import { PostInfo } from '@/types/post';
import Link from 'next/link';
import { formatDate } from '@/utils/formatDate';

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

export default function CommunityHistory() {
  const results = useQueries({
    queries: [
      { queryKey: ['paymentHistory'], queryFn: fetchPaymentHistory },
      {
        queryKey: ['pointHistory'],
        queryFn: fetchPointHistory,
      },
    ],
  });

  // const myCommunityPostResData = results[0].data?.data?.response ?? [];
  const myCommunityPostResData: PostInfo[] = communityPostInfos;

  return (
    <div className='w-[30rem] flex flex-col gap-y-3'>
      <div className='w-full flex flex-col gap-y-4'>
        <div className='w-full flex flex-col items-start gap-y-[0.375rem] bg-white px-5 py-6 rounded-[0.6rem]'>
          <p className='w-full mt-[0.1rem] font-semibold text-[0.9rem]'>
            내가 쓴 게시글
          </p>

          <div className='w-full my-3 border-[0.75px]' />

          <div className='w-full flex flex-col'>
            {myCommunityPostResData.length === 0 ? (
              <p className='mt-5 text-center text-[#9b9b9b] text-xs font-light'>
                작성한 게시글 내역이 존재하지 않아요.
              </p>
            ) : (
              myCommunityPostResData.map(
                (postInfo: PostInfo, index: number) => (
                  <Link
                    key={index}
                    href={`/community/post/${postInfo.postId}`}
                    className='flex justify-between py-5 border-b-[0.75px]'
                  >
                    <div className='flex gap-x-4'>
                      <span className='text-[#8b8b8b] text-[0.5rem] font-light'>
                        {formatDate(postInfo.createdAt)}
                      </span>
                      <span className='text-[0.825rem]'>{postInfo.title}</span>
                    </div>
                  </Link>
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
