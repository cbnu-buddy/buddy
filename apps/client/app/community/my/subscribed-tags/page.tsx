'use client';

import SubscribedTagList from './components/subscribedTag/SubscribedTagList';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastInfoStore } from '@/store/ToastInfo';
import axiosInstance from '@/utils/axiosInstance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MySubscribedTagInfo, TagInfo } from '@/types/tag';
import Loading from '@/app/loading';
import { AxiosError } from 'axios';

// 회원의 구독한 태그 목록 정보 조회 API
const fetchMySubscribedTagInfos = () => {
  return axiosInstance.get(`/private/subscribe/my/subscribed-tags`);
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

export default function MySubscribedTags() {
  const queryClient = useQueryClient();

  const updateToastMessage = ToastInfoStore(
    (state: any) => state.updateToastMessage
  );
  const updateOpenToastStatus = ToastInfoStore(
    (state: any) => state.updateOpenToastStatus
  );

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['mySubscribedTagInfos'],
    queryFn: fetchMySubscribedTagInfos,
    retry: 0,
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
          updateToastMessage(
            `"${selectedTagInfo.tagName}" 구독이 취소되었습니다`
          );
          updateOpenToastStatus(true);

          setMySubscribedTagInfos((prevData) =>
            prevData.map((item) =>
              item.tagId === selectedTagInfo.tagId
                ? {
                    ...item,
                    isSubscribed: false,
                  }
                : item
            )
          );

          closeDrawer();
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
          // 쿼리 데이터 업데이트
          queryClient.invalidateQueries({
            queryKey: ['mySubscribedTagInfos'],
          });

          setMySubscribedTagInfos((prevData) =>
            prevData.map((item) =>
              item.tagId === selectedTagInfo.tagId
                ? {
                    ...item,
                    isReceiveNotification: true,
                  }
                : item
            )
          );
          setSelectedTagInfo((prev) => ({
            ...prev,
            isReceiveNotification: true,
          }));
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
          // 쿼리 데이터 업데이트
          queryClient.invalidateQueries({
            queryKey: ['mySubscribedTagInfos'],
          });

          setMySubscribedTagInfos((prevData) =>
            prevData.map((item) =>
              item.tagId === selectedTagInfo.tagId
                ? {
                    ...item,
                    isReceiveNotification: false,
                  }
                : item
            )
          );
          setSelectedTagInfo((prev) => ({
            ...prev,
            isReceiveNotification: true,
          }));
          handleButtonInBottomDrawaberClick();
          break;
        default:
          alert('정의되지 않은 http status code입니다');
      }
    },
    onSettled: () => {},
  });

  const [mySubscribedTagInfos, setMySubscribedTagInfos] = useState<
    MySubscribedTagInfo[]
  >([]);

  useEffect(() => {
    if (data) {
      const resData = data?.data.response.map((item: MySubscribedTagInfo) => ({
        ...item,
        isSubscribed: true,
        isReceiveNotification: item.isReceiveNotification,
      }));
      setMySubscribedTagInfos(resData);
    }
  }, [data]);

  const [isOpenBottomDrawer, setIsOpenBottomDrawer] = useState<boolean>(false);
  const [isBottomDrawerClosing, setIsBottomDrawerClosing] =
    useState<boolean>(false);
  const [selectedTagInfo, setSelectedTagInfo] = useState<{
    tagId: number;
    tagName: string;
    isReceiveNotification: boolean;
  }>({
    tagId: 0,
    tagName: '',
    isReceiveNotification: false,
  });

  const router = useRouter();

  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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

  if (isPending) return <Loading />;

  return (
    <div className='flex flex-col w-[37.5rem] mx-auto pt-6 pb-24'>
      <div className='mt-2 flex items-center'>
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
        <h1 className='mx-auto font-semibold text-lg text-[#333d4b]'>
          구독한 태그
        </h1>
      </div>

      <div className='mt-9'>
        <SubscribedTagList
          mySubscribedTagInfos={mySubscribedTagInfos}
          setMySubscribedTagInfos={setMySubscribedTagInfos}
          setIsOpenBottomDrawer={setIsOpenBottomDrawer}
          selectedTagInfo={selectedTagInfo}
          setSelectedTagInfo={setSelectedTagInfo}
        />
      </div>

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
                      selectedTagInfo.tagId
                    );
                  }}
                  className='w-full py-2 flex items-center gap-x-2'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='20'
                    viewBox='0 -960 960 960'
                    width='20'
                    fill={`${
                      selectedTagInfo.isReceiveNotification
                        ? '#5f646b'
                        : '#a0a5ac'
                    }`}
                  >
                    <path d='M200-200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h40q17 0 28.5 11.5T800-240q0 17-11.5 28.5T760-200H200ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Z' />
                  </svg>
                  <span
                    className={`relative flex items-center text-[0.825rem] ${
                      selectedTagInfo.isReceiveNotification
                        ? 'font-bold'
                        : 'font-medium'
                    }`}
                  >
                    새 글 알림 받기
                    {selectedTagInfo.isReceiveNotification && (
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
                      selectedTagInfo.tagId
                    );
                  }}
                  className='w-full py-2 flex items-center gap-x-2'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='20'
                    viewBox='0 -960 960 960'
                    width='20'
                    fill={`${
                      !selectedTagInfo.isReceiveNotification
                        ? '#5f646b'
                        : '#a0a5ac'
                    }`}
                  >
                    <path d='M646-200H200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-33 8.5-65t25.5-61l126 126H288L84-764q-11-11-11-28t11-28q11-11 28-11t28 11l680 680q11 11 11.5 27.5T820-84q-11 11-28 11t-28-11L646-200Zm74-251q0 12-7 22t-18 15q-11 5-23 2.5T652-422L367-707q-7-7-10-15t-3-17q0-11 5.5-21.5T375-776q11-5 22-9t23-7v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 85t50 147v109ZM480-80q-30 0-53.5-16.5T403-141q0-8 6.5-13.5T424-160h112q8 0 14.5 5.5T557-141q0 28-23.5 44.5T480-80Z' />
                  </svg>
                  <span
                    className={`relative flex items-center text-[0.825rem] ${
                      !selectedTagInfo.isReceiveNotification
                        ? 'font-bold'
                        : 'font-medium'
                    }`}
                  >
                    새 글 알림 끄기
                    {!selectedTagInfo.isReceiveNotification && (
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
                    unsubscribeTagMutation.mutate(selectedTagInfo.tagId);
                  }}
                  className='w-full flex items-center gap-x-2 py-2'
                >
                  <span className='text-[0.825rem] font-medium'>구독 취소</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
