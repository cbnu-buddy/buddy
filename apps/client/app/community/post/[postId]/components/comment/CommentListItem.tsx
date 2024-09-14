import { CommentInfo } from "@/types/comment";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ReplyList from "./reply/ReplyList";
import { formatDateAndTimeAgo } from "@/utils/formatDate";
import { userInfoStore } from "@/store/UserInfo";
import { UserInfo } from "@/types/user";

interface CommentListItemProps {
  commentInfo: CommentInfo;
  index: number;
  length: number;
  postId: string;
  setSelectedCommentInfo: React.Dispatch<
    React.SetStateAction<{ commentId: number; commentContent: string }>
  >;
  setSelectedReplyInfo: React.Dispatch<
    React.SetStateAction<{ replyId: number; replyContent: string }>
  >;
  setIsOpenCommentManagingBottomDrawer: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setIsOpenReplyManagingBottomDrawer: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function CommentListItem(props: CommentListItemProps) {
  const {
    commentInfo,
    index,
    length,
    postId,
    setSelectedCommentInfo,
    setSelectedReplyInfo,
    setIsOpenCommentManagingBottomDrawer,
    setIsOpenReplyManagingBottomDrawer,
  } = props;

  const userInfo: UserInfo = userInfoStore((state: any) => state.userInfo);

  const [isLikedComment, setIsLikedComment] = useState<boolean>(false);

  return (
    <div
      className={`flex flex-col gap-y-2 ${
        commentInfo.replies.length !== 0 && "pb-[0.675rem]"
      } ${length - 1 !== index && "border-b"}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-[0.375rem]">
          {commentInfo.writer.profileImagePathUrl ? (
            <div className="relative w-[30px] h-[30px]">
              <Image
                src={commentInfo.writer.profileImagePathUrl}
                alt="profileImage"
                fill
                quality={100}
                className="rounded-full"
              />
            </div>
          ) : (
            <span className="w-[30px] h-[30px] flex justify-center items-center bg-[#eee] text-[#4e5968] font-medium rounded-full">
              {commentInfo.writer.username.charAt(0)}
            </span>
          )}
          <span className="text-[0.825rem] text-[#333d4b] font-medium">
            {commentInfo.writer.username}
          </span>
        </div>

        <div className="flex items-center gap-x-1 text-xs text-[#4e5968] text-right">
          {formatDateAndTimeAgo(commentInfo.createdAt)}

          {userInfo.memberId === commentInfo.writer.memberId && (
            <button
              onClick={() => {
                setSelectedCommentInfo(commentInfo);
                setIsOpenCommentManagingBottomDrawer(true);
              }}
              className="p-[0.1rem] rounded-md hover:bg-[#f6f6f6]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25"
                viewBox="0 -960 960 960"
                width="25"
                fill="#282828"
              >
                <path d="M480-189.23q-24.75 0-42.37-17.63Q420-224.48 420-249.23q0-24.75 17.63-42.38 17.62-17.62 42.37-17.62 24.75 0 42.37 17.62Q540-273.98 540-249.23q0 24.75-17.63 42.37-17.62 17.63-42.37 17.63ZM480-420q-24.75 0-42.37-17.63Q420-455.25 420-480q0-24.75 17.63-42.37Q455.25-540 480-540q24.75 0 42.37 17.63Q540-504.75 540-480q0 24.75-17.63 42.37Q504.75-420 480-420Zm0-230.77q-24.75 0-42.37-17.62Q420-686.02 420-710.77q0-24.75 17.63-42.37 17.62-17.63 42.37-17.63 24.75 0 42.37 17.63Q540-735.52 540-710.77q0 24.75-17.63 42.38-17.62 17.62-42.37 17.62Z"></path>
              </svg>
            </button>
          )}
        </div>
      </div>

      <p className="mt-[0.175rem] text-xs text-[#333d4b]">
        {commentInfo.commentContent}
      </p>

      <div className="flex items-center gap-x-2">
        <button
          onClick={() => setIsLikedComment((prev) => !prev)}
          className={`relative ml-[-0.25rem] flex items-center bg-[#f2f4f6] text-[#4e5968] rounded-full px-2 py-[0.3rem] ${
            isLikedComment && "outline outline-1 outline-[#3a8af9]"
          }`}
        >
          {isLikedComment ? (
            <svg
              width="32"
              height="32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-1 scale-[0.6]"
            >
              <path
                d="M27.661 15.92c0-.079 0-.079 0 0 0-2.222-.56-4.127-1.521-5.794-1.04-1.667-2.402-3.017-4.163-3.97-1.761-.952-3.763-1.428-6.004-1.428-2.242 0-4.244.476-6.005 1.508-1.761.952-3.122 2.302-4.163 4.048-.96 1.747-1.44 3.652-1.44 5.796 0 2.143.56 4.128 1.52 5.795 1.041 1.746 2.402 3.016 4.163 3.97 1.762.952 3.763 1.428 5.925 1.428H27.65l.01-11.352z"
                fill="#FABA44"
              />
              <path
                d="M11.273 17.096c0-.2.162-.364.363-.364h4.727c.201 0 .364.163.364.364v.91a2.727 2.727 0 11-5.454 0v-.91z"
                fill="#FC6916"
              />
              <path
                d="M12.105 19.98s.758.815 2.054.736c1.296-.078 1.86-.877 1.86-.877a1.126 1.126 0 00-.72-.446c-.878-.146-1.237-.153-2.164-.02-.409.06-.777.28-1.03.607z"
                fill="#C53030"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.305 13.132c.177-.327.286-.7.31-1.102.077-1.373-.898-2.546-2.178-2.618-.691-.04-1.33.25-1.783.74a2.236 2.236 0 00-1.576-.795c-1.28-.072-2.381.983-2.459 2.356-.038.677.18 1.306.563 1.777.11.165.208.297.208.297s.336.358.559.581c.88.882 2.42 2.083 2.42 2.083s1.771-1.06 2.772-1.915l.13-.111c.142-.12.252-.212.404-.367.19-.193.293-.306.453-.524a.893.893 0 00.177-.402z"
                fill="url(#paint0_linear_10118_43030)"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.851 13.132c.176-.327.286-.7.309-1.102.078-1.373-.897-2.546-2.178-2.618-.69-.04-1.329.25-1.782.74a2.236 2.236 0 00-1.576-.795c-1.28-.072-2.381.983-2.459 2.356-.038.677.18 1.306.563 1.777.11.165.207.297.207.297s.337.358.56.581c.88.882 2.419 2.083 2.419 2.083s1.772-1.06 2.773-1.915l.13-.111c.142-.12.252-.212.404-.367.19-.193.293-.306.453-.524a.893.893 0 00.177-.402z"
                fill="url(#paint1_linear_10118_43030)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_10118_43030"
                  x1="8.761"
                  y1="9.317"
                  x2="8.357"
                  y2="16.45"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F09" />
                  <stop offset="1" stopColor="#F09" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_10118_43030"
                  x1="19.307"
                  y1="9.317"
                  x2="18.903"
                  y2="16.45"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F09" />
                  <stop offset="1" stopColor="#F09" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <svg
              width="32"
              height="32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-1 scale-[0.6]"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26.14 10.126c.96 1.667 1.52 3.572 1.52 5.795l-.01 11.352H15.973c-2.162 0-4.163-.476-5.925-1.429-1.76-.953-3.122-2.223-4.163-3.97-.96-1.666-1.52-3.65-1.52-5.794 0-2.144.48-4.049 1.44-5.795 1.041-1.747 2.402-3.097 4.163-4.05 1.762-1.031 3.763-1.507 6.005-1.507 2.241 0 4.243.476 6.004 1.428 1.761.953 3.122 2.303 4.163 3.97zM11.46 14.42a1.028 1.028 0 100-2.056 1.028 1.028 0 000 2.056zm3.085 6.273a6.172 6.172 0 01-5.818-4.113h1.33a4.936 4.936 0 008.976 0h1.33a6.172 6.172 0 01-5.818 4.113zm4.113-7.3a1.028 1.028 0 11-2.056 0 1.028 1.028 0 012.056 0z"
                fill="#9ba2ac"
              />
            </svg>
          )}
          <span
            className={`ml-[1.375rem] ${
              isLikedComment ? "text-gray-600" : "text-[#8b95a1]"
            } text-xs`}
          >
            {commentInfo.likeCount}
          </span>
        </button>

        <Link
          href={`/community/post/${postId}/comment/${commentInfo.commentId}`}
          className="text-xs text-[#646464]"
        >
          답글쓰기
        </Link>
      </div>

      <ReplyList
        postId={postId}
        commentId={commentInfo.commentId}
        setSelectedReplyInfo={setSelectedReplyInfo}
        replyInfos={commentInfo.replies}
        setIsOpenReplyManagingBottomDrawer={setIsOpenReplyManagingBottomDrawer}
      />
    </div>
  );
}
