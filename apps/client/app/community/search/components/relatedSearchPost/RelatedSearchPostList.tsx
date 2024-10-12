'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Loading from '@/app/loading';
import EmptyRelatedSearchPostListItem from './EmptyRelatedSearchPostListItem';
import RelatedSearchPostListItem from './RelatedSearchPostListItem';
import { PostInfo } from '@/types/post';

interface RelatedSearchPostListProps {
  resData: PostInfo[];
}

export default function RelatedSearchPostList({
  resData,
}: RelatedSearchPostListProps) {
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<PostInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setLoading(true);
    const newPosts = resData.slice((page - 1) * 3, page * 3);
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setHasMore(newPosts.length > 0);
    setLoading(false);
  }, [page]);

  return (
    <div className='mt-2'>
      {posts.length === 0 ? (
        <EmptyRelatedSearchPostListItem />
      ) : (
        <div className='flex flex-col gap-y-3'>
          {posts.map((postInfo: PostInfo, index: number) => {
            if (posts.length === index + 1) {
              return (
                <div ref={lastPostElementRef} key={postInfo.postId}>
                  <RelatedSearchPostListItem
                    postInfo={postInfo}
                    index={index}
                    length={posts.length}
                  />
                </div>
              );
            } else {
              return (
                <RelatedSearchPostListItem
                  postInfo={postInfo}
                  key={postInfo.postId}
                  index={index}
                  length={posts.length}
                />
              );
            }
          })}
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
}
