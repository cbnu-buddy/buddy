'use client';

import Loading from '@/app/loading';
import axiosInstance from '@/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import EmptyFeedPostListItem from './EmptyFeedPostListItem';
import FeedPostListItem from './FeedPostListItem';
import { PostInfo } from '@/types/post';
import { useEffect } from 'react';

// 커뮤니티 최신 게시글 목록 정보 조회 API
const fetchHotPostInfos = () => {
  return axiosInstance.get(`/public/community/posts/latest?limit=${10}`);
};

// 커뮤니티 태그 검색 게시글 목록 정보 조회 API
const fetchTagPostInfos = (searchQuery: string) => {
  return axiosInstance.get(
    `/public/community/posts?tag=${searchQuery}&limit=${10}`
  );
};

interface FeedPostListProps {
  searchQuery: string;
  setSearchedPostNum: React.Dispatch<React.SetStateAction<number>>;
}

export default function FeedPostList(props: FeedPostListProps) {
  const { searchQuery, setSearchedPostNum } = props;

  const { isPending, data } = useQuery({
    queryKey: ['postInfos', searchQuery],
    queryFn: () =>
      searchQuery ? fetchTagPostInfos(searchQuery) : fetchHotPostInfos(),
  });

  const communityPostInfos: PostInfo[] = data?.data.response;

  useEffect(() => {
    if (communityPostInfos) {
      setSearchedPostNum(communityPostInfos.length);
    }
  }, [communityPostInfos, setSearchedPostNum]);

  if (isPending) return <Loading />;

  return (
    <div className='mt-2'>
      {communityPostInfos?.length === 0 ? (
        <EmptyFeedPostListItem />
      ) : (
        <div className='flex flex-col gap-y-3'>
          {communityPostInfos?.map((hotPostInfo: PostInfo, index: number) => (
            <FeedPostListItem
              postInfo={hotPostInfo}
              key={index}
              index={index}
              length={communityPostInfos.length}
            />
          ))}
        </div>
      )}
    </div>
  );
}
