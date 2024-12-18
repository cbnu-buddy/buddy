'use client';

import Loading from '@/app/loading';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useRef, useState, useEffect } from 'react';
import LinkedServicesModal from './components/LinkedServicesModal';
import { partySelectedPlanInfos } from '@/data/partySelectedPlanInfos';
import Link from 'next/link';
import Image from 'next/image';
import { CreatePostParams, PostInfo } from '@/types/post';
import { TagInfo } from '@/types/tag';
import axiosInstance from '@/utils/axiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';
import NotFound from '@/app/[...Not_found]/page';
import { AxiosError } from 'axios';
import { UploadFileStore } from '@/store/UploadFile';
import TagEditor from '../../new/components/TagEditor';

// 커뮤니티 게시글 정보 조회 API
const fetchCommunityPostInfo = ({ queryKey }: any) => {
  const postId = queryKey[1];
  return axiosInstance.get(`/public/community/posts/${postId}`);
};

// 커뮤니티 게시글 수정 API
const modifyCommunityPost = ({
  postId,
  requestBody,
}: {
  postId: string;
  requestBody: CreatePostParams;
}) => {
  return axiosInstance.put(`/private/community/posts/${postId}`, requestBody);
};

interface DefaultProps {
  params: {
    postId: string;
  };
}

const CustomCKEditor = dynamic(
  () => import('@/app/components/CustomCKEditor'),
  { ssr: false, loading: () => <Loading /> }
);

