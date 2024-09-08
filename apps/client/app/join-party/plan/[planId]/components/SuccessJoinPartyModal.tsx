import { Modal } from 'flowbite-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { formatDate } from '@/utils/formatDate';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

interface SuccessJoinPartyModalProps {
  openSuccessJoinParty: string | undefined;
  setOpenSuccessJoinParty: React.Dispatch<React.SetStateAction<number | null>>;
  planName: string;
  partyInfo: any;
}

const LottieCheck = dynamic(() => import('./LottieCheck'), {
  ssr: false,
});

export default function SuccessJoinPartyModal({
  openSuccessJoinParty,
  setOpenSuccessJoinParty,
  planName,
  partyInfo,
}: SuccessJoinPartyModalProps) {
  const router = useRouter();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Modal
      size='md'
      show={openSuccessJoinParty === 'default'}
      onClose={() => setOpenSuccessJoinParty(null)}
      data-aos='fade-zoom'
      data-aos-duration='300'
    >
      <Modal.Body className='flex flex-col gap-y-3 max-h-[27.5rem] spacing-y-28'>
        <div className='flex flex-col items-center text-center text-xl font-semibold'>
          <div className='h-[9rem]'>
            <LottieCheck />
          </div>
          <span className='mt-[-0.5rem] text-[#1c6cdb]'>{planName} </span>
          파티에 가입했어요!
        </div>

        <div className='mt-6 flex flex-col gap-y-2'>
          <div className='bg-[#f6f6f6] p-4 flex justify-between rounded-lg text-xs'>
            <span className='text-[#8b8b8b]'>이용 서비스</span>
            <span className='font-semibold'>{planName}</span>
          </div>

          <div className='bg-[#f6f6f6] p-4 flex justify-between rounded-lg text-xs'>
            <span className='text-[#8b8b8b]'>파티 기간</span>
            <span className='font-semibold'>
              {formatDate(partyInfo.startDate)} ~{' '}
              {formatDate(partyInfo.endDate)} (12개월)
            </span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='border-none pt-10'>
        <button
          onClick={() => {
            setOpenSuccessJoinParty(null);
            router.push(`/my-party/${partyInfo.partyId}`);
          }}
          className='w-full text-white partySelectedPlanInfo.selectedPlanName bg-[#3a8af9] hover:bg-[#1c6cdb] p-[0.825rem] rounded-[0.45rem] font-semibold box-shadow duration-150 ease-out'
        >
          파티 바로가기
        </button>
      </Modal.Footer>
    </Modal>
  );
}
