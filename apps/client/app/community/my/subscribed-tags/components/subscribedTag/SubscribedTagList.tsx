'use client';

import React, { useEffect } from 'react';
import Loading from '@/app/loading';
import axiosInstance from '@/utils/axiosInstance';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { MySubscribedTagInfo } from '@/types/tag';
import SubscribedTagListItem from './SubscribedTagListItem';
import EmptySubscribedTagListItem from './EmptySubscribedTagListItem';
import UnSubscribedTagListItem from './UnSubscribedTagListItem';

interface SubscribedTagListProps {
  resData: MySubscribedTagInfo[];
  setResData: React.Dispatch<React.SetStateAction<MySubscribedTagInfo[]>>;
  setIsOpenSubscribeCompleteToast: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setIsOpenUnSubscribeCompleteToast: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setIsOpenBottomDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTagInfo: {
    tagId: number;
    tag: string;
    isReceiveNotification: boolean;
  };
  setSelectedTagInfo: React.Dispatch<
    React.SetStateAction<{
      tagId: number;
      tag: string;
      isReceiveNotification: boolean;
    }>
  >;
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

export default function SubscribedTagList(props: SubscribedTagListProps) {
  const {
    resData,
    setResData,
    setIsOpenSubscribeCompleteToast,
    setIsOpenUnSubscribeCompleteToast,
    setIsOpenBottomDrawer,
    selectedTagInfo,
    setSelectedTagInfo,
  } = props;

  const params = useSearchParams();

  // const { isPending, data } = useQuery({
  //   queryKey: ['examList', page, debouncedSearchQuery],
  //   queryFn: fetchExams,
  // });

  const router = useRouter();

  // const resData = data?.data;

  // if (isPending) return <Loading />;

  return (
    <div className='flex flex-col gap-y-3'>
      {resData?.length === 0 && <EmptySubscribedTagListItem />}
      {resData?.map((mySubscribedTagInfo: MySubscribedTagInfo, index: number) =>
        mySubscribedTagInfo.isSubscribed ? (
          <SubscribedTagListItem
            key={index}
            mySubscribedTagInfo={mySubscribedTagInfo}
            setIsOpenBottomDrawer={setIsOpenBottomDrawer}
            selectedTagInfo={selectedTagInfo}
            setSelectedTagInfo={setSelectedTagInfo}
          />
        ) : (
          <UnSubscribedTagListItem
            key={index}
            setResData={setResData}
            mySubscribedTagInfo={mySubscribedTagInfo}
            selectedTagInfo={selectedTagInfo}
            setSelectedTagInfo={setSelectedTagInfo}
            setIsOpenSubscribeCompleteToast={setIsOpenSubscribeCompleteToast}
            setIsOpenUnSubscribeCompleteToast={
              setIsOpenUnSubscribeCompleteToast
            }
          />
        )
      )}
    </div>
  );
}
