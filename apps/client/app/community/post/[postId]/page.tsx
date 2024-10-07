'use client';

import { PostInfo } from '@/types/post';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Toast } from 'flowbite-react';
import ConfirmDeleteCommunityPostModal from './components/ConfirmDeleteCommunityPostModal';
import Loading from '@/app/loading';
import { partySelectedPlanInfos } from '@/data/partySelectedPlanInfos';
import Link from 'next/link';
import CommentList from './components/comment/CommentList';
import { formatDate, formatDateAndTimeAgo } from '@/utils/formatDate';
import axiosInstance from '@/utils/axiosInstance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import NotFound from '@/app/[...Not_found]/page';
import { UserInfoStore } from '@/store/UserInfo';
import { UserInfo } from '@/types/user';
import { AxiosError } from 'axios';
import ConfirmDeleteCommunityPostCommentModal from './components/ConfirmDeleteCommunityPostCommentModal';
import ConfirmDeleteCommunityPostReplyModal from './components/ConfirmDeleteCommunityPostReplyModal';
import { ToastInfoStore } from '@/store/ToastInfo';

// 커뮤니티 게시글 정보 조회 API
const fetchCommunityPostInfo = ({ queryKey }: any) => {
  const postId = queryKey[1];
  return axiosInstance.get(`/public/community/posts/${postId}`);
};

// 커뮤니티 게시글 좋아요 API
const doLikeCommunityPost = (postId: string) => {
  return axiosInstance.post(`/private/community/posts/${postId}/like`);
};

// 커뮤니티 게시글 좋아요 취소하기 API
const unDoLikeCommunityPost = (postId: string) => {
  return axiosInstance.delete(`/private/community/posts/${postId}/like`);
};

// 커뮤니티 게시글 댓글 작성하기 API
const addCommunityPostComment = ({
  postId,
  comment,
}: {
  postId: string;
  comment: string;
}) => {
  const requestBody = {
    content: comment,
  };
  return axiosInstance.post(`/private/posts/${postId}/comment`, requestBody);
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
  };
}

const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false, loading: () => <Loading /> }
);

