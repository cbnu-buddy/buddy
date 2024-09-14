"use client";

import { Modal } from "flowbite-react";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

// 커뮤니티 게시글 내 답글 삭제 API
const deleteCommunityPostReply = (selectedReplyId: number) => {
  return axiosInstance.delete(`/private/comments/replies/${selectedReplyId}`);
};

interface ConfirmDeleteCommunityPostModalProps {
  openConfirmDeleteCommunityPostReplyModal: string | undefined;
  setOpenConfirmDeleteCommunityPostReplyModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  postId: string;
  selectedReplyId: number;
}

export default function ConfirmDeleteCommunityPostReplyModal({
  openConfirmDeleteCommunityPostReplyModal,
  setOpenConfirmDeleteCommunityPostReplyModal,
  postId,
  selectedReplyId,
}: ConfirmDeleteCommunityPostModalProps) {
  const queryClient = useQueryClient();

  const deleteCommunityPostReplyMutation = useMutation({
    mutationFn: deleteCommunityPostReply,
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
          // 쿼리 데이터 업데이트
          queryClient.invalidateQueries({
            queryKey: ["communityPostInfo", postId],
          });
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
      show={openConfirmDeleteCommunityPostReplyModal === "default"}
      data-aos="fade-zoom"
      data-aos-duration="300"
    >
      <Modal.Body className="flex flex-col gap-y-3 pb-0 spacing-y-28">
        <p className="text-lg font-bold">답글 삭제</p>

        <p className="h-[1.25rem] text-sm text-[#727272] font-medium">
          답글을 삭제하시겠어요?
        </p>
      </Modal.Body>
      <Modal.Footer className="border-none">
        <button
          onClick={() => {
            setOpenConfirmDeleteCommunityPostReplyModal(undefined);
          }}
          className="w-full text-[#787878] text-[0.8rem] bg-[#efefef] hover:brightness-[96%] duration-150 ease-out p-[0.825rem] rounded-[0.45rem] font-bold"
        >
          뒤로가기
        </button>
        <button
          onClick={() => {
            deleteCommunityPostReplyMutation.mutate(selectedReplyId);
            setOpenConfirmDeleteCommunityPostReplyModal(undefined);
          }}
          className="w-full text-white text-[0.8rem] bg-[#3a8af9] hover:bg-[#1c6cdb] duration-150 ease-out p-[0.825rem] rounded-[0.45rem] font-bold"
        >
          삭제하기
        </button>
      </Modal.Footer>
    </Modal>
  );
}
