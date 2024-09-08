'use client';

import React, { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import axiosInstance from '@/utils/axiosInstance';
import useDebounce from '@/utils/hooks/useDebounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import NoneTagListItem from './NoneTagListItem';
import TagListItem from './TagListItem';
import { PostInfo } from '@/types/post';
import { TagInfo } from '@/types/tag';
import { tagInfos } from '@/data/mock/tagInfos';

interface TagPostListProps {
  searchQuery: string;
  selectedTagInfo: TagInfo;
  setSelectedTagInfo: React.Dispatch<React.SetStateAction<TagInfo>>;
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

export default function TagList(props: TagPostListProps) {
  const { searchQuery, selectedTagInfo, setSelectedTagInfo } = props;

  const debouncedSearchQuery = useDebounce(searchQuery, 400);

  const params = useSearchParams();

  const page = Number(params?.get('page')) || 1;

  // const { isPending, data } = useQuery({
  //   queryKey: ['examList', page, debouncedSearchQuery],
  //   queryFn: fetchExams,
  // });

  const router = useRouter();

  // const resData = data?.data;
  const resData = tagInfos;

  // if (isPending) return <Loading />;

  return (
    <div className='mt-3 flex flex-wrap gap-x-1 gap-y-[0.375rem]'>
      {resData?.length === 0 && <NoneTagListItem />}
      {resData?.map((tagInfo: TagInfo, index: number) => (
        <TagListItem
          tagInfo={tagInfo}
          key={index}
          index={index}
          length={resData.length}
          selectedTagInfo={selectedTagInfo}
          setSelectedTagInfo={setSelectedTagInfo}
        />
      ))}
    </div>
  );
}
