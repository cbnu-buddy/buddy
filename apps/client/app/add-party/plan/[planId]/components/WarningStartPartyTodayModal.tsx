import { Modal } from 'flowbite-react';
import { AddPartyInfoStore } from '@/store/party/AddPartyInfo';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

interface WarningStartPartyTodayModalProps {
  openWarningStartPartyTodayModal: string | undefined;
  setOpenWarningStartPartyTodayModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export default function WarningStartPartyTodayModal({
  openWarningStartPartyTodayModal,
  setOpenWarningStartPartyTodayModal,
}: WarningStartPartyTodayModalProps) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Modal
      size='sm'
      show={openWarningStartPartyTodayModal === 'default'}
      data-aos='fade-zoom'
      data-aos-duration='300'
    >
      <Modal.Body className='flex flex-col gap-y-3 pb-0 spacing-y-28'>
        <p className='text-lg font-bold'>오늘부터 파티를 시작하실 건가요?</p>

        <p className='h-[4rem] text-[0.8rem] text-[#727272] font-medium'>
          오늘부터 즉시 파티를 시작하려면 현재 선택한 서비스의 요금제를 이용
          중이어야 하며, 이용 중이 아닐 시 불이익이 발생할 수 있습니다.
        </p>
      </Modal.Body>
      <Modal.Footer className='border-none'>
        <button
          onClick={() => {
            setOpenWarningStartPartyTodayModal(undefined);
          }}
          className='w-full text-white text-[0.8rem] bg-[#3a8af9] hover:bg-[#1c6cdb] duration-150 ease-out p-[0.825rem] rounded-[0.45rem] font-bold box-shadow'
        >
          확인
        </button>
      </Modal.Footer>
    </Modal>
  );
}
