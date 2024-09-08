import { PartySelectedPlanInfoStore } from '@/store/party/PartySelectedPlanInfo';
import { PartySelectedPlanInfo } from '@/types/partySelectedPlan';
import { Modal } from 'flowbite-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SelectMembershipPlanModalProps {
  openSelectMembershipPlanModal: string | undefined;
  setOpenSelectMembershipPlanModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export default function SelectMembershipPlanModal({
  openSelectMembershipPlanModal,
  setOpenSelectMembershipPlanModal,
}: SelectMembershipPlanModalProps) {
  const partySelectedPlanInfo: PartySelectedPlanInfo =
    PartySelectedPlanInfoStore((state: any) => state.partySelectedPlanInfo);
  const updateSelectedPlanId = PartySelectedPlanInfoStore(
    (state: any) => state.updateSelectedPlanId
  );
  const updateSelectedPlanName = PartySelectedPlanInfoStore(
    (state: any) => state.updateSelectedPlanName
  );

  const router = useRouter();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Modal
      size='lg'
      show={openSelectMembershipPlanModal === 'default'}
      onClose={() => setOpenSelectMembershipPlanModal(undefined)}
      data-aos='fade-zoom'
      data-aos-duration='300'
    >
      <Modal.Header className='border-none pb-0' />
      <Modal.Body className='flex flex-col gap-y-3 max-h-[27.5rem] pt-0 spacing-y-28'>
        <h1 className='text-xl font-semibold'>요금제 선택</h1>

        <p className='text-[#838383] text-[0.8rem] leading-[1.25] font-light'>
          {partySelectedPlanInfo.planDetailInfos.length === 1 ? (
            <>
              <span className='text-inherit underline underline-offset-2'>
                {partySelectedPlanInfo.planDetailInfos[0].name}
              </span>{' '}
              요금제만 공유할 수 있어요.
            </>
          ) : (
            <>공유할 요금제를 선택해 주세요.</>
          )}
        </p>

        <div className='flex flex-col gap-y-[0.625rem] mt-4'>
          {partySelectedPlanInfo.planDetailInfos.map((planDetailInfo, idx) => (
            <button
              key={idx}
              className={`p-4 border-[1.5px] text-left ${
                partySelectedPlanInfo.selectedPlanName === planDetailInfo.name
                  ? 'border-[#3a8af9] text-[#3a8af9]'
                  : 'border-[#d4d5d7]'
              }  hover:border-[#3a8af9] text-[#d4d5d7] rounded-lg duration-150`}
              onClick={() => {
                updateSelectedPlanId(planDetailInfo.id);
                updateSelectedPlanName(planDetailInfo.name);
              }}
            >
              <p className='flex items-center gap-x-[0.375rem] text-inherit'>
                {partySelectedPlanInfo.selectedPlanName ===
                  planDetailInfo.name && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='22.5'
                    viewBox='0 -960 960 960'
                    width='22.5'
                    fill={
                      partySelectedPlanInfo.selectedPlanName ===
                      planDetailInfo.name
                        ? '#3a8af9'
                        : '#d4d5d7'
                    }
                    className='duration-300'
                  >
                    <path d='m382-354 339-339q12-12 28.5-12t28.5 12q12 12 12 28.5T778-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z' />
                  </svg>
                )}

                <span
                  className={`text-[0.9rem] ${
                    partySelectedPlanInfo.selectedPlanName ===
                    planDetailInfo.name
                      ? 'text-[#3a8af9]'
                      : 'text-[#]'
                  } leading-[1.25] font-semibold duration-300`}
                >
                  {planDetailInfo.name}
                </span>
              </p>
            </button>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className='border-none'>
        <button
          disabled={partySelectedPlanInfo.selectedPlanName ? false : true}
          onClick={() => {
            setOpenSelectMembershipPlanModal(undefined);
            router.push(
              `/join-party/plan/${partySelectedPlanInfo.selectedPlanId}`
            );
          }}
          className={`w-full text-white
          ${
            partySelectedPlanInfo.selectedPlanName
              ? 'bg-[#3a8af9] focus:bg-[#1c6cdb] hover:bg-[#1c6cdb]'
              : 'bg-[#d3d3d3]'
          } p-[0.825rem] rounded-[0.45rem] font-semibold box-shadow`}
        >
          다음
        </button>
      </Modal.Footer>
    </Modal>
  );
}
