import { Modal } from 'flowbite-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface ModifyLeaderAccountInfoModalProps {
  openModifyLeaderAccountInfoModal: string | undefined;
  setOpenModifyLeaderAccountInfoModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  partyId: string;
}

interface AccountInfo {
  id: string;
  password: string;
}

// 파티 로그인 정보 변경 API
const modifyLeaderAccountInfo = ({
  partyId,
  accountInfo,
}: {
  partyId: string;
  accountInfo: AccountInfo;
}) => {
  const reqBody = {
    newLeaderId: accountInfo.id,
    newLeaderPwd: accountInfo.password,
  };
  return axiosInstance.patch(`/private/party/${partyId}/account`, reqBody);
};

export default function ModifyLeaderAccountInfoModal({
  openModifyLeaderAccountInfoModal,
  setOpenModifyLeaderAccountInfoModal,
  partyId,
}: ModifyLeaderAccountInfoModalProps) {
  const modifyLeaderAccountInfoMutation = useMutation({
    mutationFn: modifyLeaderAccountInfo,
    onMutate: () => {},
    onError: (error: AxiosError) => {
      const resData: any = error.response;
      switch (resData?.status) {
        case 409:
          switch (resData?.data.error.status) {
            // case 'CONFLICT':
            //   alert('이미 가입한 파티입니다.');
            //   break;
            default:
              alert('정의되지 않은 http code입니다.');
          }
          break;
        default:
          alert('정의되지 않은 http status code입니다');
      }
    },
    onSuccess: (data) => {
      alert('로그인 정보가 변경되었습니다.');
      window.location.reload();
    },
    onSettled: () => {},
  });

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [ispasswordVisibility, setIspasswordVisibility] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isRepeatpasswordVisibility, setIsRepeatpasswordVisibility] =
    useState(false);

  const [isIdValidFail, setIsIdValidFail] = useState(false);
  const [isPasswordValidFail, setIsPasswordValidFail] = useState(false);
  const [isRepeatPasswordValidFail, setIsRepeatPasswordValidFail] =
    useState(false);

  const handleRepeatPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatPassword(e.target.value);
    if (password === e.target.value) {
      setIsRepeatPasswordValidFail(false);
      return;
    }

    setIsRepeatPasswordValidFail(true);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Modal
      size='md'
      show={openModifyLeaderAccountInfoModal === 'default'}
      onClose={() => setOpenModifyLeaderAccountInfoModal(undefined)}
      data-aos='fade-zoom'
      data-aos-duration='300'
    >
      <Modal.Header className='border-none pb-0' />
      <Modal.Body className='flex flex-col gap-y-3 max-h-[27.5rem] pt-0 spacing-y-28'>
        <h1 className='text-xl font-semibold'>🔐 로그인 정보 변경</h1>

        <p className='text-[#656565] text-xs font-light'>
          정확한 로그인 정보를 입력해 주세요. 문제 발생시 해당 계정이 유효한지
          확인하기 위해 사용될 거예요.
        </p>

        <div className='flex flex-col gap-y-[0.6rem] mt-2'>
          <div className='relative'>
            <input
              type='text'
              value={id}
              placeholder='아이디'
              onChange={(e) => setId(e.target.value)}
              className='w-full h-13 p-4 pr-[2.5rem] text-[0.8rem] leading-[1] font-medium border-transparent bg-[#f5f5f5] placeholder-[#8b8b8b] rounded-lg duration-300 ease-out border-2 focus:border-[#3a8af9] focus:ring-0'
            />
            {id && (
              <button
                className='absolute top-[0.7rem] right-3 p-1'
                onClick={(e) => {
                  e.preventDefault();
                  setId('');
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='25'
                  viewBox='0 -960 960 960'
                  width='25'
                  fill='#a2a4a9'
                >
                  <path d='M480-437.847 277.076-234.924q-8.307 8.308-20.884 8.5-12.576.193-21.268-8.5-8.693-8.692-8.693-21.076t8.693-21.076L437.847-480 234.924-682.924q-8.308-8.307-8.5-20.884-.193-12.576 8.5-21.268 8.692-8.693 21.076-8.693t21.076 8.693L480-522.153l202.924-202.923q8.307-8.308 20.884-8.5 12.576-.193 21.268 8.5 8.693 8.692 8.693 21.076t-8.693 21.076L522.153-480l202.923 202.924q8.308 8.307 8.5 20.884.193 12.576-8.5 21.268-8.692 8.693-21.076 8.693t-21.076-8.693L480-437.847Z' />
                </svg>
              </button>
            )}
          </div>

          <div className='relative'>
            <input
              type={ispasswordVisibility ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='비밀번호'
              className='w-full h-13 p-4 text-[0.8rem] leading-[1] font-medium border-transparent bg-[#f5f5f5] placeholder-[#8b8b8b] rounded-lg duration-300 ease-out border-2 focus:border-[#3a8af9] focus:ring-0'
            />
            {password && (
              <button
                className='absolute top-[0.7rem] right-3 p-1'
                onClick={(e) => {
                  e.preventDefault();
                  setIspasswordVisibility((prev) => !prev);
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='22'
                  viewBox='0 -960 960 960'
                  width='22'
                  fill='#a2a4a9'
                >
                  {ispasswordVisibility ? (
                    <path d='M480.091-336.924q67.985 0 115.485-47.59 47.5-47.591 47.5-115.577 0-67.985-47.59-115.485-47.591-47.5-115.577-47.5-67.985 0-115.485 47.59-47.5 47.591-47.5 115.577 0 67.985 47.59 115.485 47.591 47.5 115.577 47.5ZM480-392q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm.055 171.999q-137.977 0-251.439-76.115Q115.155-372.231 61.54-500q53.615-127.769 167.022-203.884 113.406-76.115 251.383-76.115t251.439 76.115Q844.845-627.769 898.46-500q-53.615 127.769-167.022 203.884-113.406 76.115-251.383 76.115ZM480-500Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z' />
                  ) : (
                    <path d='M630.922-441.078 586-486q9-49.693-28.346-89.346Q520.307-615 466-606l-44.922-44.922q13.538-6.077 27.769-9.115 14.23-3.039 31.153-3.039 68.076 0 115.576 47.5T643.076-500q0 16.923-3.039 31.538-3.038 14.615-9.115 27.384Zm127.231 124.462L714-358q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-46.614-46.614q37.923-15.077 77.461-22.231 39.538-7.154 81.153-7.154 140.615 0 253.614 77.538 113 77.539 164.846 202.461-22.231 53.615-57.423 100.076-35.192 46.461-82.884 83.308Zm32.308 231.383L628.616-245.848q-30.769 11.385-68.192 18.616Q523-220.001 480-220.001q-140.999 0-253.614-77.538Q113.771-375.078 61.54-500q22.154-53 57.231-98.885 35.077-45.884 77.231-79.576l-110.77-112 42.154-42.153 705.228 705.228-42.153 42.153ZM238.155-636.309q-31.692 25.231-61.654 60.655Q146.539-540.231 128-500q50 101 143.5 160.5T480-280q27.308 0 54.386-4.616 27.077-4.615 45.923-9.538l-50.616-51.847q-10.231 4.153-23.693 6.615-13.461 2.462-26 2.462-68.076 0-115.576-47.5T316.924-500q0-12.154 2.462-25.423 2.462-13.27 6.615-24.27l-87.846-86.616ZM541-531Zm-131.768 65.769Z' />
                  )}
                </svg>
              </button>
            )}
          </div>

          <div className='relative'>
            <input
              required
              type={isRepeatpasswordVisibility ? 'text' : 'password'}
              value={repeatPassword}
              onChange={handleRepeatPasswordChange}
              placeholder='비밀번호 확인'
              className={`w-full h-13 p-4 text-[0.8rem] leading-[1] font-medium bg-[#f5f5f5] placeholder-[#8b8b8b] rounded-lg duration-300 ease-out ${
                isRepeatPasswordValidFail
                  ? 'border-1 border-red-500 focus:border-red-500'
                  : 'border-2 border-transparent focus:border-[#3a8af9]'
              } focus:ring-0`}
            />
            {repeatPassword && (
              <button
                className='absolute top-[0.7rem] right-3 p-1'
                onClick={(e) => {
                  e.preventDefault();
                  setIsRepeatpasswordVisibility((prev) => !prev);
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='22'
                  viewBox='0 -960 960 960'
                  width='22'
                  fill='#a2a4a9'
                >
                  {isRepeatpasswordVisibility ? (
                    <path d='M480.091-336.924q67.985 0 115.485-47.59 47.5-47.591 47.5-115.577 0-67.985-47.59-115.485-47.591-47.5-115.577-47.5-67.985 0-115.485 47.59-47.5 47.591-47.5 115.577 0 67.985 47.59 115.485 47.591 47.5 115.577 47.5ZM480-392q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm.055 171.999q-137.977 0-251.439-76.115Q115.155-372.231 61.54-500q53.615-127.769 167.022-203.884 113.406-76.115 251.383-76.115t251.439 76.115Q844.845-627.769 898.46-500q-53.615 127.769-167.022 203.884-113.406 76.115-251.383 76.115ZM480-500Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z' />
                  ) : (
                    <path d='M630.922-441.078 586-486q9-49.693-28.346-89.346Q520.307-615 466-606l-44.922-44.922q13.538-6.077 27.769-9.115 14.23-3.039 31.153-3.039 68.076 0 115.576 47.5T643.076-500q0 16.923-3.039 31.538-3.038 14.615-9.115 27.384Zm127.231 124.462L714-358q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-46.614-46.614q37.923-15.077 77.461-22.231 39.538-7.154 81.153-7.154 140.615 0 253.614 77.538 113 77.539 164.846 202.461-22.231 53.615-57.423 100.076-35.192 46.461-82.884 83.308Zm32.308 231.383L628.616-245.848q-30.769 11.385-68.192 18.616Q523-220.001 480-220.001q-140.999 0-253.614-77.538Q113.771-375.078 61.54-500q22.154-53 57.231-98.885 35.077-45.884 77.231-79.576l-110.77-112 42.154-42.153 705.228 705.228-42.153 42.153ZM238.155-636.309q-31.692 25.231-61.654 60.655Q146.539-540.231 128-500q50 101 143.5 160.5T480-280q27.308 0 54.386-4.616 27.077-4.615 45.923-9.538l-50.616-51.847q-10.231 4.153-23.693 6.615-13.461 2.462-26 2.462-68.076 0-115.576-47.5T316.924-500q0-12.154 2.462-25.423 2.462-13.27 6.615-24.27l-87.846-86.616ZM541-531Zm-131.768 65.769Z' />
                  )}
                </svg>
              </button>
            )}
            {isRepeatPasswordValidFail && (
              <p className='text-[0.5rem] font-light text-red-500 mt-1'>
                비밀번호가 일치하지 않습니다
              </p>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='border-none pt-2'>
        <button
          disabled={id && password && repeatPassword ? false : true}
          onClick={() => {
            modifyLeaderAccountInfoMutation.mutate({
              partyId,
              accountInfo: { id, password },
            });
          }}
          className={`w-full text-white partySelectedPlanInfo.selectedPlanName ${
            id && password && repeatPassword
              ? 'bg-[#3a8af9] hover:bg-[#1c6cdb]'
              : 'bg-[#d3d3d3]'
          } p-[0.825rem] rounded-[0.45rem] font-semibold box-shadow duration-150 ease-out`}
        >
          완료
        </button>
      </Modal.Footer>
    </Modal>
  );
}
