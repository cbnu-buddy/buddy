'use client';

import { UserInfoStore } from '@/store/UserInfo';
import { fetchCurrentUserInfo } from '@/utils/fetchCurrentUserInfo';
import React, { useState } from 'react';
import ModifyEmailModal from './components/ModifyEmailModal';
import ModifyUsernameModal from './components/ModifyUsernameModal';
import ModifyPasswordModal from './components/ModifyPasswordModal';

export default function ManageAccount() {
  const userInfo = UserInfoStore((state: any) => state.userInfo);
  const updateUserInfo = UserInfoStore((state: any) => state.updateUserInfo);

  const [openModifyEmailModal, setOpenModifyEmailModal] = useState<
    string | undefined
  >();
  const [openModifyUsernameModal, setOpenModifyUsernameModal] = useState<
    string | undefined
  >();
  const [openModifyPasswordModal, setOpenModifyPasswordModal] = useState<
    string | undefined
  >();

  return (
    <div className='w-[30rem] flex flex-col gap-y-3'>
      <div className='w-full flex flex-col gap-y-4'>
        <div className='w-full flex flex-col items-start gap-y-[0.375rem] bg-white px-5 py-6 rounded-[0.6rem]'>
          <p className='w-full mt-[0.1rem] font-semibold text-[0.9rem]'>
            회원 정보 수정
          </p>

          <div className='w-full my-3 border-[0.75px]' />

          <div className='w-full flex flex-col gap-y-4'>
            <div className='w-full h-9 flex justify-between items-center gap-x-2 text-[#656565] text-xs'>
              <span className='text-inherit'>내 이메일</span>

              <div className='h-full flex justify-center items-center gap-x-4'>
                <span className='font-semibold'>{userInfo.email}</span>
                <button
                  className='w-[5rem] h-full text-xs font-medium text-center bg-[#eaeffe] rounded-lg text-[#5880f8] hover:brightness-95'
                  onClick={() => setOpenModifyEmailModal('default')}
                >
                  변경하기
                </button>
                {openModifyEmailModal && (
                  <ModifyEmailModal
                    openModifyEmailModal={openModifyEmailModal}
                    setOpenModifyEmailModal={setOpenModifyEmailModal}
                  />
                )}
              </div>
            </div>

            <div className='w-full h-9 flex justify-between items-center gap-x-2 text-[#656565] text-xs'>
              <span className='text-inherit'>닉네임</span>

              <div className='h-full flex justify-center items-center gap-x-4'>
                <span className='font-semibold'>{userInfo.username}</span>
                <button
                  className='w-[5rem] h-full text-xs font-medium text-center bg-[#eaeffe] rounded-lg text-[#5880f8] hover:brightness-95'
                  onClick={() => setOpenModifyUsernameModal('default')}
                >
                  변경하기
                </button>
                {openModifyUsernameModal && (
                  <ModifyUsernameModal
                    openModifyUsernameModal={openModifyUsernameModal}
                    setOpenUsernameModal={setOpenModifyUsernameModal}
                  />
                )}
              </div>
            </div>

            <div className='w-full h-9 flex justify-between items-center gap-x-2 text-[#656565] text-xs'>
              <span className='text-inherit'>비밀번호</span>

              <div className='h-full flex justify-center items-center gap-x-4'>
                <span className='font-semibold'>**********</span>
                <button
                  className='w-[5rem] h-full text-xs font-medium text-center bg-[#eaeffe] rounded-lg text-[#5880f8] hover:brightness-95'
                  onClick={() => setOpenModifyPasswordModal('default')}
                >
                  변경하기
                </button>
                {openModifyPasswordModal && (
                  <ModifyPasswordModal
                    openModifyPasswordModal={openModifyPasswordModal}
                    setOpenModifyPasswordModal={setOpenModifyPasswordModal}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
