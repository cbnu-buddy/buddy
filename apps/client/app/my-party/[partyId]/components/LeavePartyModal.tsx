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

interface LeavePartyModalProps {
  openLeavePartyModal: string | undefined;
  setOpenLeavePartyModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  partyId: string;
}

// 파티 탈퇴하기 API
const leaveParty = (partyId: string) => {
  return axiosInstance.delete(`/private/party/${partyId}/leave`);
};

export default function LeavePartyModal({
  openLeavePartyModal,
  setOpenLeavePartyModal,
  partyId,
}: LeavePartyModalProps) {
  const router = useRouter();

  const leavePartyMutation = useMutation({
    mutationFn: leaveParty,
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
      alert('파티에서 탈퇴하였습니다.');
      setOpenLeavePartyModal(undefined);
      router.push('/my-party');
    },
    onSettled: () => {},
  });

  const [isCheckedPartyLeaderGuide, setIsCheckedPartyLeaderGuide] =
    useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  if (!partyId) {
    return null;
  }

  return (
    <Modal
      size='sm'
      show={openLeavePartyModal === 'default'}
      data-aos='fade-zoom'
      data-aos-duration='300'
      onClose={() => setOpenLeavePartyModal(undefined)}
    >
      <Modal.Body className='pb-0 spacing-y-28'>
        <div className='h-[16rem]'>
          <p className='text-lg font-bold'>파티 탈퇴 주의사항</p>

          <div className='mt-5 bg-[#f6f6f6] text-xs rounded-lg p-3 leading-4'>
            <img
              src='/images/warning_icon.png'
              alt='warning icon image'
              width='20px'
              className='inline-block mb-1'
            />
            버디는 안정적인 파티 운영을 위해 보증금 정책을 운영하고 있습니다.{' '}
            <br /> <br />
            파티원은 약속한 파티 종료일 전에 파티를 탈퇴할 경우 거치한 보증금을
            환급받을 수 없습니다. <br />
            단, 예정 파티의 파티원은 보증금 결제 전이므로 환급할 내역이 없음을
            안내드립니다.
          </div>

          <div
            className='w-fit mt-5 mb-[-0.375rem] flex items-center gap-x-2 cursor-pointer'
            onClick={() => setIsCheckedPartyLeaderGuide((prev) => !prev)}
          >
            <Image
              src={isCheckedPartyLeaderGuide ? checkedImg : uncheckedImg}
              alt={`${
                isCheckedPartyLeaderGuide ? 'checked' : 'unchecked'
              } image`}
              width={22.5}
              height={0}
              quality={100}
            />
            <span className='text-[0.78rem] leading-[1.25] font-light'>
              위 주의사항을 확인했습니다.
            </span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='pt-0 border-none'>
        <button
          onClick={() => {
            setOpenLeavePartyModal(undefined);
          }}
          className='w-full text-[#787878] text-[0.8rem] bg-[#efefef] hover:brightness-[96%] duration-150 ease-out p-[0.825rem] rounded-[0.45rem] font-bold'
        >
          취소
        </button>

        <button
          onClick={() => {
            if (!isCheckedPartyLeaderGuide) {
              alert('파티 탈퇴 주의사항에 동의해 주세요');
              return 0;
            }
            leavePartyMutation.mutate(partyId);
          }}
          className='w-full text-white text-[0.8rem] bg-[#3a8af9] hover:bg-[#1c6cdb] duration-150 ease-out p-[0.825rem] rounded-[0.45rem] font-bold box-shadow'
        >
          탈퇴하기
        </button>
      </Modal.Footer>
    </Modal>
  );
}
