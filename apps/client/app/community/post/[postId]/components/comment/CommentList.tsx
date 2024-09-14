import React from "react";
import EmptyCommentListItem from "./EmptyCommentListItem";
import { CommentInfo } from "@/types/comment";
import CommentListItem from "./CommentListItem";

interface CommentListProps {
  postId: string;
  comments: CommentInfo[];
  setSelectedCommentId: React.Dispatch<React.SetStateAction<number>>;
  setSelectedReplyId: React.Dispatch<React.SetStateAction<number>>;
  setIsOpenCommentManagingBottomDrawer: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setIsOpenReplyManagingBottomDrawer: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

function CommentList({
  postId,
  comments,
  setSelectedCommentId,
  setSelectedReplyId,
  setIsOpenCommentManagingBottomDrawer,
  setIsOpenReplyManagingBottomDrawer,
}: CommentListProps) {
  return (
    <div className="mt-5 flex flex-col gap-y-[0.7rem]">
      {comments?.length === 0 && <EmptyCommentListItem />}
      {comments?.map((commentInfo: CommentInfo, index: number) => (
        <CommentListItem
          key={index}
          commentInfo={commentInfo}
          index={index}
          length={comments.length}
          postId={postId}
          setSelectedCommentId={setSelectedCommentId}
          setSelectedReplyId={setSelectedReplyId}
          setIsOpenCommentManagingBottomDrawer={
            setIsOpenCommentManagingBottomDrawer
          }
          setIsOpenReplyManagingBottomDrawer={
            setIsOpenReplyManagingBottomDrawer
          }
        />
      ))}
    </div>
  );
}

export default React.memo(CommentList);
