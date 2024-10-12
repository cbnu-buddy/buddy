'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import FeedPostList from './components/feedPost/FeedPostList';
import Link from 'next/link';
import { ToastInfoStore } from '@/store/ToastInfo';
import axiosInstance from '@/utils/axiosInstance';
import { MySubscribedTagInfo } from '@/types/tag';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UserInfoStore } from '@/store/UserInfo';

// 회원의 구독한 태그 목록 정보 조회 API
const fetchMySubscribedTagInfos = () => {
  return axiosInstance.get(`/private/subscribe/my/subscribed-tags`);
};

// 태그 구독하기 API
const subscribeTag = (tagName: string) => {
  return axiosInstance.post(`/private/subscribe?tag=${tagName}`);
};

// 태그 구독 취소하기 API
const unsubscribeTag = (tagId: number) => {
  return axiosInstance.delete(`/private/subscribe/tags/${tagId}`);
};

// 태그 새 글 알림 활성화 API
const enableReceiveNotification = (tagId: number) => {
  return axiosInstance.post(`/private/subscribe/tags/${tagId}/notification`);
};

// 태그 새 글 알림 비활성화 API
const disableReceiveNotification = (tagId: number) => {
  return axiosInstance.delete(`/private/subscribe/tags/${tagId}/notification`);
};

