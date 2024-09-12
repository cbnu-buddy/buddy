import React from "react";
import EmptyCommentListItem from "./EmptyCommentListItem";
import { CommentInfo } from "@/types/comment";
import CommentListItem from "./CommentListItem";

interface CommentListProps {
  postId: string;
  comments: CommentInfo[];
  setIsOpenCommentAndReplyManagingBottomDrawer: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function CommentList(props: CommentListProps) {
  const { postId, comments, setIsOpenCommentAndReplyManagingBottomDrawer } =
    props;

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
          setIsOpenCommentAndReplyManagingBottomDrawer={
            setIsOpenCommentAndReplyManagingBottomDrawer
          }
        />
      ))}
    </div>
  );
}
