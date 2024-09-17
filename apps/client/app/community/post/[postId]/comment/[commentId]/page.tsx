"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { formatDateAndTimeAgo } from "@/utils/formatDate";
import ReplyList from "./components/ReplyList";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userInfoStore } from "@/store/UserInfo";
import { UserInfo } from "@/types/user";
import { PostInfo } from "@/types/post";
import { CommentInfo } from "@/types/comment";
import Loading from "@/app/loading";
import NotFound from "@/app/[...Not_found]/page";
import { AxiosError } from "axios";
import { ToastInfoStore } from "@/store/components/ToastInfo";
import ConfirmDeleteCommunityPostReplyModal from "./components/ConfirmDeleteCommunityPostReplyModal";
import ConfirmDeleteCommunityPostCommentModal from "./components/ConfirmDeleteCommunityPostCommentModal";

// 커뮤니티 게시글 정보 조회 API
const fetchCommunityPostInfo = ({ queryKey }: any) => {
  const postId = queryKey[1];
  return axiosInstance.get(`/public/community/posts/${postId}`);
};

// 커뮤니티 게시글 답글 작성하기 API
const addCommunityPostReply = ({
  commentId,
  comment,
}: {
  commentId: string;
  comment: string;
}) => {
  const requestBody = {
    content: comment,
  };
  return axiosInstance.post(
    `/private/comments/${commentId}/reply`,
    requestBody
  );
};

// 커뮤니티 게시글 댓글 수정하기 API
const modifyCommunityPostComment = ({
  commentId,
  comment,
}: {
  commentId: number;
  comment: string;
}) => {
  const requestBody = {
    content: comment,
  };
  return axiosInstance.patch(
    `/private/posts/comments/${commentId}`,
    requestBody
  );
};

// 커뮤니티 게시글 답글 수정하기 API
const modifyCommunityPostReply = ({
  replyId,
  comment,
}: {
  replyId: number;
  comment: string;
}) => {
  const requestBody = {
    content: comment,
  };
  return axiosInstance.patch(
    `/private/comments/replies/${replyId}`,
    requestBody
  );
};

interface DefaultProps {
  params: {
    postId: string;
    commentId: string;
  };
}

