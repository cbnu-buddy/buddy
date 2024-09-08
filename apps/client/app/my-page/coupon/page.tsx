'use client';

import { userInfoStore } from '@/store/UserInfo';
import axiosInstance from '@/utils/axiosInstance';
import { fetchCurrentUserInfo } from '@/utils/fetchCurrentUserInfo';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useState } from 'react';

// 포인트 충전 API
const addPoint = (point: number) => {
  const reqBody = {
    point,
    category: 'recharge',
    item: '쿠폰 사용',
  };
  return axiosInstance.post('/private/member/point', reqBody);
};

export default function Coupon() {
  const updateUserInfo = userInfoStore((state: any) => state.updateUserInfo);

  const [isCouponUsed, setIsCouponUsed] = useState(false);
  const [isCouponNumberValidFail, setIsCouponNumberValidFail] = useState(false);

  const addPointMutation = useMutation({
    mutationFn: addPoint,
    onMutate: () => {},
    onError: (error: AxiosError) => {
      const resData: any = error.response;
      switch (resData?.status) {
        case 400:
          switch (resData?.data.error.status) {
            // case 'BAD_REQUEST':
            //   setpasswordInputAnnouceMsg(
            //     '아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해 주세요'
            //   );
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
      alert('5000 포인트가 지급되었습니다.');
      fetchCurrentUserInfo(updateUserInfo);
      setCouponNumber('');
      setIsCouponUsed(true);
    },
    onSettled: () => {},
  });

  const [couponNumber, setCouponNumber] = useState('');

  const handleRegisterCoupon = () => {
    if (couponNumber === 'NML52KF93H') {
      if (isCouponUsed) {
        alert('이미 사용하신 쿠폰입니다.');
        setIsCouponNumberValidFail(true);
        return;
      }
      addPointMutation.mutate(5000);
      return;
    }

    alert('쿠폰 번호가 정확한 지 다시 확인해 주세요');
    setIsCouponNumberValidFail(true);
  };

  return (
    <div className='w-[30rem] flex flex-col gap-y-3'>
      <div className='w-full flex flex-col gap-y-4'>
        <div className='w-full flex flex-col items-start gap-y-[0.375rem] bg-white px-5 py-6 rounded-[0.6rem]'>
          <p className='w-full mt-[0.1rem] font-semibold text-[0.9rem]'>
            쿠폰 사용
          </p>
          <div className='w-full my-3 border-[0.75px]' />
          <div className='w-full h-10 flex items-center gap-x-2'>
            <input
              type='text'
              value={couponNumber}
              placeholder='쿠폰 번호를 입력해 주세요.'
              className={`w-full h-full text-[0.5rem] placeholder-[#ababab] bg-[#f6f6f6] rounded-lg focus:ring-0 focus:border-[#3a8af9] focus:bg-white ${
                isCouponNumberValidFail
                  ? 'border-red-500'
                  : 'border-transparent'
              }`}
              onChange={(e) => setCouponNumber(e.target.value)}
            />
            <button
              disabled={couponNumber ? false : true}
              className={`w-[6rem] h-full text-center bg-[#eaeffe] rounded-lg ${
                couponNumber
                  ? 'text-[#5880f8] hover:brightness-95'
                  : 'text-[#9fb6fb]'
              }`}
              onClick={() => handleRegisterCoupon()}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
