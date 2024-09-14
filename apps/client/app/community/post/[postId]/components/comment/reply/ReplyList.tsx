import React from "react";
import { ReplyInfo } from "@/types/reply";
import ReplyListItem from "./ReplyListItem";
import { commentInfo } from "@/data/mock/commentInfos";

interface ReplyListProps {
  postId: string;
  commentId: number;
  replyInfos: ReplyInfo[];
  setSelectedReplyId: React.Dispatch<React.SetStateAction<number>>;
  setIsOpenReplyManagingBottomDrawer: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function ReplyList(props: ReplyListProps) {
  const {
    postId,
    commentId,
    replyInfos,
    setSelectedReplyId,
    setIsOpenReplyManagingBottomDrawer,
  } = props;

  return (
    <div className="mt-1 flex flex-col gap-y-3">
      {replyInfos?.length !== 0 &&
        replyInfos?.map((replyInfo: ReplyInfo, index: number) => (
          <ReplyListItem
            postId={postId}
            commentId={commentId}
            replyInfo={replyInfo}
            key={index}
            setIsSelectedReplyId={setSelectedReplyId}
            setIsOpenReplyManagingBottomDrawer={
              setIsOpenReplyManagingBottomDrawer
            }
          />
        ))}
    </div>
  );
}
