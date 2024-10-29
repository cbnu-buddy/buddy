import { Modal } from 'flowbite-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import cleanBotWarningImg from '@/public/images/cleanBotWarning.png';

interface DetectedBadWordGuideModalProps {
  openDetectedBadWordGuideModal: string | undefined;
  setOpenDetectedBadWordGuideModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export default function DetectedBadWordGuideModal({
  openDetectedBadWordGuideModal,
  setOpenDetectedBadWordGuideModal,
}: DetectedBadWordGuideModalProps) {
  const router = useRouter();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Modal
      size='sm'
      show={openDetectedBadWordGuideModal === 'default'}
      onClose={() => setOpenDetectedBadWordGuideModal(undefined)}
      data-aos='fade-zoom'
      data-aos-duration='300'
    >
      <Modal.Header className='border-none pb-0 flex items-center' />
      <Modal.Body className='flex flex-col gap-y-3 max-h-[27.5rem] spacing-y-28 pb-0'>
        <div className='flex flex-col items-center text-center text-xl font-semibold'>
          <div className='h-[4.5rem]'>
            <Image
              src={cleanBotWarningImg}
              alt='clean bot warning icon image'
              width={65}
              height={65}
              quality={100}
            />
          </div>
          <span className='mt-[-0.5rem]'>
            <span className='text-[#dd6529]'>상처 주는 표현이 포함</span>
            <br />
            <span>되어 있습니다.</span>
          </span>
        </div>

        <span className='text-center text-[0.8rem] mt-1 text-[#7e7e7e]'>
          클린봇 탐지결과 부적절한 표현이 감지됩니다.
        </span>
      </Modal.Body>
      <Modal.Footer className='border-none'>
        <button
          onClick={() => {
            setOpenDetectedBadWordGuideModal(undefined);
          }}
          className='w-full text-white partySelectedPlanInfo.selectedPlanName bg-[#2d3339] hover:bg-[#23292f] p-[0.825rem] rounded-[0.45rem] font-semibold box-shadow duration-150 ease-out'
        >
          확인
        </button>
      </Modal.Footer>
    </Modal>
  );
}
