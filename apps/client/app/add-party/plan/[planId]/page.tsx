'use client';

import React from 'react';
import { AddPartyInfoStore } from '@/store/party/AddPartyInfo';
import InputAccount from './components/InputAccount';
import SelectRecruitmentNum from './components/SelectRecruitmentNum';
import SelectPartyDuration from './components/SelectPartyDuration';
import ConfirmPartyRule from './components/ConfirmPartyRule';
import axiosInstance from '@/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export interface AddPartyDetailProps {
  service: {
    name: string;
  };
  planId: number;
  name: string;
  monthlyFee: number;
  maxMemberNum: number;
}

interface DefaultProps {
  params: {
    planId: string;
  };
}

// 플랜 정보 조회 API
const fetchPlanInfo = ({ queryKey }: any) => {
  const planId = queryKey[1];
  return axiosInstance.get(`/private/plan/${planId}`);
};

export default function AddPartyDetail(props: DefaultProps) {
  const planId = props.params.planId;

  const partyInfo = AddPartyInfoStore((state: any) => state.partyInfo);

  const { isPending, data } = useQuery({
    queryKey: ['planInfo', planId],
    queryFn: fetchPlanInfo,
  });

  const resData = data?.data.response;

  return (
    <div>
      {partyInfo.stepName === 'inputAccount' ? (
        <InputAccount resData={resData} />
      ) : partyInfo.stepName === 'selectRecruitmentNum' ? (
        <SelectRecruitmentNum resData={resData} />
      ) : partyInfo.stepName === 'selectPartyDuration' ? (
        <SelectPartyDuration resData={resData} />
      ) : partyInfo.stepName === 'confirmPartyRule' ? (
        <ConfirmPartyRule resData={resData} planId={planId} />
      ) : null}
    </div>
  );
}
