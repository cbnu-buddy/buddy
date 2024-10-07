'use client';

import Loading from '@/app/loading';
import axiosInstance from '@/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import EmptyPostListItem from './EmptyPostListItem';
import PostListItem from './PostListItem';
import { PostInfo } from '@/types/post';

// 커뮤니티 최신 게시글 목록 정보 조회 API
const fetchHotPostInfos = () => {
  return axiosInstance.get(`/public/community/posts/latest?limit=${10}`);
};

export default function PostList() {
  const { isPending, data } = useQuery({
    queryKey: ['postInfos'],
    queryFn: fetchHotPostInfos,
  });

  const communityPostInfos: PostInfo[] = data?.data.response;

  if (isPending) return <Loading />;

  return (
    <div className='mt-3 flex flex-col gap-y-3'>
      {communityPostInfos?.length === 0 && <EmptyPostListItem />}
      {communityPostInfos?.map((hotPostInfo: PostInfo, index: number) => (
        <PostListItem
          postInfo={hotPostInfo}
          key={index}
          index={index}
          length={communityPostInfos.length}
        />
      ))}
    </div>
  );
}
