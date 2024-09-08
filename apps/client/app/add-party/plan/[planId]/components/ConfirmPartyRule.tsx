import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AddPartyInfoStore } from '@/store/party/AddPartyInfo';
import AskAddPartyModal from './AskAddPartyModal';
import NotifyAddedPartyModal from './NotifyAddedPartyModal';
import { AddPartyDetailProps } from '../page';

interface ConfirmPartyRuleProps {
  resData: AddPartyDetailProps;
  planId: string;
}

export default function ConfirmPartyRule({
  resData,
  planId,
}: ConfirmPartyRuleProps) {
  const partyInfo = AddPartyInfoStore((state: any) => state.partyInfo);

  const [isRulesAgreed, setIsRulesAgreed] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [openAskAddPartyModal, setOpenAskAddPartyModal] = useState<
    string | undefined
  >();
  const [openNotifyAddedPartyModal, setOpenNotifyAddedPartyModal] = useState<
    string | undefined
  >();

  const toggleRuleAgreement = (index: number) => {
    const updatedRulesAgreed = [...isRulesAgreed];
    updatedRulesAgreed[index] = !updatedRulesAgreed[index];
    setIsRulesAgreed(updatedRulesAgreed);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className='w-[25rem]'>
      <p
        className='text-[1.35rem] leading-[1.55] font-semibold'
        data-aos='fade-zoom'
        data-aos-easing='ease-out'
        data-aos-duration='1500'
      >
        마지막 단계예요. <br />
        파티 규칙을 확인해 보세요.
      </p>
      <div className='mt-8 flex flex-col text-[0.5rem] leading-[1] font-extralight text-[#656565]'>
        <button onClick={() => toggleRuleAgreement(0)}>
          <div
            className={`flex items-center gap-x-3 px-3 py-4 rounded-lg ${
              isRulesAgreed[0]
                ? 'fill-[#1c6cdb] text-[#1c6cdb]'
                : 'fill-[#787778] text-[#656565]'
            } hover:fill-[#1c6cdb] hover:bg-[#eaf3fe] hover:text-[#1c6cdb] duration-100 ease-out`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 -960 960 960'
              width='24px'
              className='fill-inherit'
            >
              <path d='m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z' />
            </svg>
            <span className='text-inherit text-left text-[0.8rem] leading-[1.25] font-medium'>
              {resData?.name}의 로그인 정보를 정확하게 입력/관리하겠습니다.
            </span>
          </div>

          {!isRulesAgreed[0] && (
            <div className='duration-300 ease-out mt-[0.375rem] flex flex-col items-start p-3 tAddPartyDetailPropsext-left text-[0.5rem] text-[#8b8b8b] border border-[#e3e3e3] rounded-lg font-normal'>
              <p className='text-inherit leading-[1.25]'>
                - 아이디 : {partyInfo.accountInfo.id}
              </p>
              <p className='mt-[0.3rem] text-inherit leading-[1.25]'>
                - 비밀번호 : {partyInfo.accountInfo.password}
              </p>
              <p className='mt-[0.3rem] text-inherit leading-[1.25]'>
                - 잘못된 로그인 정보를 입력하는 경우 위약금이 발생할 수
                있습니다.
              </p>
              <p className='mt-[0.3rem] text-inherit leading-[1.25]'>
                - 파티원 변동시 동시 접속 인원 관리를 위해 비밀번호를 변경해야
                합니다.
              </p>
            </div>
          )}
        </button>

        <button className='mt-2' onClick={() => toggleRuleAgreement(1)}>
          <div
            className={`${
              !isRulesAgreed[1] && 'mt-2'
            } flex items-center gap-x-3 px-3 py-4 rounded-lg ${
              isRulesAgreed[1]
                ? 'fill-[#1c6cdb] text-[#1c6cdb]'
                : 'fill-[#787778] text-[#656565]'
            } hover:fill-[#1c6cdb] hover:bg-[#eaf3fe] hover:text-[#1c6cdb] duration-100 ease-out`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 -960 960 960'
              width='24px'
              className='fill-inherit'
            >
              <path d='m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z' />
            </svg>
            <span className='text-inherit text-left text-[0.8rem] leading-[1.25] font-medium'>
              성인 인증을 완료했으며, 공유해도 안전한 로그인 정보입니다.
            </span>
          </div>
          {!isRulesAgreed[1] && (
            <div className='mt-[0.375rem] flex flex-col items-start p-3 text-left text-[0.5rem] text-[#8b8b8b] border border-[#e3e3e3] rounded-lg font-normal'>
              <p className='text-inherit leading-[1.25]'>
                - 파티원의 서비스 이용에 불편함이 없도록 성인 인증이 완료된
                로그인 계정을 공유해야 합니다.
              </p>
              <p className='mt-[0.3rem] text-inherit leading-[1.25]'>
                - 개인 정보 침해를 대비, 소셜 로그인 계정 및 타 서비스와의 통합
                계정 사용은 지양해 주세요.
              </p>
            </div>
          )}
        </button>

        <button className='mt-2' onClick={() => toggleRuleAgreement(2)}>
          <div
            className={`${
              !isRulesAgreed[2] && 'mt-2'
            } flex items-center gap-x-3 px-3 py-4 rounded-lg ${
              isRulesAgreed[2]
                ? 'fill-[#1c6cdb] text-[#1c6cdb]'
                : 'fill-[#787778] text-[#656565]'
            } hover:fill-[#1c6cdb] hover:bg-[#eaf3fe] hover:text-[#1c6cdb] duration-100 ease-out`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 -960 960 960'
              width='24px'
              className='fill-inherit'
            >
              <path d='m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z' />
            </svg>
            <span className='text-inherit text-left text-[0.8rem] leading-[1.25] font-medium'>
              파티 기간은{' '}
              {partyInfo.startDate.split('-').join('.') +
                '~' +
                partyInfo.endDate.split('-').join('.')}{' '}
              약 {partyInfo.durationMonth}개월입니다.
            </span>
          </div>
          {!isRulesAgreed[2] && (
            <div className='mt-[0.375rem] flex flex-col items-start p-3 text-left text-[0.5rem] text-[#8b8b8b] border border-[#e3e3e3] rounded-lg font-normal'>
              <p className='text-inherit leading-[1.25]'>
                - 파티 기간은 파티원과의 약속으로 파티 시작 이후 변경할 수
                없습니다. 파티 기간에 따라 위약금이 달라지고, 파티 중간에 파티를
                해산할 경우 이는 파티장의 귀책사유이므로, 해산일을 기준으로 파티
                요금을 일할 정산/적립하지 않습니다.
              </p>
            </div>
          )}
        </button>

        <button className='mt-2' onClick={() => toggleRuleAgreement(3)}>
          <div
            className={`${
              !isRulesAgreed[3] && 'mt-2'
            } flex items-center gap-x-3 px-3 py-4 rounded-lg ${
              isRulesAgreed[3]
                ? 'fill-[#1c6cdb] text-[#1c6cdb]'
                : 'fill-[#787778] text-[#656565]'
            } hover:fill-[#1c6cdb] hover:bg-[#eaf3fe] hover:text-[#1c6cdb] duration-100 ease-out`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 -960 960 960'
              width='24px'
              className='fill-inherit'
            >
              <path d='m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z' />
            </svg>
            <span className='text-inherit text-left text-[0.8rem] leading-[1.25] font-medium'>
              매달 1일에 최대 {resData?.monthlyFee.toLocaleString()}
              원의 파티 요금이 적립될 예정입니다.
            </span>
          </div>
          {!isRulesAgreed[3] && (
            <div className='mt-[0.375rem] flex flex-col items-start p-3 text-left text-[0.5rem] text-[#8b8b8b] border border-[#e3e3e3] rounded-lg font-normal'>
              <p className='text-inherit leading-[1.25]'>
                파티원 {1}명을 모두 모집할 경우, 매달{' '}
                {resData?.monthlyFee.toLocaleString()}
                원의 파티 요금이 매달 버디 정산일(1일)에 적립됩니다.
              </p>
            </div>
          )}
        </button>

        <button className='mt-2' onClick={() => toggleRuleAgreement(4)}>
          <div
            className={`${
              !isRulesAgreed[4] && 'mt-2'
            } flex items-center gap-x-3 px-3 py-4 rounded-lg ${
              isRulesAgreed[4]
                ? 'fill-[#1c6cdb] text-[#1c6cdb]'
                : 'fill-[#787778] text-[#656565]'
            } hover:fill-[#1c6cdb] hover:bg-[#eaf3fe] hover:text-[#1c6cdb] duration-100 ease-out`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 -960 960 960'
              width='24px'
              className='fill-inherit'
            >
              <path d='m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z' />
            </svg>
            <span className='text-inherit text-left text-[0.8rem] leading-[1.25] font-medium'>
              파티장 귀책 시 최대 10,800원의 위약금이 부과될 수 있습니다.
            </span>
          </div>
          {!isRulesAgreed[4] && (
            <div className='mt-[0.375rem] flex flex-col items-start p-3 text-left text-[0.5rem] text-[#8b8b8b] border border-[#e3e3e3] rounded-lg font-normal'>
              <p className='text-inherit leading-[1.25]'>
                위약금은 파티장 귀책 사유 발생 시 등록한 결제 수단을 통해 자동
                부과되며, 위약금 정책에 동의하지 않을 경우 파티를 만들 수
                없습니다. (파티장 귀책 사유: 파티 중도 해산, 로그인 정보 오류,
                서비스 이용권 미결제, 성인 인증 미이행, 파티원 초대/등록 지연
                등)
              </p>
            </div>
          )}
        </button>
      </div>

      <button
        disabled={
          isRulesAgreed[0] &&
          isRulesAgreed[1] &&
          isRulesAgreed[2] &&
          isRulesAgreed[3] &&
          isRulesAgreed[4]
            ? false
            : true
        }
        className={`w-full mt-10 h-13 p-4 text-[0.8rem] leading-[1] border-transparent ${
          isRulesAgreed[0] &&
          isRulesAgreed[1] &&
          isRulesAgreed[2] &&
          isRulesAgreed[3] &&
          isRulesAgreed[4]
            ? 'bg-[#3a8af9] hover:bg-[#1c6cdb]'
            : 'bg-[#d3d3d3]'
        } placeholder-[#8b8b8b] rounded-lg text-white text-sm font-bold duration-150 ease-out`}
        onClick={() => {
          setOpenAskAddPartyModal('default');
        }}
      >
        파티 만들기
      </button>
      {openAskAddPartyModal && (
        <AskAddPartyModal
          openAskAddPartyModal={openAskAddPartyModal}
          setOpenAskAddPartyModal={setOpenAskAddPartyModal}
          setOpenNotifyAddedPartyModal={setOpenNotifyAddedPartyModal}
          planId={planId}
          partyInfo={partyInfo}
        />
      )}
      {openNotifyAddedPartyModal && (
        <NotifyAddedPartyModal
          openNotifyAddedPartyModal={openNotifyAddedPartyModal}
          setOpenNotifyAddedPartyModal={setOpenNotifyAddedPartyModal}
          resData={resData}
        />
      )}
    </div>
  );
}
