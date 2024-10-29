import { Modal } from 'flowbite-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import cleanBotAngryImg from '@/public/images/cleanBotAngry.png';

interface RestrictGuideModalProps {
  openRestrictGuideModal: string | undefined;
  setOpenRestrictGuideModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export default function RestrictGuideModal({
  openRestrictGuideModal,
  setOpenRestrictGuideModal,
}: RestrictGuideModalProps) {
  const router = useRouter();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Modal
      size='sm'
      show={openRestrictGuideModal === 'default'}
      onClose={() => setOpenRestrictGuideModal(undefined)}
      data-aos='fade-zoom'
      data-aos-duration='300'
    >
      <Modal.Header className='border-none pb-0 flex items-center' />
      <Modal.Body className='flex flex-col gap-y-3 max-h-[27.5rem] spacing-y-28 pb-0'>
        <div className='flex flex-col items-center text-center text-xl font-semibold'>
          <div className='h-[4.5rem]'>
            <Image
              src={cleanBotAngryImg}
              alt='clean bot angry icon image'
              width={65}
              height={65}
              quality={100}
            />
          </div>
          <span className='mt-[-0.5rem]'>
            <span className='text-[#de3a3a]'>부적절한 표현의 등록이</span>
            <br />
            <span className='text-[#de3a3a]'>&apos;반복 시도&apos;</span>
            <span>되어 24시간 동안</span>
            <br />
            서비스 이용이 제한됩니다.
          </span>
        </div>

        <span className='text-center text-[0.8rem] mt-1 text-[#7e7e7e]'>
          제한 기간이 종료되면 다시 이용이 가능합니다.
        </span>

        <div className='mt-4 flex flex-col gap-y-2'>
          <div className='bg-[#f6f6f6] p-4 flex justify-between rounded-lg text-xs'>
            <span className='text-[#8b8b8b]'>제한시작일시</span>
            <span className='font-semibold'>2024.10.15. 15:29</span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='border-none'>
        <button
          onClick={() => {
            setOpenRestrictGuideModal(undefined);
          }}
          className='w-full text-white partySelectedPlanInfo.selectedPlanName bg-[#2d3339] hover:bg-[#23292f] p-[0.825rem] rounded-[0.45rem] font-semibold box-shadow duration-150 ease-out'
        >
          확인
        </button>
      </Modal.Footer>
    </Modal>
  );
}
