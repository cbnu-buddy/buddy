import { Modal } from 'flowbite-react';
import { PartySelectedPlanInfoStore } from '@/store/party/PartySelectedPlanInfo';
import { PartySelectedPlanInfo } from '@/types/partySelectedPlan';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { partySelectedPlanInfos } from '@/data/partySelectedPlanInfos';
import Image from 'next/image';

interface LinkedServicesModalProps {
  openLinkedServicesModal: string | undefined;
  setOpenLinkedServicesModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  selectedServices: number[];
  setSelectedServices: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function LinkedServicesModal({
  openLinkedServicesModal,
  setOpenLinkedServicesModal,
  selectedServices,
  setSelectedServices,
}: LinkedServicesModalProps) {
  const [selectedServicesTemp, setSelectedServicesTemp] =
    useState<number[]>(selectedServices);

  console.log(selectedServicesTemp);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleButtonClick = (idx: number) => {
    const serviceId = idx + 1;

    if (selectedServicesTemp.includes(serviceId)) {
      // 이미 선택된 경우 -> 선택 해제
      setSelectedServicesTemp(
        selectedServicesTemp.filter((id) => id !== serviceId)
      );
    } else {
      // 선택되지 않은 경우 -> 선택
      setSelectedServicesTemp([...selectedServicesTemp, serviceId]);
    }
  };

  return (
    <Modal
      size='xl'
      show={openLinkedServicesModal === 'default'}
      onClose={() => setOpenLinkedServicesModal(undefined)}
      data-aos='fade-zoom'
      data-aos-duration='300'
    >
      <Modal.Header className='border-none pb-0' />
      <Modal.Body className='flex flex-col gap-y-3 max-h-[27.5rem] pt-0 spacing-y-28'>
        <h1 className='text-xl font-semibold'>연결할 서비스 선택</h1>

        <p className='text-[#838383] text-[0.8rem] leading-[1.25] font-light'>
          게시글에 연결할 서비스들을 선택해 주세요.
        </p>

        <div className='mt-4 grid grid-cols-4 gap-2 justify-items-center'>
          {partySelectedPlanInfos.map(
            (partySelectedPlanInfo: PartySelectedPlanInfo, idx) => (
              <button
                key={idx}
                className='relative flex flex-col items-center p-2 bg-white rounded-lg w-fit group'
                onClick={() => handleButtonClick(idx)}
              >
                <Image
                  src={partySelectedPlanInfo.iconImg}
                  alt={partySelectedPlanInfo.iconImgAlt}
                  width={85}
                  height={85} // Image 크기 조정
                  quality={100}
                  className='group-hover:scale-105 duration-300 ease-out'
                />
                <p className='mt-3'>{partySelectedPlanInfo.name}</p>

                {/* SVG 이미지가 조건에 따라 표시되도록 */}
                {selectedServicesTemp.includes(idx + 1) && (
                  <svg
                    className='absolute group-hover:scale-105 duration-300 ease-out' // Image와 동일한 위치에 오도록 설정
                    width='85' // SVG 크기를 Image와 동일하게 설정
                    height='85'
                    viewBox='0 0 64 64'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle
                      cx='32'
                      cy='32'
                      r='32'
                      fill='#0064FF'
                      opacity='0.7'
                    />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M41.9973 24.5907C42.8689 25.3983 42.8933 26.7311 42.0517 27.5676L30.1898 39.357C29.7607 39.7835 29.1641 40.0166 28.5466 39.9991C27.9291 39.9815 27.3479 39.7149 26.9459 39.2648L21.8622 33.5734C21.0737 32.6906 21.1802 31.3615 22.1001 30.6048C23.0201 29.8482 24.405 29.9504 25.1936 30.8332L28.7081 34.7679L38.8952 24.643C39.7368 23.8065 41.1257 23.7831 41.9973 24.5907Z'
                      fill='#EFEFEF'
                    />
                  </svg>
                )}
              </button>
            )
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className='border-none'>
        <button
          disabled={selectedServicesTemp.length === 0 ? true : false}
          onClick={() => {
            setOpenLinkedServicesModal(undefined);
            setSelectedServices(selectedServicesTemp);
          }}
          className={`w-full text-white
          ${
            selectedServicesTemp.length === 0
              ? 'bg-[#d3d3d3]'
              : 'bg-[#3a8af9] focus:bg-[#1c6cdb] hover:bg-[#1c6cdb]'
          } p-[0.825rem] rounded-[0.45rem] font-semibold box-shadow duration-150 ease-out`}
        >
          선택 완료
          {selectedServicesTemp.length !== 0 &&
            ` (${selectedServicesTemp.length})`}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