export default function CommunityPost(props: DefaultProps) {
  const postId = props.params.postId;

  const queryClient = useQueryClient();

  const updateToastMessage = ToastInfoStore(
    (state: any) => state.updateToastMessage
  );
  const updateOpenToastStatus = ToastInfoStore(
    (state: any) => state.updateOpenToastStatus
  );

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['communityPostInfo', postId],
    queryFn: fetchCommunityPostInfo,
    retry: 0,
  });

  const doLikeCommunityPostMutation = useMutation({
    mutationFn: doLikeCommunityPost,
    onMutate: () => {},
    onError: (error: AxiosError) => {
      const resData: any = error.response;

      switch (resData?.status) {
        case 409:
          switch (resData?.data.error.status) {
            case 'CONFLICT':
              alert('이미 좋아요된 게시글입니다.');
              break;
            default:
              alert('정의되지 않은 http code입니다.');
          }
          break;
        default:
          alert('정의되지 않은 http status code입니다');
      }
    },
    onSuccess: (data) => {
      const httpStatusCode = data.status;

      switch (httpStatusCode) {
        case 200:
          // 쿼리 데이터 업데이트
          queryClient.invalidateQueries({
            queryKey: ['communityPostInfo'],
          });
          break;
        default:
          alert('정의되지 않은 http status code입니다');
      }
    },
    onSettled: () => {},
  });

  const unDoLikeCommunityPostMutation = useMutation({
    mutationFn: unDoLikeCommunityPost,
    onMutate: () => {},
    onError: (error: AxiosError) => {
      const resData: any = error.response;

      switch (resData?.status) {
        case 404:
          switch (resData?.data.error.status) {
            case 'NOT FOUND':
              break;
            default:
              alert('정의되지 않은 http code입니다.');
          }
          break;
        default:
          alert('정의되지 않은 http status code입니다');
      }
    },
    onSuccess: (data) => {
      const httpStatusCode = data.status;

      switch (httpStatusCode) {
        case 200:
          // 쿼리 데이터 업데이트
          // 쿼리 데이터 업데이트
          queryClient.invalidateQueries({
            queryKey: ['communityPostInfo'],
          });
          break;
        default:
          alert('정의되지 않은 http status code입니다');
      }
    },
    onSettled: () => {},
  });

  const addCommunityPostCommentMutation = useMutation({
    mutationFn: addCommunityPostComment,
    onMutate: () => {},
    onError: (error: AxiosError) => {
      const resData: any = error.response;

      switch (resData?.status) {
        case 409:
          switch (resData?.data.error.status) {
            default:
              alert('정의되지 않은 http code입니다.');
          }
          break;
        default:
          alert('정의되지 않은 http status code입니다');
      }
    },
    onSuccess: (data) => {
      const httpStatusCode = data.status;

      switch (httpStatusCode) {
        case 200:
          setComment('');
          // 쿼리 데이터 업데이트
          queryClient.invalidateQueries({
            queryKey: ['communityPostInfo', postId],
          });
          setIsNewCommentAdded(true);
          break;
        default:
          alert('정의되지 않은 http status code입니다');
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
              alert('정의되지 않은 http code입니다.');
          }
          break;
        default:
          alert('정의되지 않은 http status code입니다');
      }
    },
    onSuccess: (data) => {
      const httpStatusCode = data.status;

      switch (httpStatusCode) {
        case 200:
          setComment('');
          // 쿼리 데이터 업데이트
          queryClient.invalidateQueries({
            queryKey: ['communityPostInfo', postId],
          });
          setComment('');
          setIsCommentEditStatus(false);
          updateToastMessage('댓글이 수정됐어요');
          updateOpenToastStatus(true);
          break;
        default:
          alert('정의되지 않은 http status code입니다');
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
              alert('정의되지 않은 http code입니다.');
          }
          break;
        default:
          alert('정의되지 않은 http status code입니다');
      }
    },
    onSuccess: (data) => {
      const httpStatusCode = data.status;

      switch (httpStatusCode) {
        case 200:
          setComment('');
          // 쿼리 데이터 업데이트
          queryClient.invalidateQueries({
            queryKey: ['communityPostInfo', postId],
          });
          setComment('');
          setIsReplyEditStatus(false);
          updateToastMessage('답글이 수정됐어요');
          updateOpenToastStatus(true);
          break;
        default:
          alert('정의되지 않은 http status code입니다');
      }
    },
    onSettled: () => {},
  });

  const userInfo: UserInfo = UserInfoStore((state: any) => state.userInfo);

  const resData = data?.data.response;
  const postInfo: PostInfo = resData;

  const [isOpenPostManagingBottomDrawer, setIsOpenPostManagingBottomDrawer] =
    useState<boolean>(false);
  const [
    isOpenCommentManagingBottomDrawer,
    setIsOpenCommentManagingBottomDrawer,
  ] = useState<boolean>(false);
  const [isOpenReplyManagingBottomDrawer, setIsOpenReplyManagingBottomDrawer] =
    useState<boolean>(false);
  const [isBottomDrawerClosing, setIsBottomDrawerClosing] =
    useState<boolean>(false);

  const [
    openConfirmDeleteCommunityPostModal,
    setOpenConfirmDeleteCommunityPostModal,
  ] = useState<string | undefined>();
  const [
    openConfirmDeleteCommunityPostCommentModal,
    setOpenConfirmDeleteCommunityPostCommentModal,
  ] = useState<string | undefined>();
  const [
    openConfirmDeleteCommunityPostReplyModal,
    setOpenConfirmDeleteCommunityPostReplyModal,
  ] = useState<string | undefined>();

  const [comment, setComment] = useState<string>('');
  const [isCommentEditStatus, setIsCommentEditStatus] =
    useState<boolean>(false);
  const [isReplyEditStatus, setIsReplyEditStatus] = useState<boolean>(false);
  const [isNewCommentAdded, setIsNewCommentAdded] = useState<boolean>(false);
  const [selectedCommentInfo, setSelectedCommentInfo] = useState({
    commentId: 0,
    commentContent: '',
  });
  const [selectedReplyInfo, setSelectedReplyInfo] = useState({
    replyId: 0,
    replyContent: '',
  });

  const router = useRouter();

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
      if (event.key === 'Escape') {
        closeDrawer();
      }
    };

    if (isOpenPostManagingBottomDrawer) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscKeyPress);
    } else {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKeyPress);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  }, [isOpenPostManagingBottomDrawer]);

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
      if (event.key === 'Escape') {
        closeDrawer();
      }
    };

    if (isOpenCommentManagingBottomDrawer) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscKeyPress);
    } else {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKeyPress);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKeyPress);
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
      if (event.key === 'Escape') {
        closeDrawer();
      }
    };

    if (isOpenReplyManagingBottomDrawer) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscKeyPress);
    } else {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKeyPress);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  }, [isOpenReplyManagingBottomDrawer]);

  const closeDrawer = () => {
    setIsBottomDrawerClosing(true);
    setTimeout(() => {
      setIsOpenPostManagingBottomDrawer(false);
      setIsOpenCommentManagingBottomDrawer(false);
      setIsOpenReplyManagingBottomDrawer(false);
      setIsBottomDrawerClosing(false);
    }, 375);
  };

  const adjustHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = '2rem'; // 초기 높이로 리셋
      textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 맞게 높이 조절
    }

    setComment(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      e.key === 'Enter' &&
      !isCommentEditStatus &&
      !isReplyEditStatus
    ) {
      handleAddComment();
      return;
    }

    if (
      (e.ctrlKey || e.metaKey) &&
      e.key === 'Enter' &&
      isCommentEditStatus &&
      !isReplyEditStatus
    ) {
      handleModifyComment();
      return;
    }

    if (
      (e.ctrlKey || e.metaKey) &&
      e.key === 'Enter' &&
      isReplyEditStatus &&
      !isCommentEditStatus
    ) {
      handleModifyReply();
      return;
    }
  };

  const handleAddComment = () => {
    if (comment) {
      addCommunityPostCommentMutation.mutate({ postId, comment });
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        updateToastMessage(`링크가 복사됐어요`);
        updateOpenToastStatus(true);
      })
      .catch(() => {
        alert('복사에 실패했습니다.');
      });
  };

  // 댓글 추가 후 스크롤을 강제로 최하단으로 이동
  useEffect(() => {
    if (isNewCommentAdded) {
      window.scrollTo({
        top: document.body.scrollHeight, // 최하단으로 이동
        behavior: 'smooth',
      });
      setIsNewCommentAdded(false); // 스크롤 후 플래그 초기화
    }
  }, [isNewCommentAdded]);

  if (isError) return <NotFound />;
  if (isPending) return <Loading />;

  return (
    <div className='flex flex-col items-center gap-y-2 w-[37.5rem] mx-auto pt-6'>
      <div className='w-full flex flex-col gap-y-4'>
        <div className='w-full flex justify-between'>
          <button
            onClick={() => {
              router.back();
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24'
              viewBox='0 -960 960 960'
              width='24'
            >
              <path d='m112.769-480 308.616 308.615q8.846 8.846 8.731 21.154-.116 12.308-8.962 21.154T400-120.231q-12.308 0-21.154-8.846L73.154-434.538Q63.46-444.231 59-456.154 54.538-468.077 54.538-480T59-503.846q4.461-11.923 14.154-21.616l305.692-305.692q8.846-8.846 21.269-8.731 12.424.116 21.27 8.962t8.846 21.154q0 12.308-8.846 21.154L112.769-480Z' />
            </svg>
          </button>

          <div className='flex items-center gap-x-2'>
            <button
              onClick={() => {
                copyToClipboard(window.location.href);
              }}
              className='w-fit flex items-center gap-x-[0.375rem] hover:bg-[#dbe0e5] rounded-lg px-3 py-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='20'
                height='20'
              >
                <g fill='#9ba2ac' fillRule='evenodd'>
                  <path d='M21.316 2.684a6.098 6.098 0 00-8.614 0l-2.053 2.052a1.101 1.101 0 001.556 1.556l2.053-2.052a3.895 3.895 0 015.502 0 3.865 3.865 0 011.14 2.751 3.864 3.864 0 01-1.14 2.751l-3.601 3.601c-1.469 1.47-4.032 1.47-5.502 0a3.894 3.894 0 01-.625-.814 1.1 1.1 0 00-1.908 1.096c.267.463.595.892.977 1.274a6.054 6.054 0 004.307 1.784 6.052 6.052 0 004.307-1.784l3.601-3.6A6.054 6.054 0 0023.1 6.99a6.052 6.052 0 00-1.784-4.307'></path>
                  <path d='M11.795 17.708l-2.053 2.053a3.897 3.897 0 01-5.502 0A3.87 3.87 0 013.1 17.01c0-1.039.405-2.016 1.14-2.75l3.601-3.602a3.895 3.895 0 016.127.814 1.1 1.1 0 101.908-1.096 6.099 6.099 0 00-9.591-1.274l-3.601 3.601A6.054 6.054 0 00.9 17.01c0 1.627.634 3.157 1.784 4.307a6.066 6.066 0 004.307 1.781c1.56 0 3.119-.594 4.307-1.78l2.053-2.053a1.101 1.101 0 00-1.556-1.556'></path>
                </g>
              </svg>
              <span className='text-[#646464] font-medium'>공유</span>
            </button>

            {/* 로그인 한 사용자의 memberId와 게시글 작성자의 memberId 일치 시에 렌더링 */}
            {userInfo.memberId === postInfo.author.memberId && (
              <button
                onClick={() => {
                  setIsOpenPostManagingBottomDrawer(true);
                }}
                className='p-[0.1rem] rounded-md hover:bg-[#f6f6f6]'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='27.5'
                  viewBox='0 -960 960 960'
                  width='27.5'
                  fill='#282828'
                >
                  <path d='M480-189.23q-24.75 0-42.37-17.63Q420-224.48 420-249.23q0-24.75 17.63-42.38 17.62-17.62 42.37-17.62 24.75 0 42.37 17.62Q540-273.98 540-249.23q0 24.75-17.63 42.37-17.62 17.63-42.37 17.63ZM480-420q-24.75 0-42.37-17.63Q420-455.25 420-480q0-24.75 17.63-42.37Q455.25-540 480-540q24.75 0 42.37 17.63Q540-504.75 540-480q0 24.75-17.63 42.37Q504.75-420 480-420Zm0-230.77q-24.75 0-42.37-17.62Q420-686.02 420-710.77q0-24.75 17.63-42.37 17.62-17.63 42.37-17.63 24.75 0 42.37 17.63Q540-735.52 540-710.77q0 24.75-17.63 42.38-17.62 17.62-42.37 17.62Z'></path>
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className='w-full flex flex-col justify-center gap-y-2 pt-7 pb-12 bg-[#f9fafb] text-[#4e5968] rounded-t-2xl'>
          <div className='w-full flex flex-col justify-start gap-y-6'>
            <div className='px-7'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-x-[0.375rem]'>
                  <div className='flex items-center gap-x-[0.375rem]'>
                    {postInfo.author.profileImagePathUrl ? (
                      <div className='relative w-[30px] h-[30px]'>
                        <Image
                          src={postInfo.author.profileImagePathUrl}
                          alt='profileImage'
                          fill
                          quality={100}
                          className='rounded-full'
                        />
                      </div>
                    ) : (
                      <span className='w-[30px] h-[30px] flex justify-center items-center bg-[#eee] text-[#4e5968] font-medium rounded-full'>
                        {postInfo.author.username.charAt(0)}
                      </span>
                    )}
                    <span className='text-[0.825rem] text-[#333d4b] font-medium'>
                      {postInfo.author.username}
                    </span>
                  </div>
                </div>

                <span className='text-xs text-[#4e5968] text-right whitespace-nowrap overflow-hidden text-ellipsis max-w-full'>
                  {formatDate(postInfo.createdAt)}
                </span>
              </div>

              <p className='mt-3 text-base text-[#333d4b] font-semibold'>
                {postInfo.title}
              </p>

              <MarkdownPreview
                className='markdown-preview'
                source={postInfo.content}
              />

              <div className='h-[2.5rem] flex items-center gap-x-2'>
                {postInfo.tags.map((tagInfo, index) => (
                  <Link
                    key={index}
                    href={`/community/search?tag=${tagInfo.tagName}`}
                    className='flex items-center min-h-6 h-auto leading-none text-xs text-start outline-none px-[0.2rem] bg-[#eee] rounded-[0.125rem] border border-[#eee] focus:bg-[#656565] focus:text-white hover:bg-[#656565] hover:text-white hover:border-[#656565]'
                  >
                    #
                    <span className='ml-[0.1rem] text-inherit break-all'>
                      {tagInfo.tagName}
                    </span>
                  </Link>
                ))}
              </div>

              <div className='mt-2 flex justify-between items-center'>
                <div className='mt-1 flex gap-x-2 h-8'>
                  <div className='flex justify-center items-center gap-x-[0.15rem] bg-[#f2f4f6] text-[#4e5968] rounded-full w-[3.25rem]'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='17.5'
                      viewBox='0 -960 960 960'
                      width='17.5'
                      fill='#949aa1'
                    >
                      <path d='M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z' />
                    </svg>
                    <span className='text-[#949aa1] text-xs'>
                      {postInfo.views}
                    </span>
                  </div>

                  <div className='flex items-center gap-x-[0.15rem] bg-[#f2f4f6] text-[#4e5968] rounded-full px-3'>
                    <svg
                      data-v-ad2f40b4=''
                      data-v-de3ba2dc=''
                      width='17.5'
                      height='17.5'
                      fill='#b2b8bf'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 32 32'
                    >
                      <path
                        data-v-ad2f40b4=''
                        data-v-de3ba2dc=''
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M13 5a9 9 0 00-5.79 15.89c.342 2.296-.657 4.867-1.055 5.773a.207.207 0 00.22.286c3.867-.575 6.027-2.341 7.22-3.949H19a9 9 0 100-18h-6z'
                        fill='#b2b8bf'
                      ></path>
                    </svg>
                    <span className='text-[#8b95a1] text-xs'>
                      {postInfo.comments.length}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (postInfo.isLiked) {
                        unDoLikeCommunityPostMutation.mutate(postId);
                        return;
                      }

                      doLikeCommunityPostMutation.mutate(postId);
                    }}
                    className={`relative ml-[-0.25rem] flex items-center bg-[#f2f4f6] text-[#4e5968] rounded-full px-2 py-[0.3rem] ${
                      postInfo.isLiked && 'outline outline-1 outline-[#3a8af9]'
                    }`}
                  >
                    {postInfo.likeCount === 0 ? (
                      <svg
                        width='32'
                        height='32'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='absolute left-1 scale-[0.6]'
                      >
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M26.14 10.126c.96 1.667 1.52 3.572 1.52 5.795l-.01 11.352H15.973c-2.162 0-4.163-.476-5.925-1.429-1.76-.953-3.122-2.223-4.163-3.97-.96-1.666-1.52-3.65-1.52-5.794 0-2.144.48-4.049 1.44-5.795 1.041-1.747 2.402-3.097 4.163-4.05 1.762-1.031 3.763-1.507 6.005-1.507 2.241 0 4.243.476 6.004 1.428 1.761.953 3.122 2.303 4.163 3.97zM11.46 14.42a1.028 1.028 0 100-2.056 1.028 1.028 0 000 2.056zm3.085 6.273a6.172 6.172 0 01-5.818-4.113h1.33a4.936 4.936 0 008.976 0h1.33a6.172 6.172 0 01-5.818 4.113zm4.113-7.3a1.028 1.028 0 11-2.056 0 1.028 1.028 0 012.056 0z'
                          fill='#9ba2ac'
                        />
                      </svg>
                    ) : (
                      <svg
                        width='32'
                        height='32'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='absolute left-1 scale-[0.6]'
                      >
                        <path
                          d='M27.661 15.92c0-.079 0-.079 0 0 0-2.222-.56-4.127-1.521-5.794-1.04-1.667-2.402-3.017-4.163-3.97-1.761-.952-3.763-1.428-6.004-1.428-2.242 0-4.244.476-6.005 1.508-1.761.952-3.122 2.302-4.163 4.048-.96 1.747-1.44 3.652-1.44 5.796 0 2.143.56 4.128 1.52 5.795 1.041 1.746 2.402 3.016 4.163 3.97 1.762.952 3.763 1.428 5.925 1.428H27.65l.01-11.352z'
                          fill='#FABA44'
                        />
                        <path
                          d='M11.273 17.096c0-.2.162-.364.363-.364h4.727c.201 0 .364.163.364.364v.91a2.727 2.727 0 11-5.454 0v-.91z'
                          fill='#FC6916'
                        />
                        <path
                          d='M12.105 19.98s.758.815 2.054.736c1.296-.078 1.86-.877 1.86-.877a1.126 1.126 0 00-.72-.446c-.878-.146-1.237-.153-2.164-.02-.409.06-.777.28-1.03.607z'
                          fill='#C53030'
                        />
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M12.305 13.132c.177-.327.286-.7.31-1.102.077-1.373-.898-2.546-2.178-2.618-.691-.04-1.33.25-1.783.74a2.236 2.236 0 00-1.576-.795c-1.28-.072-2.381.983-2.459 2.356-.038.677.18 1.306.563 1.777.11.165.208.297.208.297s.336.358.559.581c.88.882 2.42 2.083 2.42 2.083s1.771-1.06 2.772-1.915l.13-.111c.142-.12.252-.212.404-.367.19-.193.293-.306.453-.524a.893.893 0 00.177-.402z'
                          fill='url(#paint0_linear_10118_43030)'
                        />
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M22.851 13.132c.176-.327.286-.7.309-1.102.078-1.373-.897-2.546-2.178-2.618-.69-.04-1.329.25-1.782.74a2.236 2.236 0 00-1.576-.795c-1.28-.072-2.381.983-2.459 2.356-.038.677.18 1.306.563 1.777.11.165.207.297.207.297s.337.358.56.581c.88.882 2.419 2.083 2.419 2.083s1.772-1.06 2.773-1.915l.13-.111c.142-.12.252-.212.404-.367.19-.193.293-.306.453-.524a.893.893 0 00.177-.402z'
                          fill='url(#paint1_linear_10118_43030)'
                        />
                        <defs>
                          <linearGradient
                            id='paint0_linear_10118_43030'
                            x1='8.761'
                            y1='9.317'
                            x2='8.357'
                            y2='16.45'
                            gradientUnits='userSpaceOnUse'
                          >
                            <stop stopColor='#F09' />
                            <stop offset='1' stopColor='#F09' />
                          </linearGradient>
                          <linearGradient
                            id='paint1_linear_10118_43030'
                            x1='19.307'
                            y1='9.317'
                            x2='18.903'
                            y2='16.45'
                            gradientUnits='userSpaceOnUse'
                          >
                            <stop stopColor='#F09' />
                            <stop offset='1' stopColor='#F09' />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                    <span
                      className={`ml-[1.375rem] ${
                        postInfo.isLiked ? 'text-gray-600' : 'text-[#8b95a1]'
                      } text-xs`}
                    >
                      {postInfo.likeCount}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-y-1 border-y px-7 py-6'>
              <p className='text-[0.9rem] text-[#333d4b] font-semibold '>
                {postInfo.author.username} 님이 연결한 서비스
              </p>

              <div className='mt-2 flex gap-x-3 text-[#333d4b]'>
                {postInfo.services.map((service, index) => (
                  <Link
                    href={`/join-party/plan/${
                      partySelectedPlanInfos[service.serviceId - 1]
                        .planDetailInfos[
                        partySelectedPlanInfos[service.serviceId - 1]
                          .planDetailInfos.length - 1
                      ].id
                    }`}
                    key={index}
                    className='w-[5.75rem] text-center flex flex-col items-center bg-[#f2f4f6] px-4 pb-3 rounded-lg hover:bg-[#dbe0e5]'
                  >
                    <Image
                      src={
                        partySelectedPlanInfos[service.serviceId - 1].iconImg
                      }
                      alt={
                        partySelectedPlanInfos[service.serviceId - 1].iconImgAlt
                      }
                      width={60}
                      height={0}
                      quality={100}
                      className='mt-3'
                    />

                    <p className='mt-2 text-inherit text-[0.825rem] font-medium'>
                      {partySelectedPlanInfos[service.serviceId - 1].name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-y-1 px-7 pt-2 pb-[7.25rem]'>
              <p className='flex items-center gap-x-[0.2rem] text-[0.9rem] text-[#333d4b] font-semibold '>
                댓글
                <span className='text-[#3a8af9]'>
                  {postInfo.comments.length}
                </span>
              </p>

              <CommentList
                postId={postId}
                comments={postInfo.comments}
                setSelectedCommentInfo={setSelectedCommentInfo}
                setSelectedReplyInfo={setSelectedReplyInfo}
                setIsOpenCommentManagingBottomDrawer={
                  setIsOpenCommentManagingBottomDrawer
                }
                setIsOpenReplyManagingBottomDrawer={
                  setIsOpenReplyManagingBottomDrawer
                }
              />
            </div>
          </div>

          <div className='w-[37.5rem] fixed bottom-0 bg-[#edeff1] px-4 py-[0.675rem]'>
            <div className='flex justify-between  items-center gap-x-2'>
              <textarea
                ref={textareaRef}
                placeholder='댓글을 작성해 주세요.'
                value={comment}
                className='w-full h-[2rem] max-h-[3.75rem] p-2 border-none focus:ring-0 font-light text-xs placeholder:text-[#88909a] bg-transparent resize-none comment-scrollbar'
                onChange={(e) => adjustHeight(e)}
                onKeyDown={handleKeyDown}
              />
              {isCommentEditStatus || isReplyEditStatus ? (
                <div className='flex items-center'>
                  <button
                    onClick={() => {
                      setComment('');
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
                        comment
                          ? 'bg-[#3a8af9] hover:bg-[#1c6cdb]'
                          : 'bg-[#90c2ff]'
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
                        comment
                          ? 'bg-[#3a8af9] hover:bg-[#1c6cdb]'
                          : 'bg-[#90c2ff]'
                      } text-xs text-white rounded-[0.3rem]`}
                    >
                      수정
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleAddComment}
                  disabled={comment ? false : true}
                  className={`w-[3.75rem] py-[0.4rem] font-medium ${
                    comment ? 'bg-[#3a8af9] hover:bg-[#1c6cdb]' : 'bg-[#90c2ff]'
                  } text-xs text-white rounded-[0.3rem]`}
                >
                  등록
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 게시글 관리 Bottom Drawer */}
      {(isOpenPostManagingBottomDrawer || isBottomDrawerClosing) && (
        <div
          className={`z-10 fixed top-0 left-0 flex justify-center place-items-end w-screen h-full bg-[#111827] bg-opacity-50 ${
            isBottomDrawerClosing ? 'fade-out' : 'fade-in'
          } `}
        >
          <div
            ref={drawerRef}
            className={`w-[40rem] h-fit bg-white rounded-t-2xl px-3 py-5 pb-7 ${
              isBottomDrawerClosing
                ? 'bottom-drawer-slide-down'
                : 'bottom-drawer-slide-up'
            }`}
          >
            <div className='relative flex justify-center items-center'>
              <span className='text-[0.925rem] font-semibold'>게시글</span>

              <button
                onClick={() => {
                  closeDrawer();
                }}
                className='absolute right-0 p-2'
              >
                <svg
                  stroke='currentColor'
                  fill='none'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                  className='w-6 h-6'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  ></path>
                </svg>
              </button>
            </div>

            <div className='mt-2 flex flex-col gap-y-3 px-2'>
              <div className='flex flex-col items-start gap-y-1'>
                <button
                  onClick={() => {
                    closeDrawer();
                    router.push(`/community/post/${postId}/edit`);
                  }}
                  className='w-full py-2 flex items-center gap-x-2'
                >
                  <span className='relative flex items-center text-[0.825rem]'>
                    수정하기
                  </span>
                </button>

                <button
                  onClick={() => {
                    closeDrawer();
                    setOpenConfirmDeleteCommunityPostModal('default');
                  }}
                  className='w-full py-2 flex items-center gap-x-2'
                >
                  <span className='relative flex items-center text-[0.825rem]'>
                    삭제하기
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 댓글 관리 Bottom Drawer */}
      {isOpenCommentManagingBottomDrawer && (
        <div
          className={`z-10 fixed top-0 left-0 flex justify-center place-items-end w-screen h-full bg-[#111827] bg-opacity-50 ${
            isBottomDrawerClosing ? 'fade-out' : 'fade-in'
          } `}
        >
          <div
            ref={drawerRef}
            className={`w-[40rem] h-fit bg-white rounded-t-2xl px-3 py-5 pb-7 ${
              isBottomDrawerClosing
                ? 'bottom-drawer-slide-down'
                : 'bottom-drawer-slide-up'
            }`}
          >
            <div className='relative flex justify-center items-center'>
              <span className='text-[0.925rem] font-semibold'>댓글</span>

              <button
                onClick={() => {
                  closeDrawer();
                }}
                className='absolute right-0 p-2'
              >
                <svg
                  stroke='currentColor'
                  fill='none'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                  className='w-6 h-6'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  ></path>
                </svg>
              </button>
            </div>

            <div className='mt-2 flex flex-col gap-y-3 px-2'>
              <div className='flex flex-col items-start gap-y-1'>
                <button
                  onClick={() => {
                    closeDrawer();
                    setIsReplyEditStatus(false);
                    setIsCommentEditStatus(true);
                    setComment(selectedCommentInfo.commentContent);
                  }}
                  className='w-full py-2 flex items-center gap-x-2'
                >
                  <span className='relative flex items-center text-[0.825rem]'>
                    수정하기
                  </span>
                </button>

                <button
                  onClick={() => {
                    closeDrawer();
                    setOpenConfirmDeleteCommunityPostCommentModal('default');
                  }}
                  className='w-full py-2 flex items-center gap-x-2'
                >
                  <span className='relative flex items-center text-[0.825rem]'>
                    삭제하기
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 답글 관리 Bottom Drawer */}
      {isOpenReplyManagingBottomDrawer && (
        <div
          className={`z-10 fixed top-0 left-0 flex justify-center place-items-end w-screen h-full bg-[#111827] bg-opacity-50 ${
            isBottomDrawerClosing ? 'fade-out' : 'fade-in'
          } `}
        >
          <div
            ref={drawerRef}
            className={`w-[40rem] h-fit bg-white rounded-t-2xl px-3 py-5 pb-7 ${
              isBottomDrawerClosing
                ? 'bottom-drawer-slide-down'
                : 'bottom-drawer-slide-up'
            }`}
          >
            <div className='relative flex justify-center items-center'>
              <span className='text-[0.925rem] font-semibold'>답글</span>

              <button
                onClick={() => {
                  closeDrawer();
                }}
                className='absolute right-0 p-2'
              >
                <svg
                  stroke='currentColor'
                  fill='none'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                  className='w-6 h-6'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  ></path>
                </svg>
              </button>
            </div>

            <div className='mt-2 flex flex-col gap-y-3 px-2'>
              <div className='flex flex-col items-start gap-y-1'>
                <button
                  onClick={() => {
                    closeDrawer();
                    setIsCommentEditStatus(false);
                    setIsReplyEditStatus(true);
                    setComment(selectedReplyInfo.replyContent);
                  }}
                  className='w-full py-2 flex items-center gap-x-2'
                >
                  <span className='relative flex items-center text-[0.825rem]'>
                    수정하기
                  </span>
                </button>

                <button
                  onClick={() => {
                    closeDrawer();
                    setOpenConfirmDeleteCommunityPostReplyModal('default');
                  }}
                  className='w-full py-2 flex items-center gap-x-2'
                >
                  <span className='relative flex items-center text-[0.825rem]'>
                    삭제하기
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDeleteCommunityPostModal
        openConfirmDeleteCommunityPostModal={
          openConfirmDeleteCommunityPostModal
        }
        setOpenConfirmDeleteCommunityPostModal={
          setOpenConfirmDeleteCommunityPostModal
        }
        postId={postId}
      />

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
