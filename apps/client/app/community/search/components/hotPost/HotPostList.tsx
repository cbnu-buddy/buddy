'use client';

import React, { useEffect } from 'react';
import Loading from '@/app/loading';
import axiosInstance from '@/utils/axiosInstance';
import useDebounce from '@/utils/hooks/useDebounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import NoneHotPostListItem from './NoneHotPostListItem';
import HotPostListItem from './HotPostListItem';
import { PostInfo } from '@/types/post';
import { communityPostInfos } from '@/data/mock/communityPostInfos';

// 실시간 인기글 조회 API
const fetchHotPostInfos = () => {
  return axiosInstance.get(`/public/community/posts/hot`);
};

export default function HotPostList() {
  const { isPending, data } = useQuery({
    queryKey: ['hotpostInfos'],
    queryFn: fetchHotPostInfos,
  });

  const hotcommunityPostInfos: PostInfo[] = data?.data.response;

  if (isPending) return <Loading />;

  return (
    <div className='mt-2'>
      {hotcommunityPostInfos?.length === 0 ? (
        <NoneHotPostListItem />
      ) : (
        <div className='flex flex-col gap-y-3'>
          {hotcommunityPostInfos?.map(
            (hotPostInfo: PostInfo, index: number) => (
              <HotPostListItem
                postInfo={hotPostInfo}
                key={index}
                index={index}
                length={hotcommunityPostInfos.length}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
