'use client';

import React, { useState, useRef, createRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TagInfo } from '@/types/tag';
import SearchTagListItem from './SearchTagListItem';
import axiosInstance from '@/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';

// 연관 검색 태그 목록 정보 조회 API
const fetchRelatedSearchTagInfos = ({ queryKey }: any) => {
  const tagName = queryKey[1];
  return axiosInstance.get(
    `/public/community/search/related-tags?query=${tagName}`
  );
};

interface SearchTagListProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  debouncedSearchQuery: string;
}

export default function SearchTagList(props: SearchTagListProps) {
  const { searchQuery, setSearchQuery, debouncedSearchQuery } = props;

  const { data } = useQuery({
    queryKey: ['relatedSearchTagInfos', debouncedSearchQuery],
    queryFn: fetchRelatedSearchTagInfos,
    enabled: !!debouncedSearchQuery, // debouncedSearchQuery가 있을 때만 쿼리 활성화
    retry: 0,
  });

  const relatedSearchTagInfos: TagInfo[] = data?.data.response;

  const router = useRouter();

  // 빈 배열로 초기화하여 안전하게 useRef 사용
  const itemRefs = useRef<React.RefObject<HTMLButtonElement>[]>(
    relatedSearchTagInfos?.map(() => createRef<HTMLButtonElement>()) || []
  );

  if (!searchQuery)
    return (
      <div className='w-full bg-white hover:bg-[#f2f4f6] p-[0.4rem] rounded-md'>
        <span className='text-[#888e96] text-[0.825rem] font-extralight'>
          검색어를 입력해 주세요
        </span>
      </div>
    );

  if (searchQuery !== debouncedSearchQuery)
    return (
      <div className='w-full bg-white hover:bg-[#f2f4f6] p-[0.4rem] rounded-md'>
        <span className='text-[#888e96] text-[0.825rem] font-extralight'>
          불러오고 있습니다...
        </span>
      </div>
    );

  if (!relatedSearchTagInfos || !Array.isArray(relatedSearchTagInfos)) {
    return null;
  }

  return (
    <div>
      <button
        onClick={() => {
          router.push(`/community/search?q=${encodeURIComponent(searchQuery)}`);
        }}
        ref={itemRefs.current[0]} // itemRef 대신 ref 사용
        className='search-result-item w-full flex items-center gap-x-3 bg-white hover:bg-[#f2f4f6] focus:bg-[#f2f4f6] focus:outline-none p-[0.4rem] rounded-md'
      >
        <svg
          fill='none'
          width='32.5'
          height='32.5'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          className='p-[0.4rem] rounded-full'
          style={{ background: 'rgba(2, 32, 71, 0.05)' }}
        >
          <path
            d='m19.59 18.41-3.205-3.203c1.0712-1.3712 1.579-3.0994 1.4197-4.832-.1593-1.73274-.9735-3.3394-2.2767-4.49233s-2.9972-1.76527-4.7364-1.71212c-1.73913.05315-3.39252.76779-4.62288 1.99815s-1.945 2.88375-1.99815 4.6229c-.05316 1.7392.55918 3.4332 1.71211 4.7364s2.7596 2.1174 4.49232 2.2767c1.7327.1592 3.4608-.3485 4.832-1.4197l3.204 3.204c.1567.1541.3678.24.5876.2391.2197-.0009.4302-.0886.5856-.2439.1554-.1554.243-.3659.2439-.5856.001-.2198-.085-.431-.2391-.5876zm-4.886-3.808c-.0183.0156-.036.032-.053.049-.042.044-.042.044-.08.092-.91.886-2.197 1.424-3.571 1.424-1.19232.0001-2.348-.4121-3.27107-1.1668s-1.55672-1.8055-1.79352-2.974c-.2368-1.1686-.06217-2.38311.49428-3.43762s1.46047-1.88413 2.55878-2.34819c1.09833-.46405 2.32333-.53398 3.46733-.19793s2.1365 1.0574 2.8094 2.04174c.6728.98434.9845 2.1711.8822 3.359-.1022 1.1879-.6122 2.3039-1.4434 3.1588z'
            fill='#8994a2'
            stroke='#8994a2'
            strokeWidth='0.25'
          ></path>
        </svg>

        <span className='text-inherit font-medium'>{searchQuery}</span>
      </button>

      {relatedSearchTagInfos.map((tagInfo: TagInfo, index: number) => (
        <SearchTagListItem
          tagInfo={tagInfo}
          key={index}
          setSearchQuery={setSearchQuery}
          ref={itemRefs.current[index]} // ref 전달
          className='search-result-item' // Add this line
        />
      ))}
    </div>
  );
}