export default function EditCommunityPost(props: DefaultProps) {
  const postId = props.params.postId;

  const filePathUrlList = UploadFileStore(
    (state: any) => state.filePathUrlList
  );
  const removeFilePathUrlList = UploadFileStore(
    (state: any) => state.removeFilePathUrlList
  );
  const updateFilePathUrlList = UploadFileStore(
    (state: any) => state.updateFilePathUrlList
  );

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['communityPostInfo', postId],
    queryFn: fetchCommunityPostInfo,
    retry: 0,
  });

  console.log(filePathUrlList);

  const modifyCommunityPostMutation = useMutation({
    mutationFn: modifyCommunityPost,
    onMutate: () => {},
    onError: (error: AxiosError) => {
      const resData: any = error.response;

      // console.log(resData);
      // switch (
      //   resData?.status
      // case 409:
      //   switch (resData?.data.error.status) {
      //     default:
      //       alert("정의되지 않은 http code입니다.");
      //   }
      //   break;
      // default:
      //   alert("정의되지 않은 http status code입니다");
      // ) {
      // }
    },
    onSuccess: (data) => {
      const httpStatusCode = data.status;
      const resData = data.data.response;
      const postId = resData.postId;

      switch (httpStatusCode) {
        case 200:
          router.push(`/community/post/${postId}`);
          break;
        default:
          alert('정의되지 않은 http status code입니다');
      }
    },
    onSettled: () => {},
  });

  const resData = data?.data.response;
  const postInfo: PostInfo = resData;

  const [title, setTitle] = useState('');
  const [isTitleValidFail, setIsTitleValidFail] = useState(false);
  const [content, setContent] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [openLinkedServicesModal, setOpenLinkedServicesModal] = useState<
    string | undefined
  >();
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (postInfo) {
      setTitle(postInfo.title);
      setContent(postInfo.content);
      const tags = postInfo.tags.map((tagInfo: TagInfo) => tagInfo.tagName);
      setTagList(tags);
      const serviceIds = postInfo.services.map(
        (serviceInfo) => serviceInfo.serviceId
      );
      setSelectedServices(serviceIds);
      removeFilePathUrlList();
      removeFilePathUrlList();
      if (postInfo.postImagePathUrls) {
        updateFilePathUrlList(...postInfo.postImagePathUrls);
      }
    }
  }, [postInfo]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsTitleValidFail(false);
  };

  const handleCancelEditPost = () => {
    const userResponse = confirm('게시글 수정을 취소하시겠습니까?');
    if (!userResponse) return;

    router.back();
  };

  const handleEditPost = () => {
    if (!title) {
      alert('제목을 입력해 주세요');
      window.scrollTo(0, 0);
      titleRef.current?.focus();
      setIsTitleValidFail(true);
      return;
    }

    if (content === null) {
      alert('본문을 입력해 주세요');
      window.scrollTo(0, 0);
      return;
    }

    const requestBody: CreatePostParams = {
      title,
      content,
      tags: tagList,
      serviceIds: selectedServices,
      postImagePathUrls: filePathUrlList,
    };

    modifyCommunityPostMutation.mutate({ postId, requestBody });
  };

  if (isError) return <NotFound />;
  if (isPending) return <Loading />;

  return (
    <div className='mt-6 mb-4 px-5 2lg:px-0'>
      <div className='flex flex-col w-[50rem] mx-auto'>
        <p className='text-2xl font-semibold'>글 쓰기</p>
        <div className='flex flex-col relative z-0 w-1/2 group mt-5 mb-8'>
          <input
            type='text'
            name='floating_first_name'
            className={`block pt-3 pb-[0.175rem] pl-0 pr-0 w-full font-normal text-gray-900 bg-transparent border-0 border-b border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-${
              isTitleValidFail ? 'pink' : 'blue'
            }-500 focus:border-${
              isTitleValidFail ? 'red' : 'blue'
            }-500 focus:outline-none focus:ring-0 peer`}
            placeholder=' '
            required
            value={title}
            ref={titleRef}
            onChange={handleTitleChange}
          />
          <label
            htmlFor='floating_first_name'
            className={`peer-focus:font-light absolute text-base left-[0.1rem] font-light text-${
              isTitleValidFail ? 'red' : 'gray'
            }-500 dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-[0.1rem] peer-focus:text-${
              isTitleValidFail ? 'red' : 'blue'
            }-600 peer-focus:dark:text-${
              isTitleValidFail ? 'red' : 'blue'
            }-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[1.25rem]`}
          >
            게시글 제목
          </label>
          <p
            className={`text-${
              isTitleValidFail ? 'red' : 'gray'
            }-500 text-xs tracking-widest font-light mt-1`}
          >
            제목을 입력해 주세요
          </p>
        </div>

        <div className='w-full mx-auto overflow-auto'>
          <CustomCKEditor
            initEditorContent={content}
            onEditorChange={setContent}
          />
        </div>

        <div className='mt-8 flex flex-col'>
          <div className='flex flex-col gap-y-10'>
            <div className='flex flex-col gap-y-1'>
              <p className='text-base font-semibold'>태그</p>
              <TagEditor tagList={tagList} setTagList={setTagList} />
            </div>

            <div className='flex flex-col items-start gap-y-[0.375rem]'>
              <div className='flex gap-x-4 items-center'>
                <p className='text-base font-semibold'>연결할 서비스</p>
                <button
                  onClick={() => {
                    setOpenLinkedServicesModal('default');
                  }}
                  className='flex gap-1 bg-[#f2f4f6] text-[#4e5968] px-2 py-[0.375rem] rounded-[0.25rem] font-sm focus:bg-[#dbe0e5] hover:bg-[#dbe0e5]'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='18'
                    viewBox='0 -960 960 960'
                    width='18'
                    fill='#4e5968'
                    className='relative top-[0.125rem]'
                  >
                    <path d='M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z' />
                  </svg>
                  조회하기
                </button>
              </div>

              <div className='mt-2 flex gap-x-3 text-[#333d4b]'>
                {selectedServices.map((selectedServiceId, index) => (
                  <Link
                    key={index}
                    href={`/join-party/plan/${
                      partySelectedPlanInfos[selectedServiceId - 1]
                        .planDetailInfos[
                        partySelectedPlanInfos[selectedServiceId - 1]
                          .planDetailInfos.length - 1
                      ].id
                    }`}
                    className='w-[5.75rem] text-center flex flex-col items-center bg-[#f2f4f6] px-4 pb-3 rounded-lg hover:bg-[#dbe0e5]'
                  >
                    <Image
                      src={
                        partySelectedPlanInfos[selectedServiceId - 1].iconImg
                      }
                      alt={
                        partySelectedPlanInfos[selectedServiceId - 1].iconImgAlt
                      }
                      width={60}
                      height={0}
                      quality={100}
                      className='mt-3'
                    />

                    <p className='mt-2 text-inherit text-[0.825rem] font-medium'>
                      {partySelectedPlanInfos[selectedServiceId - 1].name}
                    </p>
                  </Link>
                ))}
              </div>

              {openLinkedServicesModal && (
                <LinkedServicesModal
                  openLinkedServicesModal={openLinkedServicesModal}
                  setOpenLinkedServicesModal={setOpenLinkedServicesModal}
                  selectedServices={selectedServices}
                  setSelectedServices={setSelectedServices}
                />
              )}
            </div>
          </div>

          <div className='mt-14 pb-2 flex justify-end gap-3'>
            <button
              onClick={handleCancelEditPost}
              className='px-4 py-[0.5rem] rounded-[6px] font-light'
            >
              취소
            </button>
            <button
              onClick={handleEditPost}
              className='text-[#f9fafb] bg-[#3a8af9] px-4 py-[0.5rem] rounded-[6px] focus:bg-[#1c6cdb] hover:bg-[#1c6cdb]'
            >
              수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