export default function Feed() {
  const queryClient = useQueryClient();

  const userInfo = UserInfoStore((state: any) => state.userInfo);

  const updateToastMessage = ToastInfoStore(
    (state: any) => state.updateToastMessage
  );
  const updateOpenToastStatus = ToastInfoStore(
    (state: any) => state.updateOpenToastStatus
  );

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['subscribedTagInfo'],
    queryFn: fetchMySubscribedTagInfos,
    enabled: userInfo.isAuth,
    retry: 0,
  });

  const subscribeTagMutation = useMutation({
    mutationFn: subscribeTag,
    onMutate: () => {},
    onError: (error: AxiosError) => {
      const resData: any = error.response;

      switch (resData?.status) {
        case 409:
          switch (resData?.data.error.status) {
            case 'CONFLICT':
              alert('이미 구독 중인 태그예요');
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
            queryKey: ['subscribedTagInfo'],
          });
          updateToastMessage(`"${query}" 구독이 완료되었습니다`);
          updateOpenToastStatus(true);
          break;
        default:
          alert('정의되지 않은 http status code입니다');
      }
    },
    onSettled: () => {},
  });

  const unsubscribeTagMutation = useMutation({
    mutationFn: unsubscribeTag,
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
          setSubscribedTagInfo((prevData) => ({
            ...prevData,
            isSubscribed: false,
          }));
          updateToastMessage(`"${query}" 구독이 취소되었습니다`);
          updateOpenToastStatus(true);
          break;
        default:
          alert('정의되지 않은 http status code입니다');
      }
    },
    onSettled: () => {},
  });

  const enableReceiveNotificationMutation = useMutation({
    mutationFn: enableReceiveNotification,
    onMutate: () => {},
    onError: (error: AxiosError) => {
      const resData: any = error.response;

      switch (resData?.status) {
        case 409:
          switch (resData?.data.error.status) {
            case 'CONFLICT':
              alert('이미 알림이 활성화되어 있어요');
              handleButtonInBottomDrawaberClick();
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
          queryClient.invalidateQueries({
            queryKey: ['subscribedTagInfo'],
          });
          handleButtonInBottomDrawaberClick();
          break;
        default:
          alert('정의되지 않은 http status code입니다');
      }
    },
    onSettled: () => {},
  });

  const disableReceiveNotificationMutation = useMutation({
    mutationFn: disableReceiveNotification,
    onMutate: () => {},
    onError: (error: AxiosError) => {
      const resData: any = error.response;

      switch (resData?.status) {
        case 409:
          switch (resData?.data.error.status) {
            case 'CONFLICT':
              alert('이미 알림이 비활성화되어 있어요');
              handleButtonInBottomDrawaberClick();
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
          queryClient.invalidateQueries({
            queryKey: ['subscribedTagInfo'],
          });
          handleButtonInBottomDrawaberClick();
          break;
        default:
          alert('정의되지 않은 http status code입니다');
      }
    },
    onSettled: () => {},
  });

  const [subscribedTagInfo, setSubscribedTagInfo] =
    useState<MySubscribedTagInfo>({
      tagId: 0,
      tagName: '',
      isReceiveNotification: false,
      isSubscribed: false,
    });

  const router = useRouter();
  const params = useSearchParams();

  const drawerRef = useRef<HTMLDivElement>(null);

  const query = params?.get('tag') || '';

  useEffect(() => {
    if (data && query) {
      const resData = data?.data.response;
      const matchingTagInfo = resData.find(
        (item: MySubscribedTagInfo) => item.tagName === query
      );

      if (matchingTagInfo) {
        setSubscribedTagInfo({
          ...matchingTagInfo,
          isSubscribed: true,
        });
      }
    }
  }, [data, query]);

  const [isOpenBottomDrawer, setIsOpenBottomDrawer] = useState<boolean>(false);
  const [isBottomDrawerClosing, setIsBottomDrawerClosing] =
    useState<boolean>(false);

  const [searchedPostNum, setSearchedPostNum] = useState<number>(0);

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

    if (isOpenBottomDrawer) {
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
  }, [isOpenBottomDrawer]);

  const closeDrawer = () => {
    setIsBottomDrawerClosing(true);
    setTimeout(() => {
      setIsOpenBottomDrawer(false);
      setIsBottomDrawerClosing(false);
    }, 375);
  };

  const handleButtonInBottomDrawaberClick = () => {
    setTimeout(() => {
      closeDrawer();
    }, 250);
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

  return (
    <div className='flex flex-col items-center gap-y-2 w-[37.5rem] mx-auto pt-6 pb-24'>
      <div className='w-full flex items-center'>
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

          <button
            onClick={() => {
              copyToClipboard(window.location.href);
            }}
            className='flex items-center gap-x-[0.375rem] hover:bg-[#dbe0e5] rounded-lg px-3 py-2'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='20'
              height='20'
            >
              <g fill='#646464' fillRule='evenodd'>
                <path d='M21.316 2.684a6.098 6.098 0 00-8.614 0l-2.053 2.052a1.101 1.101 0 001.556 1.556l2.053-2.052a3.895 3.895 0 015.502 0 3.865 3.865 0 011.14 2.751 3.864 3.864 0 01-1.14 2.751l-3.601 3.601c-1.469 1.47-4.032 1.47-5.502 0a3.894 3.894 0 01-.625-.814 1.1 1.1 0 00-1.908 1.096c.267.463.595.892.977 1.274a6.054 6.054 0 004.307 1.784 6.052 6.052 0 004.307-1.784l3.601-3.6A6.054 6.054 0 0023.1 6.99a6.052 6.052 0 00-1.784-4.307'></path>
                <path d='M11.795 17.708l-2.053 2.053a3.897 3.897 0 01-5.502 0A3.87 3.87 0 013.1 17.01c0-1.039.405-2.016 1.14-2.75l3.601-3.602a3.895 3.895 0 016.127.814 1.1 1.1 0 101.908-1.096 6.099 6.099 0 00-9.591-1.274l-3.601 3.601A6.054 6.054 0 00.9 17.01c0 1.627.634 3.157 1.784 4.307a6.066 6.066 0 004.307 1.781c1.56 0 3.119-.594 4.307-1.78l2.053-2.053a1.101 1.101 0 00-1.556-1.556'></path>
              </g>
            </svg>
            <span className='text-[#646464] font-medium'>공유</span>
          </button>
        </div>
      </div>

      <div className='w-full flex flex-col gap-y-4 justify-center items-center'>
        {query && (
          <>
            <h1 className='flex items-center gap-x-1 mx-auto font-semibold text-base text-[#333d4b]'>
              <div
                className='flex justify-center items-center p-1 rounded-full'
                style={{ background: 'rgba(2, 32, 71, 0.05' }}
              >
                <svg
                  width='24'
                  height='24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  data-v-9b82dcfc=''
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M10.216 5.015a1 1 0 00-1.159.812L8.69 7.909H7a1 1 0 100 2h1.337l-.705 4H6a1 1 0 100 2h1.28l-.307 1.735a1 1 0 001.97.348l.367-2.083h3.969l-.306 1.735a1 1 0 101.97.348l.367-2.083H17a1 1 0 100-2h-1.338l.705-4h1.634a1 1 0 100-2h-1.28l.305-1.735a1 1 0 10-1.97-.347l-.367 2.082h-3.968l.306-1.735a1 1 0 00-.811-1.159zm3.415 8.894l.706-4h-3.969l-.705 4h3.968z'
                    fill='#3a8af9'
                    data-v-9b82dcfc=''
                  ></path>
                </svg>
              </div>
              <span className='text-xl font-semibold'>{query}</span>
            </h1>

            <div>
              {subscribedTagInfo.isSubscribed ? (
                <button
                  onClick={() => {
                    setIsOpenBottomDrawer(true);
                  }}
                  className='relative w-24 flex justify-center items-center gap-x-[0.175rem] px-7 py-2 rounded-full border border-[#3a8af9]'
                >
                  {subscribedTagInfo.isReceiveNotification ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='17.5'
                      viewBox='0 -960 960 960'
                      width='17.5'
                      fill='#3a8af9'
                      className='absolute left-[0.6rem]'
                    >
                      <path d='M200-200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h40q17 0 28.5 11.5T800-240q0 17-11.5 28.5T760-200H200ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Z' />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='17.5'
                      viewBox='0 -960 960 960'
                      width='17.5'
                      fill='#3a8af9'
                      className='absolute left-[0.6rem]'
                    >
                      <path d='M646-200H200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-33 8.5-65t25.5-61l126 126H288L84-764q-11-11-11-28t11-28q11-11 28-11t28 11l680 680q11 11 11.5 27.5T820-84q-11 11-28 11t-28-11L646-200Zm74-251q0 12-7 22t-18 15q-11 5-23 2.5T652-422L367-707q-7-7-10-15t-3-17q0-11 5.5-21.5T375-776q11-5 22-9t23-7v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 85t50 147v109ZM480-80q-30 0-53.5-16.5T403-141q0-8 6.5-13.5T424-160h112q8 0 14.5 5.5T557-141q0 28-23.5 44.5T480-80Z' />
                    </svg>
                  )}

                  <span className='text-[0.8rem] font-medium text-[#3a8af9]'>
                    구독중
                  </span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='25'
                    viewBox='0 -960 960 960'
                    width='25'
                    fill='#3a8af9'
                    className='absolute right-[0.375rem]'
                  >
                    <path d='M480-372.92q-7.23 0-13.46-2.31t-11.85-7.92L274.92-562.92q-8.3-8.31-8.5-20.89-.19-12.57 8.5-21.27 8.7-8.69 21.08-8.69 12.38 0 21.08 8.69L480-442.15l162.92-162.93q8.31-8.3 20.89-8.5 12.57-.19 21.27 8.5 8.69 8.7 8.69 21.08 0 12.38-8.69 21.08L505.31-383.15q-5.62 5.61-11.85 7.92-6.23 2.31-13.46 2.31Z' />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => {
                    subscribeTagMutation.mutate(query);
                  }}
                  className='relative w-24 flex justify-center items-center gap-x-[0.175rem] px-7 py-2 rounded-full bg-[#3a8af9] border border-[#3a8af9]'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='17.5'
                    viewBox='0 -960 960 960'
                    width='17.5'
                    fill='white'
                    className='absolute left-[0.6rem]'
                  >
                    <path d='M200-200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h40q17 0 28.5 11.5T800-240q0 17-11.5 28.5T760-200H200ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Z' />
                  </svg>
                  <span className='ml-3 text-[0.8rem] font-medium text-white whitespace-nowrap'>
                    구독하기
                  </span>
                </button>
              )}
            </div>
          </>
        )}

        {(isOpenBottomDrawer || isBottomDrawerClosing) && (
          <div
            className={`z-10 fixed top-0 left-0 flex justify-center place-items-end w-screen h-full bg-[#111827] bg-opacity-50 ${
              isBottomDrawerClosing ? 'fade-out' : 'fade-in'
            } `}
          >
            <div
              ref={drawerRef}
              className={`w-[40rem] h-fit bg-white rounded-t-2xl p-4 pb-8 ${
                isBottomDrawerClosing
                  ? 'bottom-drawer-slide-down'
                  : 'bottom-drawer-slide-up'
              }`}
            >
              <div className='flex justify-end'>
                <button
                  onClick={() => {
                    closeDrawer();
                  }}
                  className='p-2'
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

              <div className='flex flex-col gap-y-3'>
                <div className='flex flex-col items-start gap-y-1 pb-4 border-b'>
                  <button
                    onClick={() => {
                      enableReceiveNotificationMutation.mutate(
                        subscribedTagInfo.tagId
                      );

                      handleButtonInBottomDrawaberClick();
                    }}
                    className='w-full py-2 flex items-center gap-x-2'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='20'
                      viewBox='0 -960 960 960'
                      width='20'
                      fill={`${
                        subscribedTagInfo.isReceiveNotification
                          ? '#5f646b'
                          : '#a0a5ac'
                      }`}
                    >
                      <path d='M200-200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h40q17 0 28.5 11.5T800-240q0 17-11.5 28.5T760-200H200ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Z' />
                    </svg>
                    <span
                      className={`relative flex items-center text-[0.825rem] ${
                        !subscribedTagInfo.isReceiveNotification
                          ? 'font-bold'
                          : 'font-medium'
                      }`}
                    >
                      새 글 알림 받기
                      {subscribedTagInfo.isReceiveNotification && (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          height='24px'
                          viewBox='0 -960 960 960'
                          width='24px'
                          fill='#3a8af9'
                          className='absolute right-[-2rem]'
                        >
                          <path d='m382-373.98 333.93-333.93q17.05-16.96 40.18-16.96t40.09 16.75q16.95 16.74 16.95 40.13 0 23.38-16.95 40.34L421.63-253.33q-16.77 16.96-39.54 16.96-22.76 0-39.72-16.96l-176.8-176.56q-16.96-16.93-16.58-40.12.38-23.19 17.13-40.14 16.98-17.2 40.25-17.2 23.26 0 40.22 17.2L382-373.98Z' />
                        </svg>
                      )}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      disableReceiveNotificationMutation.mutate(
                        subscribedTagInfo.tagId
                      );

                      handleButtonInBottomDrawaberClick();
                    }}
                    className='w-full py-2 flex items-center gap-x-2'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='20'
                      viewBox='0 -960 960 960'
                      width='20'
                      fill={`${
                        !subscribedTagInfo.isReceiveNotification
                          ? '#5f646b'
                          : '#a0a5ac'
                      }`}
                    >
                      <path d='M646-200H200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-33 8.5-65t25.5-61l126 126H288L84-764q-11-11-11-28t11-28q11-11 28-11t28 11l680 680q11 11 11.5 27.5T820-84q-11 11-28 11t-28-11L646-200Zm74-251q0 12-7 22t-18 15q-11 5-23 2.5T652-422L367-707q-7-7-10-15t-3-17q0-11 5.5-21.5T375-776q11-5 22-9t23-7v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 85t50 147v109ZM480-80q-30 0-53.5-16.5T403-141q0-8 6.5-13.5T424-160h112q8 0 14.5 5.5T557-141q0 28-23.5 44.5T480-80Z' />
                    </svg>
                    <span
                      className={`relative flex items-center text-[0.825rem] ${
                        !subscribedTagInfo.isReceiveNotification
                          ? 'font-bold'
                          : 'font-medium'
                      }`}
                    >
                      새 글 알림 끄기
                      {!subscribedTagInfo.isReceiveNotification && (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          height='24px'
                          viewBox='0 -960 960 960'
                          width='24px'
                          fill='#3a8af9'
                          className='absolute right-[-2rem]'
                        >
                          <path d='m382-373.98 333.93-333.93q17.05-16.96 40.18-16.96t40.09 16.75q16.95 16.74 16.95 40.13 0 23.38-16.95 40.34L421.63-253.33q-16.77 16.96-39.54 16.96-22.76 0-39.72-16.96l-176.8-176.56q-16.96-16.93-16.58-40.12.38-23.19 17.13-40.14 16.98-17.2 40.25-17.2 23.26 0 40.22 17.2L382-373.98Z' />
                        </svg>
                      )}
                    </span>
                  </button>
                </div>

                <div>
                  <button
                    onClick={(e) => {
                      unsubscribeTagMutation.mutate(subscribedTagInfo.tagId);
                      closeDrawer();
                    }}
                    className='w-full flex items-center gap-x-2 py-2'
                  >
                    <span className='text-[0.825rem] font-medium'>
                      구독 취소
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <section className='w-full flex justify-between gap-x-6 mt-10'>
        <div className='w-full'>
          <div className='w-full flex flex-col gap-y-1'>
            <p className='font-semibold text-[0.825rem] text-[#8b95a1]'>
              총 {searchedPostNum}개
            </p>
            <FeedPostList
              searchQuery={query}
              setSearchedPostNum={setSearchedPostNum}
            />
          </div>
        </div>

        <div className='mt-2 w-[10rem] sticky top-[4.75rem] h-fit flex flex-col gap-y-5'>
          <Link
            href='/community/post/new'
            className='flex justify-center items-center gap-x-[0.325rem] bg-[#3a8af9] px-3 py-[0.625rem] text-white text-center rounded-lg font-medium hover:bg-[#1b64da]'
          >
            글 작성하기
          </Link>
        </div>
      </section>
    </div>
  );
}
