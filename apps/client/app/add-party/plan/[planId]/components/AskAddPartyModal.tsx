import { Modal } from 'flowbite-react';
import { AddPartyInfoStore } from '@/store/party/AddPartyInfo';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface AskAddPartyModalProps {
  openAskAddPartyModal: string | undefined;
  setOpenAskAddPartyModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setOpenNotifyAddedPartyModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  planId: string;
  partyInfo: any;
}

interface PartyInfoType {
  planId: string;
  leaderId: string;
  leaderPwd: string;
  recLimit: number;
  startDate: Date;
  durationMonth: number;
  endDate: Date;
}

// 파티 생성하기 API
const addParty = (partyInfo: PartyInfoType) => {
  const reqBody = {
    planId: Number(partyInfo.planId),
    leaderId: partyInfo.leaderId,
    leaderPwd: partyInfo.leaderPwd,
    recLimit: partyInfo.recLimit,
    startDate: partyInfo.startDate,
    durationMonth: partyInfo.durationMonth,
    endDate: partyInfo.endDate,
  };
  return axiosInstance.post('/private/party', reqBody);
};

export default function AskAddPartyModal({
  openAskAddPartyModal,
  setOpenAskAddPartyModal,
  setOpenNotifyAddedPartyModal,
  planId,
  partyInfo,
}: AskAddPartyModalProps) {
  const addPartyMutation = useMutation({
    mutationFn: addParty,
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
    onSuccess: (data) => {},
    onSettled: () => {},
  });

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Modal
      size='sm'
      show={openAskAddPartyModal === 'default'}
      data-aos='fade-zoom'
      data-aos-duration='300'
    >
      <Modal.Body className='flex flex-col gap-y-3 pb-0 spacing-y-28'>
        <p className='text-lg font-bold'>파티를 만드시겠어요?</p>

        <p className='h-[2.5rem] text-[0.8rem] text-[#727272] font-medium'>
          동의하신 규칙들이 지켜지지 않을 경우 파티가 자동으로 해체될 수 있으니
          이용에 주의하여 주세요.
        </p>
      </Modal.Body>
      <Modal.Footer className='border-none'>
        <button
          onClick={() => {
            setOpenAskAddPartyModal(undefined);
          }}
          className='w-full text-[#787878] text-[0.8rem] bg-[#efefef] hover:brightness-[96%] duration-150 ease-out p-[0.825rem] rounded-[0.45rem] font-bold box-shadow'
        >
          취소
        </button>
        <button
          onClick={() => {
            addPartyMutation.mutate({
              planId,
              leaderId: partyInfo.accountInfo.id,
              leaderPwd: partyInfo.accountInfo.password,
              recLimit: partyInfo.recruitmentNum,
              startDate: new Date(partyInfo.startDate),
              durationMonth: partyInfo.durationMonth,
              endDate: new Date(partyInfo.endDate),
            });
            setOpenAskAddPartyModal(undefined);
            setOpenNotifyAddedPartyModal('default');
          }}
          className='w-full text-white text-[0.8rem] bg-[#3a8af9] hover:bg-[#1c6cdb] duration-150 ease-out p-[0.825rem] rounded-[0.45rem] font-bold box-shadow'
        >
          파티 만들기
        </button>
      </Modal.Footer>
    </Modal>
  );
}
