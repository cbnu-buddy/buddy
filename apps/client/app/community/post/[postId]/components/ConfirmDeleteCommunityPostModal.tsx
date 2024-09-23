"use client";

import { Modal } from "flowbite-react";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ToastInfoStore } from "@/store/components/ToastInfo";

// 커뮤니티 게시글 삭제 API
const deleteCommunityPost = (postId: string) => {
  return axiosInstance.delete(`/private/community/posts/${postId}`);
};

interface ConfirmDeleteCommunityPostModalProps {
  openConfirmDeleteCommunityPostModal: string | undefined;
  setOpenConfirmDeleteCommunityPostModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  postId: string;
}

export default function ConfirmDeleteCommunityPostModal({
  openConfirmDeleteCommunityPostModal,
  setOpenConfirmDeleteCommunityPostModal,
  postId,
}: ConfirmDeleteCommunityPostModalProps) {
  const updateToastMessage = ToastInfoStore(
    (state: any) => state.updateToastMessage
  );
  const updateOpenToastStatus = ToastInfoStore(
    (state: any) => state.updateOpenToastStatus
  );

  const deleteCommunityPostMutation = useMutation({
    mutationFn: deleteCommunityPost,
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

      switch (httpStatusCode) {
        case 200:
          router.push("/community");
          updateToastMessage("게시글이 삭제됐어요");
          updateOpenToastStatus(true);
          break;
        default:
          alert("정의되지 않은 http status code입니다");
      }
    },
    onSettled: () => {},
  });

  const router = useRouter();

  const [isCheckedPartyLeaderGuide, setIsCheckedPartyLeaderGuide] =
    useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Modal
      size="sm"
      show={openConfirmDeleteCommunityPostModal === "default"}
      data-aos="fade-zoom"
      data-aos-duration="300"
    >
      <Modal.Body className="flex flex-col gap-y-3 pb-0 spacing-y-28">
        <p className="text-lg font-bold">게시글을 삭제하시겠습니까?</p>

        <p className="h-[1.25rem] text-sm text-[#727272] font-medium">
          삭제 후 내용을 되돌릴 수 없습니다.
        </p>
      </Modal.Body>
      <Modal.Footer className="border-none">
        <button
          onClick={() => {
            setOpenConfirmDeleteCommunityPostModal(undefined);
          }}
          className="w-full text-[#787878] text-[0.8rem] bg-[#efefef] hover:brightness-[96%] duration-150 ease-out p-[0.825rem] rounded-[0.45rem] font-bold"
        >
          뒤로가기
        </button>
        <button
          onClick={() => {
            deleteCommunityPostMutation.mutate(postId);
            setOpenConfirmDeleteCommunityPostModal(undefined);
          }}
          className="w-full text-white text-[0.8rem] bg-[#3a8af9] hover:bg-[#1c6cdb] duration-150 ease-out p-[0.825rem] rounded-[0.45rem] font-bold"
        >
          삭제하기
        </button>
      </Modal.Footer>
    </Modal>
  );
}
