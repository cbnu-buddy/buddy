'use client';

import React, { useEffect } from 'react';
import Loading from '@/app/loading';
import axiosInstance from '@/utils/axiosInstance';
import useDebounce from '@/utils/hooks/useDebounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import EmptyHotPostListItem from './EmptyHotPostListItem';
import HotPostListItem from './HotPostListItem';
import { PostInfo } from '@/types/post';
import { Divider } from 'rsuite';
import { communityPostInfos } from '@/data/mock/communityPostInfos';

interface HotPostListProps {
  searchQuery: string;
}

// 시험 목록 반환 API (10개 게시글 단위로)
// const fetchExams = async ({ queryKey }: any) => {
//   const page = queryKey[1];
//   const searchQuery = queryKey[2];
//   const response = await axiosInstance.get(
//     `${process.env.NEXT_PUBLIC_API_VERSION}/assignment/?page=${page}&limit=10&sort=-createdAt&q=title,course,writer=${searchQuery}`
//   );
//   return response.data;
// };

export default function HotPostList({ searchQuery }: HotPostListProps) {
  const debouncedSearchQuery = useDebounce(searchQuery, 400);

  const params = useSearchParams();

  const page = Number(params?.get('page')) || 1;

  // const { isPending, data } = useQuery({
  //   queryKey: ['examList', page, debouncedSearchQuery],
  //   queryFn: fetchExams,
  // });

  const router = useRouter();

  // const resData = data?.data;
  const resData = communityPostInfos;

  // if (isPending) return <Loading />;

  return (
    <div className='mt-2'>
      {resData?.length === 0 ? (
        <EmptyHotPostListItem />
      ) : (
        <div className='flex flex-col gap-y-3'>
          {resData?.map((hotPostInfo: PostInfo, index: number) => (
            <HotPostListItem
              postInfo={hotPostInfo}
              key={index}
              index={index}
              length={resData.length}
            />
          ))}
        </div>
      )}
    </div>
  );
}
