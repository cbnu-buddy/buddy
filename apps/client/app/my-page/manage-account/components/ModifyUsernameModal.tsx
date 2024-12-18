import { Label, Modal } from 'flowbite-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { fetchCurrentUserInfo } from '@/utils/fetchCurrentUserInfo';
import { UserInfoStore } from '@/store/UserInfo';

interface ModifyUsernameModalProps {
  openModifyUsernameModal: string | undefined;
  setOpenUsernameModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

// 닉네임 변경 API
const modifyUsername = (username: string) => {
  const reqBody = {
    newUsername: username,
  };
  return axiosInstance.patch('/private/member/change-username', reqBody);
};

export default function ModifyUsernameModal({
  openModifyUsernameModal,
  setOpenUsernameModal,
}: ModifyUsernameModalProps) {
  const updateUserInfo = UserInfoStore((state: any) => state.updateUserInfo);

  const modifyUsernameMutation = useMutation({
    mutationFn: modifyUsername,
    onMutate: () => {},
    onError: (error: AxiosError) => {
      const resData: any = error.response;
      switch (resData?.status) {
        case 409:
          switch (resData?.data.error.status) {
            case 'CONFLICT':
              alert('이미 사용 중인 닉네임입니다.');
              setIsUsernameValidFail(true);
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
      alert('닉네임이 변경되었습니다.');
      setOpenUsernameModal(undefined);
    },
    onSettled: () => {},
  });

  const [username, setUsername] = useState('');

  const [isUsernameValidFail, setIsUsernameValidFail] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Modal
      size='sm'
      show={openModifyUsernameModal === 'default'}
      data-aos='fade-zoom'
      data-aos-duration='300'
    >
      <Modal.Body className='flex flex-col gap-y-3 pb-0 spacing-y-28'>
        <p className='text-lg font-bold'>닉네임 변경</p>

        <div className='h-[5rem] space-y-2'>
          <div className='flex flex-col gap-2 mt-3'>
            <div>
              <Label
                htmlFor='repeat-password'
                value='변경할 닉네임'
                className={`text-[#a2a4a9] text-[0.5rem] leading-[1] font-light`}
              />
            </div>
            <div className='flex items-center gap-2'>
              <input
                required
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`placeholder-[#9ea3ae] rounded-[0.425rem] border ${
                  isUsernameValidFail ? 'border-red-500' : 'border-[#d4d5d7]'
                } text-sm font-light w-full focus:ring-0 py-2`}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='border-none'>
        <button
          onClick={() => {
            setOpenUsernameModal(undefined);
          }}
          className='w-full text-[#787878] text-[0.8rem] bg-[#efefef] hover:brightness-[96%] duration-150 ease-out p-[0.825rem] rounded-[0.45rem] font-bold'
        >
          취소
        </button>
        <button
          onClick={() => {
            if (!username) {
              alert('변경할 이메일을 입력해 주세요');
              setIsUsernameValidFail(true);
              return;
            }
            setIsUsernameValidFail(false);
            modifyUsernameMutation.mutate(username);
          }}
          className='w-full text-white text-[0.8rem] bg-[#3a8af9] hover:bg-[#1c6cdb] duration-150 ease-out p-[0.825rem] rounded-[0.45rem] font-bold'
        >
          변경
        </button>
      </Modal.Footer>
    </Modal>
  );
}
