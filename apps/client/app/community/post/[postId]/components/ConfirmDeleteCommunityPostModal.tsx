'use client';

import { Modal } from 'flowbite-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Image from 'next/image';
import uncheckedImg from '@/public/images/unchecked.png';
import checkedImg from '@/public/images/checked.png';
import { useRouter } from 'next/navigation';

interface ConfirmDeleteCommunityPostModalProps {
  openConfirmDeleteCommunityPostModal: string | undefined;
  setOpenConfirmDeleteCommunityPostModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  postId: string;
}

// 커뮤니티 게시글 삭제하기 API
const disbandParty = (partyId: string) => {
  return axiosInstance.delete(`/private/party/${partyId}`);
};

export default function ConfirmDeleteCommunityPostModal({
  openConfirmDeleteCommunityPostModal,
  setOpenConfirmDeleteCommunityPostModal,
  postId,
}: ConfirmDeleteCommunityPostModalProps) {
  const router = useRouter();

  const disbandPartyMutation = useMutation({
    mutationFn: disbandParty,
    onMutate: () => {},
    onError: (error: AxiosError) => {
      const resData: any = error.response;
      switch (resData?.status) {
        case 409:
          switch (resData?.data.error.status) {
            // case 'CONFLICT':
            //   alert('이미 처리된 결제 정보입니다.');
            //   router.push('/my-page');
            //   break;
            default:
              alert('정의되지 않은 http code입니다.');
          }
          break;
        default:
          alert('정의되지 않은 http status code입니다');
      }
    },
    onSuccess: (data) => {
      alert('파티가 해산되었습니다.');
      setOpenConfirmDeleteCommunityPostModal(undefined);
      router.push('/my-party');
    },
    onSettled: () => {},
  });

  const [isCheckedPartyLeaderGuide, setIsCheckedPartyLeaderGuide] =
    useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Modal
      size='sm'
      show={openConfirmDeleteCommunityPostModal === 'default'}
      data-aos='fade-zoom'
      data-aos-duration='300'
    >
      <Modal.Body className='flex flex-col gap-y-3 pb-0 spacing-y-28'>
        <p className='text-lg font-bold'>게시글을 삭제하시겠습니까?</p>

        <p className='h-[1.25rem] text-sm text-[#727272] font-medium'>
          삭제 후 내용을 되돌릴 수 없습니다.
        </p>
      </Modal.Body>
      <Modal.Footer className='border-none'>
        <button
          onClick={() => {
            setOpenConfirmDeleteCommunityPostModal(undefined);
          }}
          className='w-full text-[#787878] text-[0.8rem] bg-[#efefef] hover:brightness-[96%] duration-150 ease-out p-[0.825rem] rounded-[0.45rem] font-bold'
        >
          뒤로가기
        </button>
        <button
          onClick={() => {
            setOpenConfirmDeleteCommunityPostModal(undefined);
            alert('게시글이 삭제되었습니다.');
            router.push('/community');
          }}
          className='w-full text-white text-[0.8rem] bg-[#3a8af9] hover:bg-[#1c6cdb] duration-150 ease-out p-[0.825rem] rounded-[0.45rem] font-bold'
        >
          삭제하기
        </button>
      </Modal.Footer>
    </Modal>
  );
}
