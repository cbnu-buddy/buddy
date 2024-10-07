'use client';

import { UserInfoStore } from '@/store/UserInfo';
import axiosInstance from '@/utils/axiosInstance';
import { fetchCurrentUserInfo } from '@/utils/fetchCurrentUserInfo';
import tossPaymentAxiosInstance from '@/utils/tossPaymentAxiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import defaultProfileImg from '@/public/images/default_profile_img.png';
import Loading from '@/app/loading';

interface PaymentInfoType {
  orderId: string;
  paymentKey: string;
  amount: number;
}

// 결제 승인 확인 API
const fetchPaymenyConfirm = ({ queryKey }: any) => {
  const paymentKey = queryKey[1];
  return tossPaymentAxiosInstance.get(`/${paymentKey}`);
};

// 결제 정보 추가 API
const addPaymentInfo = (paymentInfo: PaymentInfoType) => {
  const reqBody = {
    orderId: paymentInfo.orderId,
    paymentKey: paymentInfo.paymentKey,
    category: 'point',
    item: '버디 포인트',
    amount: paymentInfo.amount,
  };
  return axiosInstance.post('/private/member/payment', reqBody);
};

// 포인트 충전 API
const addPoint = (point: number) => {
  const reqBody = {
    point,
    category: 'recharge',
    item: '결제',
  };
  return axiosInstance.post('/private/member/point', reqBody);
};

export default function PaymentsSuccess() {
  const userInfo = UserInfoStore((state: any) => state.userInfo);
  const updateUserInfo = UserInfoStore((state: any) => state.updateUserInfo);

  const params = useSearchParams();
  const router = useRouter();

  const orderId = params.get('orderId') ?? '';
  const paymentKey = params.get('paymentKey') ?? '';
  const amount = Number(params.get('amount') ?? '0');

  const { isPending, data } = useQuery({
    queryKey: ['paymenyConfirm', paymentKey],
    queryFn: fetchPaymenyConfirm,
  });

  const resData = data?.data;

  const addPaymentInfoMutation = useMutation({
    mutationFn: addPaymentInfo,
    onMutate: () => {},
    onError: (error: AxiosError) => {
      const resData: any = error.response;
      switch (resData?.status) {
        case 409:
          switch (resData?.data.error.status) {
            case 'CONFLICT':
              alert('이미 처리된 결제 정보입니다.');
              router.back();
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
      addPointMutation.mutate(Number(amount));
    },
    onSettled: () => {},
  });

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
      alert('포인트가 충전되었습니다.');
      fetchCurrentUserInfo(updateUserInfo);
      router.back();
    },
    onSettled: () => {},
  });

  useEffect(() => {
    if (resData) addPaymentInfoMutation.mutate({ orderId, paymentKey, amount });
  }, [resData]);

  return (
    <div className='mx-auto'>
      <Loading />
    </div>
  );
}
