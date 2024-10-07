'use client';

import React, { useEffect } from 'react';
import Loading from '@/app/loading';
import axiosInstance from '@/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import NoneTagListItem from './NoneTagListItem';
import TagListItem from './TagListItem';
import { MySubscribedTagInfo, TagInfo } from '@/types/tag';

// 회원의 구독한 태그 목록 정보 조회 API
const fetchMySubscribedTagInfos = () => {
  return axiosInstance.get(`/private/subscribe/my/subscribed-tags`);
};

interface TagPostListProps {
  selectedTagInfo: TagInfo;
  setSelectedTagInfo: React.Dispatch<React.SetStateAction<TagInfo>>;
  setMySubscribedTagNum: React.Dispatch<React.SetStateAction<number>>;
}

export default function TagList(props: TagPostListProps) {
  const { selectedTagInfo, setSelectedTagInfo, setMySubscribedTagNum } = props;

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['mySubscribedTagInfos'],
    queryFn: fetchMySubscribedTagInfos,
    retry: 0,
  });

  const mySubscribedTagInfos: MySubscribedTagInfo[] = data?.data.response;

  useEffect(() => {
    if (mySubscribedTagInfos && mySubscribedTagInfos.length > 0) {
      setMySubscribedTagNum(mySubscribedTagInfos.length);
      setSelectedTagInfo(mySubscribedTagInfos[0]);
    }
  }, [mySubscribedTagInfos, setMySubscribedTagNum, setSelectedTagInfo]);

  if (isPending) return <Loading />;

  return (
    <div className='mt-3 flex flex-wrap gap-x-1 gap-y-[0.375rem]'>
      {mySubscribedTagInfos?.length === 0 && <NoneTagListItem />}
      {mySubscribedTagInfos?.map((tagInfo: TagInfo, index: number) => (
        <TagListItem
          tagInfo={tagInfo}
          key={index}
          index={index}
          length={mySubscribedTagInfos.length}
          selectedTagInfo={selectedTagInfo}
          setSelectedTagInfo={setSelectedTagInfo}
        />
      ))}
    </div>
  );
}
