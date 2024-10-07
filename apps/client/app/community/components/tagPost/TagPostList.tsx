'use client';

import Loading from '@/app/loading';
import axiosInstance from '@/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import EmptyTagPostListItem from './EmptyTagPostListItem';
import TagPostListItem from './TagPostListItem';
import { PostInfo } from '@/types/post';
import { useEffect } from 'react';

// 회원의 구독한 태그 목록 정보 조회 API
const fetchTagPostInfos = ({ queryKey }: any) => {
  const searchQuery = queryKey[1];
  return axiosInstance.get(
    `/public/community/posts?tag=${searchQuery}&limit=10`
  );
};

interface TagPostListProps {
  searchQuery: string;
}

export default function TagPostList({ searchQuery }: TagPostListProps) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['tagPostInfos', searchQuery],
    queryFn: fetchTagPostInfos,
    retry: 0,
  });

  const tagPostInfos: PostInfo[] = data?.data.response;

  if (isPending) return <Loading />;

  return (
    <div className='mt-3 flex flex-col gap-y-3'>
      {tagPostInfos?.length === 0 ? (
        <EmptyTagPostListItem />
      ) : (
        <>
          {tagPostInfos?.map((hotPostInfo: PostInfo, index: number) => (
            <TagPostListItem
              postInfo={hotPostInfo}
              key={index}
              index={index}
              length={tagPostInfos.length}
            />
          ))}
        </>
      )}
    </div>
  );
}
