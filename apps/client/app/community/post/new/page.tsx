"use client";

import Loading from "@/app/loading";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import TagEditor from "./components/TagEditor";
import LinkedServicesModal from "./components/LinkedServicesModal";
import { partySelectedPlanInfos } from "@/data/partySelectedPlanInfos";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { CreatePostParams } from "@/types/post";

// 커뮤니티 게시글 등록 API
const createCommunityPost = (params: CreatePostParams) => {
  const { title, content, tags, serviceIds } = params;
  const reqBody = {
    title,
    content,
    tags,
    serviceIds,
  };

  return axiosInstance.post(`/private/community/post`, reqBody);
};

const CustomCKEditor = dynamic(
  () => import("@/app/components/CustomCKEditor"),
  { ssr: false, loading: () => <Loading /> }
);

const STORAGE_KEY = "communityPostDraft";

export default function CreateCommunityPost() {
  const createCommunityPostMutation = useMutation({
    mutationFn: createCommunityPost,
    onSuccess: (data) => {
      const resData = data?.data.response;
      const httpStatusCode = data?.status;

      switch (httpStatusCode) {
        case 200:
          const postId = resData?.postId;
          alert("게시글이 등록되었습니다.");
          localStorage.removeItem(STORAGE_KEY);
          router.push(`/community/post/${postId}`);
          break;
        default:
          alert("정의되지 않은 http status code입니다");
      }
    },
  });

  // LocalStorage에서 초기값 로드
  const savedData =
    typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  const parsedData = savedData ? JSON.parse(savedData) : {};

  const [title, setTitle] = useState(parsedData.savedTitle || "");
  const [isTitleValidFail, setIsTitleValidFail] = useState(false);
  const [content, setContent] = useState(parsedData.savedContent || "");
  const [tagList, setTagList] = useState<string[]>(
    parsedData.savedTagList || []
  );
  const [openLinkedServicesModal, setOpenLinkedServicesModal] = useState<
    string | undefined
  >();
  const [selectedServices, setSelectedServices] = useState<number[]>(
    parsedData.savedSelectedServices || []
  );

  const titleRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 페이지 로드 시 localStorage에서 데이터 불러오기
  useEffect(() => {
    if (savedData) {
      const { savedTitle, savedContent, savedTagList, savedSelectedServices } =
        parsedData;
      setTitle(savedTitle);
      setContent(savedContent);
      setTagList(savedTagList);
      setSelectedServices(savedSelectedServices);
    }
  }, []);

  useEffect(() => {
    // 데이터가 변경될 때마다 localStorage에 저장
    const dataToSave = {
      savedTitle: title,
      savedContent: content,
      savedTagList: tagList,
      savedSelectedServices: selectedServices,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [title, content, tagList, selectedServices]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsTitleValidFail(false);
  };

  const handleCancelRegisterPost = () => {
    const userResponse = confirm("게시글 작성을 취소하시겠습니까?");
    if (!userResponse) return;

    router.back();
  };

  const handleRegisterPost = () => {
    if (!title) {
      alert("제목을 입력해 주세요");
      window.scrollTo(0, 0);
      titleRef.current?.focus();
      setIsTitleValidFail(true);
      return;
    }

    if (!content) {
      alert("본문을 입력해 주세요");
      window.scrollTo(0, 0);
      return;
    }

    const communityPosttData: CreatePostParams = {
      title,
      content,
      tags: tagList,
      serviceIds: selectedServices,
    };

    createCommunityPostMutation.mutate(communityPosttData);

    // 게시글이 성공적으로 등록되면 localStorage에서 임시 저장된 데이터를 삭제
    // localStorage.removeItem(STORAGE_KEY);

    // router.push(`/community/post/${1}`);
  };

  return (
    <div className="mt-6 mb-4 px-5 2lg:px-0">
      <div className="flex flex-col w-[50rem] mx-auto">
        <p className="text-2xl font-semibold">글 쓰기</p>
        <div className="flex flex-col relative z-0 w-1/2 group mt-5 mb-8">
          <input
            type="text"
            name="floating_first_name"
            className={`block pt-3 pb-[0.175rem] pl-0 pr-0 w-full font-normal text-gray-900 bg-transparent border-0 border-b border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-${
              isTitleValidFail ? "pink" : "blue"
            }-500 focus:border-${
              isTitleValidFail ? "red" : "blue"
            }-500 focus:outline-none focus:ring-0 peer`}
            placeholder=" "
            required
            value={title}
            ref={titleRef}
            onChange={handleTitleChange}
          />
          <label
            htmlFor="floating_first_name"
            className={`peer-focus:font-light absolute text-base left-[0.1rem] font-light text-${
              isTitleValidFail ? "red" : "gray"
            }-500 dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-[0.1rem] peer-focus:text-${
              isTitleValidFail ? "red" : "blue"
            }-600 peer-focus:dark:text-${
              isTitleValidFail ? "red" : "blue"
            }-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[1.25rem]`}
          >
            게시글 제목
          </label>
          <p
            className={`text-${
              isTitleValidFail ? "red" : "gray"
            }-500 text-xs tracking-widest font-light mt-1`}
          >
            제목을 입력해 주세요
          </p>
        </div>

        <div className="w-full mx-auto overflow-auto">
          <CustomCKEditor
            initEditorContent={content}
            onEditorChange={setContent}
          />
        </div>

        <div className="mt-8 flex flex-col">
          <div className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-1">
              <p className="text-base font-semibold">태그</p>
              <TagEditor tagList={tagList} setTagList={setTagList} />
            </div>

            <div className="flex flex-col items-start gap-y-[0.375rem]">
              <div className="flex gap-x-4 items-center">
                <p className="text-base font-semibold">연결할 서비스</p>
                <button
                  onClick={() => {
                    setOpenLinkedServicesModal("default");
                  }}
                  className="flex gap-1 bg-[#f2f4f6] text-[#4e5968] px-2 py-[0.375rem] rounded-[0.25rem] font-sm focus:bg-[#dbe0e5] hover:bg-[#dbe0e5]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="18"
                    viewBox="0 -960 960 960"
                    width="18"
                    fill="#4e5968"
                    className="relative top-[0.125rem]"
                  >
                    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                  </svg>
                  조회하기
                </button>
              </div>

              <div className="mt-2 flex gap-x-3 text-[#333d4b]">
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
                    className="w-[5.75rem] text-center flex flex-col items-center bg-[#f2f4f6] px-4 pb-3 rounded-lg hover:bg-[#dbe0e5]"
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
                      className="mt-3"
                    />

                    <p className="mt-2 text-inherit text-[0.825rem] font-medium">
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

          <div className="mt-14 pb-2 flex justify-end gap-3">
            <button
              onClick={handleCancelRegisterPost}
              className="px-4 py-[0.5rem] rounded-[6px] font-light"
            >
              취소
            </button>
            <button
              onClick={handleRegisterPost}
              className="text-[#f9fafb] bg-[#3a8af9] px-4 py-[0.5rem] rounded-[6px] focus:bg-[#1c6cdb] hover:bg-[#1c6cdb]"
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
