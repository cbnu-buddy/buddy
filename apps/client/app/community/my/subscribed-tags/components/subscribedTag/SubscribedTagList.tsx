'use client';

import { MySubscribedTagInfo } from '@/types/tag';
import SubscribedTagListItem from './SubscribedTagListItem';
import EmptySubscribedTagListItem from './EmptySubscribedTagListItem';
import UnSubscribedTagListItem from './UnSubscribedTagListItem';

interface SubscribedTagListProps {
  mySubscribedTagInfos: MySubscribedTagInfo[];
  setMySubscribedTagInfos: React.Dispatch<
    React.SetStateAction<MySubscribedTagInfo[]>
  >;
  setIsOpenBottomDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTagInfo: {
    tagId: number;
    tagName: string;
    isReceiveNotification: boolean;
  };
  setSelectedTagInfo: React.Dispatch<
    React.SetStateAction<{
      tagId: number;
      tagName: string;
      isReceiveNotification: boolean;
    }>
  >;
}

export default function SubscribedTagList(props: SubscribedTagListProps) {
  const {
    mySubscribedTagInfos,
    setMySubscribedTagInfos,
    setIsOpenBottomDrawer,
    selectedTagInfo,
    setSelectedTagInfo,
  } = props;

  if (mySubscribedTagInfos.length === 0) return <EmptySubscribedTagListItem />;

  return (
    <div className='flex flex-col gap-y-3'>
      {mySubscribedTagInfos.map(
        (mySubscribedTagInfo: MySubscribedTagInfo, index: number) =>
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
              setMySubscribedTagInfos={setMySubscribedTagInfos}
              mySubscribedTagInfo={mySubscribedTagInfo}
              selectedTagInfo={selectedTagInfo}
              setSelectedTagInfo={setSelectedTagInfo}
            />
          )
      )}
    </div>
  );
}
