import { Modal } from 'flowbite-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Image from 'next/image';
import LottieCrown from './LottieCrown';
import { userInfoStore } from '@/store/UserInfo';
import leaderUserdefaultProfileImg from '@/public/images/default_user_profile_blue_img.png';
import defaultUserProfileImg from '@/public/images/default_user_profile_green_img.png';

interface ModifyPartyRecruitmentNumModalProps {
  openModifyPartyRecruitmentNumModal: string | undefined;
  setOpenModifyPartyRecruitmentNumModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  partyId: string;
  sortedMembers: any;
  resData: any;
}

// 파티 모집 인원 변경 API
const modifyPartyRecruitmentNumInfo = ({
  partyId,
  newRecLimit,
}: {
  partyId: string;
  newRecLimit: number;
}) => {
  const reqBody = {
    newRecLimit,
  };
  return axiosInstance.patch(
    `/private/party/${partyId}/recruitment-limit`,
    reqBody
  );
};

export default function ModifyPartyRecruitmentNumModal({
  openModifyPartyRecruitmentNumModal,
  setOpenModifyPartyRecruitmentNumModal,
  partyId,
  sortedMembers,
  resData,
}: ModifyPartyRecruitmentNumModalProps) {
  const userInfo = userInfoStore((state: any) => state.userInfo);

  const modifyLeaderAccountInfoMutation = useMutation({
    mutationFn: modifyPartyRecruitmentNumInfo,
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
      alert('모집인원이 변경되었습니다.');
      window.location.reload();
    },
    onSettled: () => {},
  });

  const [newRecLimit, setNewRecLimit] = useState<number>(
    resData.party.recLimit
  );
  const maxMemberNum = resData.party.maxMemberNum;
  const openCount = resData.party.recLimit + 1 - sortedMembers.length;
  const currentRecNum = resData.party.currentRecNum;
  const [isClosedArray, setIsClosedArray] = useState<boolean[]>(
    Array(maxMemberNum - sortedMembers.length)
      .fill(true)
      .map((_, index) => index >= openCount)
  );

  const handleToggle = (index: number) => {
    setIsClosedArray((prevIsClosedArray) => {
      const newArray = [...prevIsClosedArray];
      newArray[index] = !newArray[index];
      return newArray;
    });

    setNewRecLimit((prevNewRecLimit) => {
      if (isClosedArray[index]) {
        return prevNewRecLimit + 1; // "닫힘"에서 "열림"으로 변경 시
      } else {
        return prevNewRecLimit - 1; // "열림"에서 "닫힘"으로 변경 시
      }
    });
  };

  const handleCloseModal = () => {
    setOpenModifyPartyRecruitmentNumModal(undefined);
    setNewRecLimit(resData.party.recLimit);
    setIsClosedArray(
      Array(maxMemberNum - sortedMembers.length)
        .fill(true)
        .map((_, index) => index >= openCount)
    );
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Modal
      size='sm'
      show={openModifyPartyRecruitmentNumModal === 'default'}
      onClose={handleCloseModal}
      data-aos='fade-zoom'
      data-aos-duration='300'
    >
      <Modal.Header className='border-none pb-0' />
      <Modal.Body className='flex flex-col gap-y-3 max-h-[27.5rem] pt-0 spacing-y-28'>
        <h1 className='text-xl font-semibold'>모집인원 변경</h1>

        <p className='text-[#656565] text-xs font-light'>
          파티 운영을 위해서는 최소 1명 이상의 파티원이 필요해요.
        </p>

        <div className='flex gap-x-4 mt-6'>
          {sortedMembers.map((member: any, index: number) => (
            <div
              key={index}
              className='relative flex flex-col items-center gap-y-2'
            >
              <Image
                src={
                  member.memberId === resData.party.partyLeaderMemberId
                    ? leaderUserdefaultProfileImg
                    : defaultUserProfileImg
                }
                alt='user image'
                width={62.5}
                height={0}
                quality={100}
                className=''
              />
              {member.memberId === resData.party.partyLeaderMemberId && (
                <LottieCrown />
              )}
              <p className='w-[2rem] flex text-xs justify-center font-semibold'>
                {member.username}
              </p>
              {userInfo.memberId === member.memberId && (
                <p className='w-[1.125rem] h-[1.125rem] text-white bg-[#a9bbfc] rounded-full text-xs flex justify-center items-center'>
                  나
                </p>
              )}
            </div>
          ))}
          {Array.from({ length: maxMemberNum - sortedMembers.length }).map(
            (_, index) => {
              const isOpen = !isClosedArray[index];
              const isDisabled = currentRecNum === 0 && index === 0; // 파티장 바로 다음에 "변경 불가" 버튼 생성
              return (
                <button
                  key={`slot-${index}`}
                  className='flex flex-col items-center gap-y-2'
                  onClick={() => !isDisabled && handleToggle(index)}
                >
                  {isDisabled ? (
                    <>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='32.5'
                        viewBox='0 -960 960 960'
                        width='32.5'
                        fill='#fff'
                        className='w-[62.5px] h-[62.5px] p-[0.9rem] bg-[#9d9d9d] rounded-full cursor-default'
                      >
                        <path d='M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z' />
                      </svg>
                      <p className='w-[2rem] flex justify-center text-xs text-[#9d9d9d] font-medium cursor-default'>
                        변경 불가
                      </p>
                    </>
                  ) : isOpen ? (
                    <>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='32.5'
                        viewBox='0 -960 960 960'
                        width='32.5'
                        fill='#9b9b9b'
                        className='w-[62.5px] h-[62.5px] p-[0.9rem] bg-[#efefef] hover:bg-[#e3e3e3] rounded-full'
                      >
                        <path d='M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h360v-80q0-50-35-85t-85-35q-42 0-73.5 25.5T364-751q-4 14-16.5 22.5T320-720q-17 0-28.5-11t-8.5-26q14-69 69-116t128-47q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM240-160v-400 400Z' />
                      </svg>
                      <p className='w-[2rem] flex justify-center text-xs text-[#9d9d9d] font-medium'>
                        열림
                      </p>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='32.5'
                        viewBox='0 -960 960 960'
                        width='32.5'
                        fill='#9b9b9b'
                        className='w-[62.5px] h-[62.5px] p-[0.9rem] bg-[#efefef] hover:bg-[#e3e3e3] rounded-full'
                      >
                        <path d='M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z' />
                      </svg>
                      <p className='w-[2rem] flex justify-center text-xs text-[#9d9d9d] font-medium'>
                        닫힘
                      </p>
                    </>
                  )}
                </button>
              );
            }
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className='border-none pt-2'>
        <button
          onClick={() => {
            modifyLeaderAccountInfoMutation.mutate({
              partyId,
              newRecLimit,
            });
          }}
          className={`w-full text-white partySelectedPlanInfo.selectedPlanName bg-[#3a8af9] hover:bg-[#1c6cdb] p-[0.825rem] rounded-[0.45rem] font-semibold box-shadow duration-150 ease-out`}
        >
          완료
        </button>
      </Modal.Footer>
    </Modal>
  );
}
