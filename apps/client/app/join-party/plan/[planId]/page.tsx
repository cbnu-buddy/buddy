"use client";

import { partySelectedPlanInfos } from "@/data/partySelectedPlanInfos";
import Loading from "@/app/loading";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import warningGrayImg from "@/public/images/warning_icon_gray.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { formatDate } from "@/utils/formatDate";
import JoinPartyModal from "./components/JoinPartyModal";
import SuccessJoinPartyModal from "./components/SuccessJoinPartyModal";

interface DefaultProps {
  params: {
    planId: string;
  };
}

// 특정 플랜 내 매칭이 완료되지 않은 파티 목록 정보 조회 API
const fetchUnMatchedPlanPartyInfo = ({ queryKey }: any) => {
  const planId = queryKey[1];
  return axiosInstance.get(`/private/party/plan/${planId}`);
};

const calculateDaysLeft = (startDateString: string) => {
  const today = new Date();
  const startDate = new Date(startDateString);
  const timeDiff = startDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysLeft;
};

export default function JoinPartyDetail(props: DefaultProps) {
  const planId = Number(props.params.planId);

  const { isPending, data } = useQuery({
    queryKey: ["unMatchedPlanPartyInfo", planId],
    queryFn: fetchUnMatchedPlanPartyInfo,
    retry: 0,
  });

  const resData = data?.data.response;

  const planDetail = partySelectedPlanInfos
    .flatMap((plan) => plan.planDetailInfos)
    .find((detail) => detail.id === planId);

  const planIconImgUrl = planDetail
    ? partySelectedPlanInfos.find((plan) =>
        plan.planDetailInfos.some((detail) => detail.id === planId)
      )?.iconImg
    : "";

  const [openJoinPartyModal, setOpenJoinPartyModal] = useState<number | null>(
    null
  );
  const [openSuccessJoinParty, setOpenSuccessJoinParty] = useState<
    number | null
  >(null);

  useEffect(() => {
    AOS.init();
  }, []);

  if (isPending) return <Loading />;

  return (
    <div className="flex justify-center bg-[#f4f4f9] text-center h-screen">
      <div className="w-[30rem] mt-16 mb-[7.5rem]">
        <div
          className="flex justify-between items-center"
          data-aos="fade-zoom-in"
          data-aos-easing="ease-out"
          data-aos-duration="900"
        >
          <div className="flex flex-col gap-y-1 text-2xl text-left font-semibold">
            <p className="text-[#1c6cdb]">{resData?.plan.name}</p>
            <p className="text-[#333d4b]">파티를 찾아드릴게요</p>
          </div>
          <div>
            {planIconImgUrl && (
              <Image
                src={planIconImgUrl}
                alt="plan icon image"
                width={85}
                height={85}
                quality={100}
                className="drop-shadow-lg"
              />
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start">
          <p className="text-[#333d4b] text-xs">
            파티 검색 결과 (
            {resData?.count === 0 ? "없음" : resData?.count + "개"})
          </p>
          {resData?.party.length === 0 ? (
            <div className="mt-20 w-full flex flex-col gap-y-3 items-center">
              <Image
                src={warningGrayImg}
                alt="warning icon image"
                width={35}
                height={35}
                quality={100}
              />
              <p className="text-[#9b9b9b] text-xs">대기 중인 파티가 없어요.</p>
            </div>
          ) : (
            <div className="mt-3 w-full flex flex-col gap-y-3">
              {resData?.party.map((partyInfo: any, index: number) => {
                const daysLeft = calculateDaysLeft(partyInfo.startDate);
                return (
                  <React.Fragment key={index}>
                    <button
                      className="w-full flex justify-between p-7 bg-white rounded-lg border-0 hover:scale-105 hover:shadow-md duration-300 ease-out"
                      onClick={() => setOpenJoinPartyModal(index)}
                    >
                      <div className="flex flex-col items-start gap-y-3">
                        <div className="flex gap-x-2 text-base font-medium">
                          <span>
                            <span className="text-[#1c6cdb]">
                              {partyInfo.durationMonth}개월{" "}
                            </span>
                            파티
                          </span>
                          <span>
                            <span className="text-[#1c6cdb]">
                              {daysLeft === 0 ? "오늘" : `${daysLeft}일 후`}{" "}
                            </span>
                            시작
                          </span>
                        </div>
                        <p className="text-xs text-[#656565] font-light">
                          ~ {formatDate(partyInfo.endDate)} 까지
                        </p>
                      </div>
                      <div>
                        <span className="text-xs">
                          월 {partyInfo.individualMonthlyFee.toLocaleString()}원
                        </span>
                      </div>
                    </button>
                    <JoinPartyModal
                      openJoinPartyModal={
                        openJoinPartyModal === index ? "default" : undefined
                      }
                      setOpenJoinPartyModal={setOpenJoinPartyModal}
                      planName={resData?.plan.name}
                      partyInfo={partyInfo}
                      setOpenSuccessJoinParty={setOpenSuccessJoinParty}
                      index={index}
                    />

                    <SuccessJoinPartyModal
                      openSuccessJoinParty={
                        openSuccessJoinParty === index ? "default" : undefined
                      }
                      setOpenSuccessJoinParty={setOpenSuccessJoinParty}
                      planName={resData?.plan.name}
                      partyInfo={partyInfo}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
