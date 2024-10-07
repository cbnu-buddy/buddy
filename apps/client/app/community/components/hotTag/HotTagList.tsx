'use client';

import React, { useEffect } from 'react';
import Loading from '@/app/loading';
import axiosInstance from '@/utils/axiosInstance';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { TagInfo } from '@/types/tag';
import HotTagListItem from './HotTagListItem';
import EmptyHotTagListItem from './EmptyHotTagListItem';
import { tagInfos } from '@/data/mock/tagInfos';

// 실시간 인기 태그 조회 API
const fetchHotTagInfos = () => {
  return axiosInstance.get(`/public/community/recommendation-tags`);
};

export default function HotTagList() {
  const { isPending, data } = useQuery({
    queryKey: ['hotTagInfos'],
    queryFn: fetchHotTagInfos,
  });

  const hotCommunutyTagInfos: TagInfo[] = data?.data.response;

  if (isPending) return <Loading />;

  return (
    <div className='mt-2'>
      {hotCommunutyTagInfos?.length === 0 ? (
        <EmptyHotTagListItem />
      ) : (
        <>
          {hotCommunutyTagInfos?.map((tagInfo: TagInfo, index: number) => (
            <HotTagListItem tagInfo={tagInfo} key={index} />
          ))}
        </>
      )}
    </div>
  );
}
