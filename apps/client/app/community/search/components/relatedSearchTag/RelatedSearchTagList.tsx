'use client';

import React, { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import axiosInstance from '@/utils/axiosInstance';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { TagInfo } from '@/types/tag';
import HotTagListItem from './RelatedSearchTagListItem';
import EmptyHotTagListItem from './EmptyRelatedSearchTagListItem';
import { tagInfos } from '@/data/mock/tagInfos';

export default function RelatedSearchTagList() {
  const params = useSearchParams();

  const page = Number(params?.get('page')) || 1;

  const [isExpandRelatedSearchTagList, setIsExpandRelatedSearchTagList] =
    useState<boolean>(false);

  // 현재 보여지는 데이터의 수를 관리하는 상태
  const [visibleCount, setVisibleCount] = useState<number>(10);

  const router = useRouter();

  const resData = tagInfos;

  const handleExpand = () => {
    setVisibleCount(resData.length);
    setIsExpandRelatedSearchTagList(true);
  };

  return (
    <div>
      <div className='mt-2 grid grid-cols-2'>
        {resData?.length === 0 && <EmptyHotTagListItem />}
        {resData
          ?.slice(0, visibleCount)
          .map((tagInfo: TagInfo, index: number) => (
            <HotTagListItem tagInfo={tagInfo} key={index} />
          ))}
      </div>

      {resData.length > 10 && !isExpandRelatedSearchTagList && (
        <button
          onClick={handleExpand}
          className='w-full flex justify-center items-center gap-x-[0.175rem] mt-3 px-4 py-2 rounded-md bg-[#e8f3ff] hover:bg-[#c9e2ff]'
        >
          <span className='w-full text-[0.8rem] font-medium text-[#1b64da]'>
            검색 결과 더 보기
          </span>
        </button>
      )}
    </div>
  );
}
