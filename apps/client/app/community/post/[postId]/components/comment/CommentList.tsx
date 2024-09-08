import React from 'react';
import EmptyCommentListItem from './EmptyCommentListItem';
import { CommentInfo } from '@/types/comment';
import CommentListItem from './CommentListItem';
import { commentInfos } from '@/data/mock/commentInfos';

interface CommentListProps {
  postId: string;
  setIsOpenCommentAndReplyManagingBottomDrawer: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function CommentList(props: CommentListProps) {
  const { postId, setIsOpenCommentAndReplyManagingBottomDrawer } = props;

  const resData: CommentInfo[] = commentInfos;

  return (
    <div className='mt-5 flex flex-col gap-y-[0.7rem]'>
      {resData?.length === 0 && <EmptyCommentListItem />}
      {resData?.map((commentInfo: CommentInfo, index: number) => (
        <CommentListItem
          key={index}
          commentInfo={commentInfo}
          index={index}
          length={resData.length}
          postId={postId}
          setIsOpenCommentAndReplyManagingBottomDrawer={
            setIsOpenCommentAndReplyManagingBottomDrawer
          }
        />
      ))}
    </div>
  );
}
