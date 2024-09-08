'use client';

import { Modal } from 'flowbite-react';
import React, { useState } from 'react';
import { PartySelectedPlanInfoStore } from '@/store/party/PartySelectedPlanInfo';
import { PartySelectedPlanInfo } from '@/types/partySelectedPlan';
import uncheckedImg from '@/public/images/unchecked.png';
import checkedImg from '@/public/images/checked.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PartyLeaderGuideModalProps {
  openPartyLeaderGuideModal: string | undefined;
  setOpenPartyLeaderGuideModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export default function PartyLeaderGuideModal({
  openPartyLeaderGuideModal,
  setOpenPartyLeaderGuideModal,
}: PartyLeaderGuideModalProps) {
  const partySelectedPlanInfo: PartySelectedPlanInfo =
    PartySelectedPlanInfoStore((state: any) => state.partySelectedPlanInfo);

  const [isCheckedPartyLeaderGuide, setIsCheckedPartyLeaderGuide] =
    useState(false);

  const router = useRouter();

  return (
    <Modal
      size='lg'
      show={openPartyLeaderGuideModal === 'default'}
      onClose={() => setOpenPartyLeaderGuideModal(undefined)}
    >
      <Modal.Header className='border-none p-6 flex items-center'>
        <button className='mt-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24'
            viewBox='0 -960 960 960'
            width='24'
          >
            <path d='m112.769-480 308.616 308.615q8.846 8.846 8.731 21.154-.116 12.308-8.962 21.154T400-120.231q-12.308 0-21.154-8.846L73.154-434.538Q63.46-444.231 59-456.154 54.538-468.077 54.538-480T59-503.846q4.461-11.923 14.154-21.616l305.692-305.692q8.846-8.846 21.269-8.731 12.424.116 21.27 8.962t8.846 21.154q0 12.308-8.846 21.154L112.769-480Z' />
          </svg>
        </button>
      </Modal.Header>
      <Modal.Body className='flex flex-col gap-y-3 max-h-[27.5rem] pt-0 spacing-y-28'>
        <h1 className='text-xl font-semibold'>파티장 가이드</h1>
        <span className='w-fit px-2 py-1 text-white bg-[#3a8af9] text-xs font-semibold rounded-[0.3rem]'>
          {partySelectedPlanInfo.selectedPlanName}
        </span>
        {partySelectedPlanInfo.partyLeaderGuides.map(
          (partyLeaderGuides, idx) => (
            <div key={idx} className='mt-3'>
              <p className='text-[#4a4a4a] font-medium'>
                {partyLeaderGuides.subtitle}
              </p>
              <p className='mt-2 w-fit p-3 text-[#656565] bg-[#f6f6f6] text-xs rounded-[0.3rem]'>
                {partyLeaderGuides.description}
              </p>
            </div>
          )
        )}

        <div
          className='w-fit mt-5 mb-[-0.375rem] flex items-center gap-x-2 cursor-pointer'
          onClick={() => setIsCheckedPartyLeaderGuide((prev) => !prev)}
        >
          <Image
            src={isCheckedPartyLeaderGuide ? checkedImg : uncheckedImg}
            alt={`${isCheckedPartyLeaderGuide ? 'checked' : 'unchecked'} image`}
            width={22.5}
            height={0}
            quality={100}
          />
          <span className='text-[0.78rem] leading-[1.25] font-light'>
            파티장 가이드를 모두 확인했어요.
          </span>
        </div>
      </Modal.Body>
      <Modal.Footer className='border-none pt-0'>
        <button
          disabled={isCheckedPartyLeaderGuide ? false : true}
          onClick={() => {
            setOpenPartyLeaderGuideModal(undefined);
            router.push(
              `/add-party/plan/${partySelectedPlanInfo.selectedPlanId}`
            );
          }}
          className={`w-full text-white ${
            isCheckedPartyLeaderGuide
              ? 'bg-[#3a8af9] focus:bg-[#1c6cdb] hover:bg-[#1c6cdb]'
              : 'bg-[#d3d3d3]'
          }  p-[0.825rem] rounded-[0.45rem] font-semibold box-shadow duration-150 ease-out`}
        >
          다음
        </button>
      </Modal.Footer>
    </Modal>
  );
}