export default function CommunityPostComment(props: DefaultProps) {
  const postId = props.params.postId;
  const commentId = props.params.commentId;

  const queryClient = useQueryClient();

  const updateToastMessage = ToastInfoStore(
    (state: any) => state.updateToastMessage
  );
  const updateOpenToastStatus = ToastInfoStore(
    (state: any) => state.updateOpenToastStatus
  );

  const router = useRouter();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["communityPostInfo", postId],
    queryFn: fetchCommunityPostInfo,
    retry: 0,
  });

  const addCommunityPostReplyMutation = useMutation({
    mutationFn: addCommunityPostReply,
    onMutate: () => {},
    onError: (error: AxiosError) => {
      const resData: any = error.response;

      switch (resData?.status) {
        case 409:
          switch (resData?.data.error.status) {
            default:
              alert("정의되지 않은 http code입니다.");
          }
          break;
        default:
          alert("정의되지 않은 http status code입니다");
      }
    },
    onSuccess: (data) => {
      const httpStatusCode = data.status;

      switch (httpStatusCode) {
        case 200:
          setComment("");
          // 쿼리 데이터 업데이트
          queryClient.invalidateQueries({
            queryKey: ["communityPostInfo", postId],
          });
          setIsNewCommentAdded(true);
          break;
        default:
          alert("정의되지 않은 http status code입니다");
      }
    },
    onSettled: () => {},
  });

  const modifyCommunityPostCommentMutation = useMutation({
    mutationFn: modifyCommunityPostComment,
    onMutate: () => {},
    onError: (error: AxiosError) => {
      const resData: any = error.response;

      switch (resData?.status) {
        case 409:
          switch (resData?.data.error.status) {
            default:
              alert("정의되지 않은 http code입니다.");
          }
          break;
        default:
          alert("정의되지 않은 http status code입니다");
      }
    },
    onSuccess: (data) => {
      const httpStatusCode = data.status;

      switch (httpStatusCode) {
        case 200:
          setComment("");
          // 쿼리 데이터 업데이트
          queryClient.invalidateQueries({
            queryKey: ["communityPostInfo", postId],
          });
          setComment("");
          setIsCommentEditStatus(false);
          updateToastMessage("댓글이 수정됐어요");
          updateOpenToastStatus(true);
          break;
        default:
          alert("정의되지 않은 http status code입니다");
      }
    },
    onSettled: () => {},
  });

  const modifyCommunityPostReplyMutation = useMutation({
    mutationFn: modifyCommunityPostReply,
    onMutate: () => {},
    onError: (error: AxiosError) => {
      const resData: any = error.response;

      switch (resData?.status) {
        case 409:
          switch (resData?.data.error.status) {
            default:
              alert("정의되지 않은 http code입니다.");
          }
          break;
        default:
          alert("정의되지 않은 http status code입니다");
      }
    },
    onSuccess: (data) => {
      const httpStatusCode = data.status;

      switch (httpStatusCode) {
        case 200:
          setComment("");
          // 쿼리 데이터 업데이트
          queryClient.invalidateQueries({
            queryKey: ["communityPostInfo", postId],
          });
          setComment("");
          setIsReplyEditStatus(false);
          updateToastMessage("답글이 수정됐어요");
          updateOpenToastStatus(true);
          break;
        default:
          alert("정의되지 않은 http status code입니다");
      }
    },
    onSettled: () => {},
  });

  const userInfo: UserInfo = userInfoStore((state: any) => state.userInfo);

  const resData = data?.data.response;
  const postInfo: PostInfo = resData;

  // commentId와 일치하는 댓글을 찾음
  const matchedComment = postInfo?.comments.find(
    (comment: CommentInfo) => comment.commentId === Number(commentId)
  );

  const [
    openConfirmDeleteCommunityPostCommentModal,
    setOpenConfirmDeleteCommunityPostCommentModal,
  ] = useState<string | undefined>();
  const [
    openConfirmDeleteCommunityPostReplyModal,
    setOpenConfirmDeleteCommunityPostReplyModal,
  ] = useState<string | undefined>();
  const [comment, setComment] = useState<string>("");
  const [isCommentEditStatus, setIsCommentEditStatus] =
    useState<boolean>(false);
  const [isReplyEditStatus, setIsReplyEditStatus] = useState<boolean>(false);
  const [isNewCommentAdded, setIsNewCommentAdded] = useState<boolean>(false);
  const [selectedCommentInfo, setSelectedCommentInfo] = useState({
    commentId: 0,
    commentContent: "",
  });
  const [selectedReplyInfo, setSelectedReplyInfo] = useState({
    replyId: 0,
    replyContent: "",
  });
  const [
    isOpenCommentManagingBottomDrawer,
    setIsOpenCommentManagingBottomDrawer,
  ] = useState<boolean>(false);
  const [isOpenReplyManagingBottomDrawer, setIsOpenReplyManagingBottomDrawer] =
    useState<boolean>(false);
  const [isBottomDrawerClosing, setIsBottomDrawerClosing] =
    useState<boolean>(false);

  const drawerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      event.preventDefault();
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        closeDrawer();
      }
    };

    const handleEscKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDrawer();
      }
    };

    if (isOpenCommentManagingBottomDrawer) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleEscKeyPress);
    } else {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscKeyPress);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isOpenCommentManagingBottomDrawer]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      event.preventDefault();
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        closeDrawer();
      }
    };

    const handleEscKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDrawer();
      }
    };

    if (isOpenReplyManagingBottomDrawer) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleEscKeyPress);
    } else {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscKeyPress);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isOpenReplyManagingBottomDrawer]);

  const closeDrawer = () => {
    setIsBottomDrawerClosing(true);
    setTimeout(() => {
      setIsOpenCommentManagingBottomDrawer(false);
      setIsOpenReplyManagingBottomDrawer(false);
      setIsBottomDrawerClosing(false);
    }, 375);
  };

  const adjustHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "2rem"; // 초기 높이로 리셋
      textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 맞게 높이 조절
    }

    setComment(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      e.key === "Enter" &&
      !isCommentEditStatus &&
      !isReplyEditStatus
    ) {
      handleAddReply();
      return;
    }

    if (
      (e.ctrlKey || e.metaKey) &&
      e.key === "Enter" &&
      isCommentEditStatus &&
      !isReplyEditStatus
    ) {
      handleModifyComment();
      return;
    }

    if (
      (e.ctrlKey || e.metaKey) &&
      e.key === "Enter" &&
      isReplyEditStatus &&
      !isCommentEditStatus
    ) {
      handleModifyReply();
      return;
    }
  };

  const handleAddReply = () => {
    if (comment) {
      addCommunityPostReplyMutation.mutate({ commentId, comment });
    }
  };

  const handleModifyComment = () => {
    if (comment) {
      modifyCommunityPostCommentMutation.mutate({
        commentId: selectedCommentInfo.commentId,
        comment,
      });
    }
  };

  const handleModifyReply = () => {
    if (comment) {
      modifyCommunityPostReplyMutation.mutate({
        replyId: selectedReplyInfo.replyId,
        comment,
      });
    }
  };

  // 댓글 추가 후 스크롤을 강제로 최하단으로 이동
  useEffect(() => {
    if (isNewCommentAdded) {
      window.scrollTo({
        top: document.body.scrollHeight, // 최하단으로 이동
        behavior: "smooth",
      });
      setIsNewCommentAdded(false); // 스크롤 후 플래그 초기화
    }
  }, [isNewCommentAdded]);

  if (isError) return <NotFound />;
  if (isPending || !matchedComment) return <Loading />;

  return (
    <div className="flex flex-col w-[37.5rem] mx-auto pt-6">
      <div className="mt-2 flex items-center">
        <button
          onClick={() => {
            router.back();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="m112.769-480 308.616 308.615q8.846 8.846 8.731 21.154-.116 12.308-8.962 21.154T400-120.231q-12.308 0-21.154-8.846L73.154-434.538Q63.46-444.231 59-456.154 54.538-468.077 54.538-480T59-503.846q4.461-11.923 14.154-21.616l305.692-305.692q8.846-8.846 21.269-8.731 12.424.116 21.27 8.962t8.846 21.154q0 12.308-8.846 21.154L112.769-480Z" />
          </svg>
        </button>
        <h1 className="mx-auto font-semibold text-lg text-[#333d4b]">댓글</h1>
      </div>

      <div className="h-full mt-5 bg-[#f9fafb] text-[#4e5968] rounded-t-2xl p-7 min-h-[35rem]">
        <div className="flex flex-col gap-y-2 pb-[8.5rem]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-[0.375rem]">
              {matchedComment.writer.profileImagePathUrl ? (
                <div className="relative w-[30px] h-[30px]">
                  <Image
                    src={matchedComment.writer.profileImagePathUrl}
                    alt="profileImage"
                    fill
                    quality={100}
                    className="rounded-full"
                  />
                </div>
              ) : (
                <span className="w-[30px] h-[30px] flex justify-center items-center bg-[#eee] text-[#4e5968] font-medium rounded-full">
                  {matchedComment.writer.username.charAt(0)}
                </span>
              )}
              <span className="text-[0.825rem] text-[#333d4b] font-medium">
                {matchedComment.writer.username}
              </span>
            </div>

            <div className="flex items-center gap-x-1 text-xs text-[#4e5968] text-right">
              {formatDateAndTimeAgo(matchedComment.createdAt)}

              {userInfo.memberId === matchedComment.writer.memberId && (
                <button
                  onClick={() => {
                    setSelectedCommentInfo(matchedComment);
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
            {matchedComment.commentContent}
          </p>

          <div className="flex items-center gap-x-2">
            <button
              // onClick={() => setIsLikedPost((prev) => !prev)}
              className={`relative ml-[-0.25rem] flex items-center bg-[#f2f4f6] text-[#4e5968] rounded-full px-2 py-[0.3rem] ${
                false && "outline outline-1 outline-[#3a8af9]"
              }`}
            >
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
              <span className="ml-[1.375rem] text-[#8b95a1] text-xs">0</span>
            </button>
          </div>

          <ReplyList
            replyInfos={matchedComment.replies}
            setSelectedReplyInfo={setSelectedReplyInfo}
            setIsOpenReplyManagingBottomDrawer={
              setIsOpenReplyManagingBottomDrawer
            }
          />
        </div>
      </div>
      <div className="w-[37.5rem] fixed bottom-0 bg-[#edeff1] px-4 py-[0.675rem]">
        <div className="flex justify-between  items-center gap-x-2">
          <textarea
            ref={textareaRef}
            placeholder="댓글을 작성해 주세요."
            value={comment}
            className="w-full h-[2rem] max-h-[3.75rem] p-2 border-none focus:ring-0 font-light text-xs placeholder:text-[#88909a] bg-transparent resize-none comment-scrollbar"
            onChange={(e) => adjustHeight(e)}
            onKeyDown={handleKeyDown}
          />
          {isCommentEditStatus || isReplyEditStatus ? (
            <div className="flex items-center">
              <button
                onClick={() => {
                  setComment("");
                  setIsCommentEditStatus(false);
                  setIsReplyEditStatus(false);
                }}
                className={`w-[3.3rem] py-[0.4rem] font-medium text-[#3a8af9] text-xs rounded-[0.3rem]`}
              >
                취소
              </button>
              {isCommentEditStatus && (
                <button
                  onClick={handleModifyComment}
                  disabled={comment ? false : true}
                  className={`w-[3.3rem] py-[0.4rem] font-medium ${
                    comment ? "bg-[#3a8af9] hover:bg-[#1c6cdb]" : "bg-[#90c2ff]"
                  } text-xs text-white rounded-[0.3rem]`}
                >
                  수정
                </button>
              )}
              {isReplyEditStatus && (
                <button
                  onClick={handleModifyReply}
                  disabled={comment ? false : true}
                  className={`w-[3.3rem] py-[0.4rem] font-medium ${
                    comment ? "bg-[#3a8af9] hover:bg-[#1c6cdb]" : "bg-[#90c2ff]"
                  } text-xs text-white rounded-[0.3rem]`}
                >
                  수정
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={handleAddReply}
              disabled={comment ? false : true}
              className={`w-[3.75rem] py-[0.4rem] font-medium ${
                comment ? "bg-[#3a8af9] hover:bg-[#1c6cdb]" : "bg-[#90c2ff]"
              } text-xs text-white rounded-[0.3rem]`}
            >
              등록
            </button>
          )}
        </div>
      </div>

      {/* 댓글 관리 Bottom Drawer */}
      {isOpenCommentManagingBottomDrawer && (
        <div
          className={`z-10 fixed top-0 left-0 flex justify-center place-items-end w-screen h-full bg-[#111827] bg-opacity-50 ${
            isBottomDrawerClosing ? "fade-out" : "fade-in"
          } `}
        >
          <div
            ref={drawerRef}
            className={`w-[40rem] h-fit bg-white rounded-t-2xl px-3 py-5 pb-7 ${
              isBottomDrawerClosing
                ? "bottom-drawer-slide-down"
                : "bottom-drawer-slide-up"
            }`}
          >
            <div className="relative flex justify-center items-center">
              <span className="text-[0.925rem] font-semibold">댓글</span>

              <button
                onClick={() => {
                  closeDrawer();
                }}
                className="absolute right-0 p-2"
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-6 h-6"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="mt-2 flex flex-col gap-y-3 px-2">
              <div className="flex flex-col items-start gap-y-1">
                <button
                  onClick={() => {
                    closeDrawer();
                    setIsReplyEditStatus(false);
                    setIsCommentEditStatus(true);
                    setComment(selectedCommentInfo.commentContent);
                  }}
                  className="w-full py-2 flex items-center gap-x-2"
                >
                  <span className="relative flex items-center text-[0.825rem]">
                    수정하기
                  </span>
                </button>

                {matchedComment.replies.length === 0 && (
                  <button
                    onClick={() => {
                      closeDrawer();
                      setOpenConfirmDeleteCommunityPostCommentModal("default");
                    }}
                    className="w-full py-2 flex items-center gap-x-2"
                  >
                    <span className="relative flex items-center text-[0.825rem]">
                      삭제하기
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 답글 관리 Bottom Drawer */}
      {isOpenReplyManagingBottomDrawer && (
        <div
          className={`z-10 fixed top-0 left-0 flex justify-center place-items-end w-screen h-full bg-[#111827] bg-opacity-50 ${
            isBottomDrawerClosing ? "fade-out" : "fade-in"
          } `}
        >
          <div
            ref={drawerRef}
            className={`w-[40rem] h-fit bg-white rounded-t-2xl px-3 py-5 pb-7 ${
              isBottomDrawerClosing
                ? "bottom-drawer-slide-down"
                : "bottom-drawer-slide-up"
            }`}
          >
            <div className="relative flex justify-center items-center">
              <span className="text-[0.925rem] font-semibold">답글</span>

              <button
                onClick={() => {
                  closeDrawer();
                }}
                className="absolute right-0 p-2"
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-6 h-6"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="mt-2 flex flex-col gap-y-3 px-2">
              <div className="flex flex-col items-start gap-y-1">
                <button
                  onClick={() => {
                    closeDrawer();
                    setIsCommentEditStatus(false);
                    setIsReplyEditStatus(true);
                    setComment(selectedReplyInfo.replyContent);
                  }}
                  className="w-full py-2 flex items-center gap-x-2"
                >
                  <span className="relative flex items-center text-[0.825rem]">
                    수정하기
                  </span>
                </button>

                <button
                  onClick={() => {
                    closeDrawer();
                    setOpenConfirmDeleteCommunityPostReplyModal("default");
                  }}
                  className="w-full py-2 flex items-center gap-x-2"
                >
                  <span className="relative flex items-center text-[0.825rem]">
                    삭제하기
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDeleteCommunityPostCommentModal
        openConfirmDeleteCommunityPostCommentModal={
          openConfirmDeleteCommunityPostCommentModal
        }
        setOpenConfirmDeleteCommunityPostCommentModal={
          setOpenConfirmDeleteCommunityPostCommentModal
        }
        postId={postId}
        selectedCommentId={selectedCommentInfo.commentId}
      />
      <ConfirmDeleteCommunityPostReplyModal
        openConfirmDeleteCommunityPostReplyModal={
          openConfirmDeleteCommunityPostReplyModal
        }
        setOpenConfirmDeleteCommunityPostReplyModal={
          setOpenConfirmDeleteCommunityPostReplyModal
        }
        postId={postId}
        selectedReplyId={selectedReplyInfo.replyId}
      />
    </div>
  );
}
