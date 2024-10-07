import { Label, Modal } from 'flowbite-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { fetchCurrentUserInfo } from '@/utils/fetchCurrentUserInfo';
import { UserInfoStore } from '@/store/UserInfo';

interface ModifyPasswordModalProps {
  openModifyPasswordModal: string | undefined;
  setOpenModifyPasswordModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

interface passwordInfoType {
  prevPassword: string;
  newPassword: string;
}

// 비밀번호 변경 API
const modifyPassword = (passwordInfo: passwordInfoType) => {
  const reqBody = {
    oldPwd: passwordInfo.prevPassword,
    newPwd: passwordInfo.newPassword,
  };
  return axiosInstance.patch('/private/member/change-pwd', reqBody);
};

export default function ModifyPasswordModal({
  openModifyPasswordModal,
  setOpenModifyPasswordModal,
}: ModifyPasswordModalProps) {
  const updateUserInfo = UserInfoStore((state: any) => state.updateUserInfo);

  const modifyPasswordMutation = useMutation({
    mutationFn: modifyPassword,
    onMutate: () => {},
    onError: (error: AxiosError) => {
      const resData: any = error.response;
      switch (resData?.status) {
        case 400:
          switch (resData?.data.error.status) {
            case 'BAD_REQUEST':
              alert('현재 비밀번호가 일치하지 않습니다.');
              setIsPrevPasswordValidFail(true);
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
      fetchCurrentUserInfo(updateUserInfo);
      alert('비밀번호가 변경되었습니다.');
      setOpenModifyPasswordModal(undefined);
    },
    onSettled: () => {},
  });

  const [prevPassword, setPrevPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRepeatPassword, setNewRepeatPassword] = useState('');

  const [isPrevPasswordValidFail, setIsPrevPasswordValidFail] = useState(false);
  const [isNewPasswordValidFail, setIsNewPasswordValidFail] = useState(false);
  const [isNewRepeatPasswordValidFail, setIsNewRepeatPasswordValidFail] =
    useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Modal
      size='sm'
      show={openModifyPasswordModal === 'default'}
      data-aos='fade-zoom'
      data-aos-duration='300'
    >
      <Modal.Body className='flex flex-col gap-y-3 pb-0 spacing-y-28'>
        <p className='text-lg font-bold'>🔒 비밀번호 변경</p>

        <div className='h-[14.5rem] space-y-2'>
          <div className='flex flex-col gap-2 mt-3'>
            <div>
              <Label
                htmlFor='repeat-prevPassword'
                value='현재 비밀번호'
                className={`text-[#a2a4a9] text-[0.5rem] leading-[1] font-light`}
              />
            </div>
            <div className='flex items-center gap-2'>
              <input
                required
                type='password'
                value={prevPassword}
                onChange={(e) => setPrevPassword(e.target.value)}
                className={`placeholder-[#9ea3ae] rounded-[0.425rem] border ${
                  isPrevPasswordValidFail
                    ? 'border-red-500'
                    : 'border-[#d4d5d7]'
                } text-sm font-light w-full focus:ring-0 py-2`}
              />
            </div>
          </div>

          <div className='flex flex-col gap-2 mt-3'>
            <div>
              <Label
                htmlFor='repeat-prevPassword'
                value='신규 비밀번호'
                className={`text-[#a2a4a9] text-[0.5rem] leading-[1] font-light`}
              />
            </div>
            <div className='flex items-center gap-2'>
              <input
                required
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`placeholder-[#9ea3ae] rounded-[0.425rem] border ${
                  isNewPasswordValidFail ? 'border-red-500' : 'border-[#d4d5d7]'
                } text-sm font-light w-full focus:ring-0 py-2`}
              />
            </div>
          </div>

          <div className='flex flex-col gap-2 mt-3'>
            <div>
              <Label
                htmlFor='repeat-prevPassword'
                value='신규 비밀번호 재입력'
                className={`text-[#a2a4a9] text-[0.5rem] leading-[1] font-light`}
              />
            </div>
            <div className='flex items-center gap-2'>
              <input
                required
                type='password'
                value={newRepeatPassword}
                onChange={(e) => setNewRepeatPassword(e.target.value)}
                className={`placeholder-[#9ea3ae] rounded-[0.425rem] border ${
                  isNewRepeatPasswordValidFail
                    ? 'border-red-500'
                    : 'border-[#d4d5d7]'
                } text-sm font-light w-full focus:ring-0 py-2`}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='border-none'>
        <button
          onClick={() => {
            setOpenModifyPasswordModal(undefined);
          }}
          className='w-full text-[#787878] text-[0.8rem] bg-[#efefef] hover:brightness-[96%] duration-150 ease-out p-[0.825rem] rounded-[0.45rem] font-bold'
        >
          취소
        </button>
        <button
          onClick={() => {
            if (!prevPassword) {
              alert('현재 비밀번호를 입력해 주세요');
              setIsPrevPasswordValidFail(true);
              return;
            }

            if (!newPassword) {
              alert('신규 비밀번호를 입력해 주세요');
              setIsNewPasswordValidFail(true);
              return;
            }

            if (!newRepeatPassword) {
              alert('신규 비밀번호를 다시 입력해 주세요');
              setIsNewRepeatPasswordValidFail(true);
              return;
            }

            if (newPassword !== newRepeatPassword) {
              alert('신규 비밀번호가 일치하지 않습니다');
              setIsNewRepeatPasswordValidFail(true);
              true;
              return;
            }

            setIsPrevPasswordValidFail(false);
            setIsNewPasswordValidFail(false);
            setIsNewRepeatPasswordValidFail(false);

            modifyPasswordMutation.mutate({ prevPassword, newPassword });
          }}
          className='w-full text-white text-[0.8rem] bg-[#3a8af9] hover:bg-[#1c6cdb] duration-150 ease-out p-[0.825rem] rounded-[0.45rem] font-bold'
        >
          변경
        </button>
      </Modal.Footer>
    </Modal>
  );
}
