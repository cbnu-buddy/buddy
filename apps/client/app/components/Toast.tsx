"use client";

import React, { useEffect, useState } from "react";
import {
  ToastInfoStore,
  ToastInfoStoreState,
} from "@/store/components/ToastInfo";

export default function Toast() {
  const { isOpenToast, toastMessage }: ToastInfoStoreState = ToastInfoStore(
    (state: any) => ({
      isOpenToast: state.isOpenToast,
      toastMessage: state.toastMessage,
    })
  );
  const updateOpenToastStatus = ToastInfoStore(
    (state: any) => state.updateOpenToastStatus
  );

  const [isToastClosing, setIsToastClosing] = useState(false);

  useEffect(() => {
    if (isOpenToast) {
      const fadeOutTimer = setTimeout(() => {
        setIsToastClosing(true);
      }, 3000); // 3초 후에 toast-fade-out 클래스 추가

      const closeTimer = setTimeout(() => {
        updateOpenToastStatus(false);
        setIsToastClosing(false);
      }, 4500); // 4.5초 후에 토스트 닫기

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [isOpenToast, updateOpenToastStatus]);

  return (
    <>
      {isOpenToast && (
        <div
          className={`z-10 flex justify-center items-center gap-x-1 rounded-[0.7rem] fixed bottom-14 left-14 bg-[#222222] py-3 px-5 ${
            isToastClosing ? "toast-fade-out" : "toast-fade-in"
          }`}
        >
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-green-500 dark:bg-green-800 dark:text-green-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="27.5px"
              viewBox="0 -960 960 960"
              width="27.5px"
              fill="#75d5ad"
            >
              <path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
            </svg>
          </div>
          <div className="ml-1 text-[0.825rem] font-medium text-white">
            {toastMessage}
          </div>
        </div>
      )}
    </>
  );
}
