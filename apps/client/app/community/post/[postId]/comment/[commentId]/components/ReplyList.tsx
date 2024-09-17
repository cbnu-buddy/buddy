import React from "react";
import { ReplyInfo } from "@/types/reply";
import ReplyListItem from "./ReplyListItem";

interface ReplyListProps {
  replyInfos: ReplyInfo[];
  setSelectedReplyInfo: React.Dispatch<
    React.SetStateAction<{ replyId: number; replyContent: string }>
  >;
  setIsOpenReplyManagingBottomDrawer: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function ReplyList(props: ReplyListProps) {
  const {
    replyInfos,
    setSelectedReplyInfo,
    setIsOpenReplyManagingBottomDrawer,
  } = props;

  return (
    <div className="mt-1 flex flex-col gap-y-3">
      {replyInfos?.length !== 0 &&
        replyInfos?.map((replyInfo: ReplyInfo, index: number) => (
          <ReplyListItem
            replyInfo={replyInfo}
            key={index}
            setSelectedReplyInfo={setSelectedReplyInfo}
            setIsOpenReplyManagingBottomDrawer={
              setIsOpenReplyManagingBottomDrawer
            }
          />
        ))}
    </div>
  );
}
