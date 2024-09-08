import { Modal } from 'flowbite-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { formatDate } from '@/utils/formatDate';
import axiosInstance from '@/utils/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface JoinPartyModalProps {
  openJoinPartyModal: string | undefined;
  setOpenJoinPartyModal: React.Dispatch<React.SetStateAction<number | null>>;
  planName: string;
  partyInfo: any;
  setOpenSuccessJoinParty: React.Dispatch<React.SetStateAction<number | null>>;
  index: number;
}

// 파티 가입하기 API
const addParty = (partyId: string) => {
  return axiosInstance.post(`/private/party/${partyId}/join`);
};

export default function JoinPartyModal({
  openJoinPartyModal,
  setOpenJoinPartyModal,
  planName,
  partyInfo,
  setOpenSuccessJoinParty,
  index,
}: JoinPartyModalProps) {
  const joinPartyMutation = useMutation({
    mutationFn: addParty,
    onMutate: () => {},
    onError: (error: AxiosError) => {
      const resData: any = error.response;
      switch (resData?.status) {
        case 409:
          switch (resData?.data.error.status) {
            case 'CONFLICT':
              alert('이미 가입한 파티입니다.');
              setOpenJoinPartyModal(null);
              break;
            default:
              alert('정의되지 않은 http code입니다.');
          }
          break;
        default:
          alert('정의되지 않은 http status code입니다');
      }
    },
    onSuccess: (data) => {
      setOpenJoinPartyModal(null);
      setOpenSuccessJoinParty(index);
    },
    onSettled: () => {},
  });

  useEffect(() => {
    AOS.init();
  }, []);

  const calculateDaysUntilStart = (startDate: string) => {
    const today = new Date();
    const start = new Date(startDate);
    const differenceInTime = start.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  const daysUntilStart = calculateDaysUntilStart(partyInfo.startDate);

  return (
    <Modal
      size='md'
      show={openJoinPartyModal === 'default'}
      onClose={() => setOpenJoinPartyModal(null)}
      data-aos='fade-zoom'
      data-aos-duration='300'
    >
      <Modal.Header className='border-none pb-0' />
      <Modal.Body className='flex flex-col gap-y-3 max-h-[27.5rem] pt-0 spacing-y-28'>
        <h1 className='text-xl font-semibold'>
          파티 가입하고{' '}
          {daysUntilStart === 0 ? '오늘부터' : `${daysUntilStart}일 뒤부터`}{' '}
          <br />
          <span className='text-[#1c6cdb]'>{planName}</span>을 이용해 보세요.
        </h1>

        <div className='mt-6 flex flex-col gap-y-2'>
          <div className='bg-[#f6f6f6] p-4 flex justify-between rounded-lg text-xs'>
            <span className='text-[#8b8b8b]'>이용 서비스</span>
            <span className='font-semibold'>{planName}</span>
          </div>

          <div className='bg-[#f6f6f6] p-4 flex justify-between rounded-lg text-xs'>
            <span className='text-[#8b8b8b]'>파티 기간</span>
            <span className='font-semibold'>
              {formatDate(partyInfo.startDate)} ~{' '}
              {formatDate(partyInfo.endDate)}
            </span>
          </div>
        </div>

        <div className='mt-6'>
          <p className='font-semibold'>파티 요금</p>
          <div className='mt-6 py-4 text-xs flex justify-between items-center border-b'>
            <div>
              <span className='font-light'>파티 분담금</span>
              <span className='text-[#8b8b8b] font-light text-[0.5rem]'>
                {' '}
                (월)
              </span>
            </div>
            <div className='text-sm font-semibold'>
              {partyInfo.individualMonthlyFee.toLocaleString()}원
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='border-none pt-0'>
        <button
          onClick={() => {
            joinPartyMutation.mutate(partyInfo.partyId);
          }}
          className='w-full text-white partySelectedPlanInfo.selectedPlanName bg-[#3a8af9] focus:bg-[#1c6cdb] hover:bg-[#1c6cdb] p-[0.825rem] rounded-[0.45rem] font-semibold box-shadow duration-150 ease-out'
        >
          파티 가입하기
        </button>
      </Modal.Footer>
    </Modal>
  );
}
