import { Modal } from 'flowbite-react';
import { AddPartyInfoStore } from '@/store/party/AddPartyInfo';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

interface AskInputValidAccountInfoModalProps {
  openAskInputValidAccountInfoModal: string | undefined;
  setOpenAskInputValidAccountInfoModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  accountInfo: {
    id: string;
    password: string;
  };
}

export default function AskInputValidAccountInfoModal({
  openAskInputValidAccountInfoModal,
  setOpenAskInputValidAccountInfoModal,
  accountInfo,
}: AskInputValidAccountInfoModalProps) {
  const updateStepName = AddPartyInfoStore(
    (state: any) => state.updateStepName
  );
  const updateAccountInfo = AddPartyInfoStore(
    (state: any) => state.updateAccountInfo
  );

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Modal
      size='sm'
      show={openAskInputValidAccountInfoModal === 'default'}
      data-aos='fade-zoom'
      data-aos-duration='300'
    >
      <Modal.Body className='flex flex-col gap-y-3 pb-0 spacing-y-28'>
        <p className='text-lg font-bold'>
          🔐 정확한 로그인 정보를 입력하셨나요?
        </p>

        <p className='h-[2.5rem] text-[0.8rem] text-[#727272] font-medium'>
          잘못된 로그인 정보 공유로 인한 책임은 파티장에게 있어요. 현재 입력한
          정보가 맞는지 티빙에서 한번 더 확인해 주세요.
        </p>
      </Modal.Body>
      <Modal.Footer className='border-none'>
        <button
          onClick={() => {
            setOpenAskInputValidAccountInfoModal(undefined);
          }}
          className='w-full text-[#787878] text-[0.8rem] bg-[#efefef] hover:brightness-[96%] duration-150 ease-out p-[0.825rem] rounded-[0.45rem] font-bold'
        >
          다시 입력하기
        </button>
        <button
          onClick={() => {
            updateAccountInfo(accountInfo);
            setOpenAskInputValidAccountInfoModal(undefined);
            updateStepName('selectRecruitmentNum');
          }}
          className='w-full text-white text-[0.8rem] bg-[#3a8af9] hover:bg-[#1c6cdb] duration-150 ease-out p-[0.825rem] rounded-[0.45rem] font-bold'
        >
          확인했어요
        </button>
      </Modal.Footer>
    </Modal>
  );
}
