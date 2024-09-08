'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import HotTagList from './components/hotTag/HotTagList';
import HotPostList from './components/hotPost/HotPostList';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import RelatedSearchTagList from './components/relatedSearchTag/RelatedSearchTagList';
import SwiperBanner from './components/SwiperBanner';
import SearchTagList from './components/searchedTag/SearchTagList';
import useDebounce from '@/utils/hooks/useDebounce';
import RelatedSearchPostList from './components/relatedSearchPost/RelatedSearchPostList';
import { tagInfos, tagSubscribedInfo } from '@/data/mock/tagInfos';
import { Toast } from 'flowbite-react';

export default function Search() {
  const resData = tagInfos;
  const [tagSubscribedData, setTagSubscribedData] = useState(tagSubscribedInfo);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isOpenSearchedResultList, setIsOpenSearchedResultList] =
    useState<boolean>(false);
  const [isSuccessSearchResult, setIsSUccessSearchResult] =
    useState<boolean>(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 400);
  const [isToastClosing, setIsToastClosing] = useState(false);
  const [isOpenCopyLinkCompleteToast, setIsOpenCopyLinkCompleteToast] =
    useState<boolean>(false);
  const [isOpenSubscribeCompleteToast, setIsOpenSubscribeCompleteToast] =
    useState<boolean>(false);
  const [isOpenUnSubscribeCompleteToast, setIsOpenUnSubscribeCompleteToast] =
    useState<boolean>(false);
  const [isOpenBottomDrawer, setIsOpenBottomDrawer] = useState<boolean>(false);
  const [isBottomDrawerClosing, setIsBottomDrawerClosing] =
    useState<boolean>(false);

  const searchedResultListRef = useRef<HTMLInputElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const params = useSearchParams();

  const query: string = params?.get('q') || '';
  const tagQuery: string = params?.get('tag') || '';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        closeDrawer();
      }
    };

    const handleEscKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDrawer();
      }
    };

    if (isOpenBottomDrawer) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscKeyPress);
    } else {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKeyPress);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  }, [isOpenBottomDrawer]);

  const closeDrawer = () => {
    setIsBottomDrawerClosing(true);
    setTimeout(() => {
      setIsOpenBottomDrawer(false);
      setIsBottomDrawerClosing(false);
    }, 375);
  };

  const handleButtonInBottomDrawaberClick = () => {
    setTimeout(() => {
      closeDrawer();
    }, 250);
  };

  useEffect(() => {
    if (isOpenCopyLinkCompleteToast) {
      const fadeOutTimer = setTimeout(() => {
        setIsToastClosing(true);
      }, 3000); // 3초 후에 toast-fade-out 클래스 추가

      const closeTimer = setTimeout(() => {
        setIsOpenCopyLinkCompleteToast(false);
        setIsToastClosing(false);
      }, 4500); // 4.5초 후에 토스트 닫기

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [isOpenCopyLinkCompleteToast]);

  useEffect(() => {
    if (isOpenSubscribeCompleteToast) {
      const fadeOutTimer = setTimeout(() => {
        setIsToastClosing(true);
      }, 3000); // 3초 후에 toast-fade-out 클래스 추가

      const closeTimer = setTimeout(() => {
        setIsOpenSubscribeCompleteToast(false);
        setIsToastClosing(false);
      }, 4500); // 4.5초 후에 토스트 닫기

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [isOpenSubscribeCompleteToast]);

  useEffect(() => {
    if (isOpenUnSubscribeCompleteToast) {
      const fadeOutTimer = setTimeout(() => {
        setIsToastClosing(true);
      }, 3000); // 3초 후에 toast-fade-out 클래스 추가

      const closeTimer = setTimeout(() => {
        setIsOpenUnSubscribeCompleteToast(false);
        setIsToastClosing(false);
      }, 4500); // 4.5초 후에 토스트 닫기

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [isOpenUnSubscribeCompleteToast]);

  useEffect(() => {
    if (searchQuery) setIsOpenSearchedResultList(true);
  }, [searchQuery]);

  const handleInputSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery: string = e.target.value;
    setSearchQuery(searchQuery);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      searchedResultListRef.current &&
      !searchedResultListRef.current.contains(event.target as Node)
    ) {
      setIsOpenSearchedResultList(false);
    }
  }, []);

  const handleEscKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpenSearchedResultList(false);
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (searchQuery !== debouncedSearchQuery) return;
      if (!isOpenSearchedResultList || !resData.length) return;

      const activeElement = document.activeElement;
      const itemList = document.querySelectorAll('.search-result-item');
      let currentIndex = Array.prototype.indexOf.call(itemList, activeElement);

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % itemList.length;
        (itemList[nextIndex] as HTMLElement).focus();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        const prevIndex =
          (currentIndex - 1 + itemList.length) % itemList.length;
        (itemList[prevIndex] as HTMLElement).focus();
      }
    },
    [debouncedSearchQuery, searchQuery, resData, isOpenSearchedResultList]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscKeyPress);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  }, [handleClickOutside, handleEscKeyPress]);

  useEffect(() => {
    if (isOpenSearchedResultList) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpenSearchedResultList, handleKeyDown]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchQuery) return;
    router.push(`/community/search?q=${searchQuery}`);
    setIsOpenSearchedResultList(false);
  };

  return (
    <div className='flex flex-col gap-y-14 w-[30rem] mx-auto pt-10 pb-24'>
      <div className='relative'>
        <div className='w-full h-[2.625rem] flex items-center px-3 outline outline-1 outline-[#e6e8ea] rounded-lg hover:outline-[#93bcfa] hover:outline-2 focus-within:outline-[#93bcfa] focus-within:outline-2'>
          <svg
            fill='none'
            width='21'
            height='21'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='m19.59 18.41-3.205-3.203c1.0712-1.3712 1.579-3.0994 1.4197-4.832-.1593-1.73274-.9735-3.3394-2.2767-4.49233s-2.9972-1.76527-4.7364-1.71212c-1.73913.05315-3.39252.76779-4.62288 1.99815s-1.945 2.88375-1.99815 4.6229c-.05316 1.7392.55918 3.4332 1.71211 4.7364s2.7596 2.1174 4.49232 2.2767c1.7327.1592 3.4608-.3485 4.832-1.4197l3.204 3.204c.1567.1541.3678.24.5876.2391.2197-.0009.4302-.0886.5856-.2439.1554-.1554.243-.3659.2439-.5856.001-.2198-.085-.431-.2391-.5876zm-4.886-3.808c-.0183.0156-.036.032-.053.049-.042.044-.042.044-.08.092-.91.886-2.197 1.424-3.571 1.424-1.19232.0001-2.348-.4121-3.27107-1.1668s-1.55672-1.8055-1.79352-2.974c-.2368-1.1686-.06217-2.38311.49428-3.43762s1.46047-1.88413 2.55878-2.34819c1.09833-.46405 2.32333-.53398 3.46733-.19793s2.1365 1.0574 2.8094 2.04174c.6728.98434.9845 2.1711.8822 3.359-.1022 1.1879-.6122 2.3039-1.4434 3.1588z'
              fill='#8994a2'
            ></path>
          </svg>
          <form onSubmit={handleSubmit} className='w-full'>
            <input
              value={searchQuery}
              ref={searchedResultListRef}
              onFocus={() => {
                setIsOpenSearchedResultList(true);
              }}
              onClick={() => {
                setIsOpenSearchedResultList(true);
              }}
              onChange={handleInputSearchQuery}
              className='w-full h-[2.625rem] pl-[0.625rem] pr-[1.8rem] outline-none placeholder-[#888e96] text-[0.825rem] font-extralight'
              placeholder='궁금한 것을 검색해 보세요.'
            />
          </form>
          {searchQuery && (
            <button
              onClick={(e) => {
                setSearchQuery('');
                setIsOpenSearchedResultList(false);
              }}
              className='absolute top-[0.35rem] right-3 p-1'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='25'
                viewBox='0 -960 960 960'
                width='25'
                fill='#a2a4a9'
              >
                <path d='M480-437.847 277.076-234.924q-8.307 8.308-20.884 8.5-12.576.193-21.268-8.5-8.693-8.692-8.693-21.076t8.693-21.076L437.847-480 234.924-682.924q-8.308-8.307-8.5-20.884-.193-12.576 8.5-21.268 8.692-8.693 21.076-8.693t21.076 8.693L480-522.153l202.924-202.923q8.307-8.308 20.884-8.5 12.576-.193 21.268 8.5 8.693 8.692 8.693 21.076t-8.693 21.076L522.153-480l202.923 202.924q8.308 8.307 8.5 20.884.193 12.576-8.5 21.268-8.692 8.693-21.076 8.693t-21.076-8.693L480-437.847Z'></path>
              </svg>
            </button>
          )}
        </div>

        {isOpenSearchedResultList && (
          <div className='z-10 absolute top-[3.05rem] bg-white w-full flex flex-col p-[0.4rem] rounded-md text-[#4e5968] window'>
            <SearchTagList
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setIsSUccessSearchResult={setIsSUccessSearchResult}
              resData={resData}
              debouncedSearchQuery={debouncedSearchQuery}
            />
          </div>
        )}
      </div>

      {!isSuccessSearchResult && (query || tagQuery) && (
        <div className='flex flex-col items-center gap-y-2 mt-2 mb-12'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 200 100'
            width='200'
            height='100'
            preserveAspectRatio='xMidYMid meet'
            style={{
              width: '35%',
              height: '17.5%',
              transform: 'translate3d(0px, 0px, 0px)',
            }}
          >
            <defs>
              <clipPath id='__lottie_element_2'>
                <rect width='200' height='100' x='0' y='0' />
              </clipPath>
            </defs>
            <g clip-path='url(#__lottie_element_2)'>
              <g
                transform='matrix(1,0,0,1,77.94700622558594,31.194000244140625)'
                opacity='1'
                style={{ display: 'block' }}
              >
                <g
                  opacity='1'
                  transform='matrix(1,0,0,1,19.92099952697754,23.868999481201172)'
                >
                  <path
                    fill='rgb(128,132,144)'
                    fill-opacity='0.3'
                    d=' M4.734000205993652,23.618000030517578 C4.734000205993652,23.618000030517578 -17.270999908447266,23.618000030517578 -17.270999908447266,23.618000030517578 C-18.59600067138672,23.618000030517578 -19.672000885009766,22.54400062561035 -19.672000885009766,21.2189998626709 C-19.672000885009766,21.2189998626709 -19.672000885009766,-21.2189998626709 -19.672000885009766,-21.2189998626709 C-19.672000885009766,-22.54400062561035 -18.59600067138672,-23.618000030517578 -17.270999908447266,-23.618000030517578 C-17.270999908447266,-23.618000030517578 17.273000717163086,-23.618000030517578 17.273000717163086,-23.618000030517578 C18.597999572753906,-23.618000030517578 19.672000885009766,-22.54400062561035 19.672000885009766,-21.2189998626709 C19.672000885009766,-21.2189998626709 19.672000885009766,8.680000305175781 19.672000885009766,8.680000305175781 C19.672000885009766,8.680000305175781 4.734000205993652,23.618000030517578 4.734000205993652,23.618000030517578z'
                  ></path>
                </g>
                <g
                  opacity='1'
                  transform='matrix(1,0,0,1,32.124000549316406,40.018001556396484)'
                >
                  <path
                    fill='rgb(128,132,144)'
                    fill-opacity='0.3'
                    d=' M-7.468999862670898,7.468999862670898 C-7.468999862670898,7.468999862670898 -7.468999862670898,-5.070000171661377 -7.468999862670898,-5.070000171661377 C-7.468999862670898,-6.395999908447266 -6.394999980926514,-7.468999862670898 -5.070000171661377,-7.468999862670898 C-5.070000171661377,-7.468999862670898 7.468999862670898,-7.468999862670898 7.468999862670898,-7.468999862670898 C7.468999862670898,-7.468999862670898 -7.468999862670898,7.468999862670898 -7.468999862670898,7.468999862670898z'
                  ></path>
                </g>
              </g>
              <g
                transform='matrix(1,0,0,1,66.20800018310547,17.06999969482422)'
                opacity='1'
                style={{ display: 'block' }}
              >
                <g opacity='1' transform='matrix(1,0,0,1,14.25,14.25)'>
                  <path
                    fill='rgb(128,132,144)'
                    fill-opacity='1'
                    d=' M14,0 C14,7.730999946594238 7.730999946594238,14 0,14 C-7.73199987411499,14 -14,7.730999946594238 -14,0 C-14,-7.73199987411499 -7.73199987411499,-14 0,-14 C7.730999946594238,-14 14,-7.73199987411499 14,0z'
                  ></path>
                </g>
                <g
                  opacity='1'
                  transform='matrix(1,0,0,1,14.440999984741211,12.168000221252441)'
                >
                  <path
                    fill='rgb(51,60,74)'
                    fill-opacity='1'
                    d=' M0.8309999704360962,5.138000011444092 C0.8309999704360962,5.138000011444092 -1.0779999494552612,5.138000011444092 -1.0779999494552612,5.138000011444092 C-1.0779999494552612,5.138000011444092 -1.0779999494552612,4.151000022888184 -1.0779999494552612,4.151000022888184 C-1.0779999494552612,2.2130000591278076 0.12600000202655792,1.444000005722046 1.0049999952316284,0.8809999823570251 C1.7549999952316284,0.4020000100135803 2.184999942779541,0.09600000083446503 2.3499999046325684,-0.621999979019165 C2.493000030517578,-1.2430000305175781 2.378999948501587,-1.7940000295639038 2.009999990463257,-2.257999897003174 C1.5379999876022339,-2.8469998836517334 0.7020000219345093,-3.2290000915527344 -0.12300000339746475,-3.2290000915527344 C-1.475000023841858,-3.2290000915527344 -2.572999954223633,-2.13100004196167 -2.572999954223633,-0.7799999713897705 C-2.572999954223633,-0.7799999713897705 -4.48199987411499,-0.7799999713897705 -4.48199987411499,-0.7799999713897705 C-4.48199987411499,-3.183000087738037 -2.5269999504089355,-5.138000011444092 -0.12300000339746475,-5.138000011444092 C1.281999945640564,-5.138000011444092 2.671999931335449,-4.489999771118164 3.502000093460083,-3.447000026702881 C4.230999946594238,-2.5309998989105225 4.48199987411499,-1.3760000467300415 4.210999965667725,-0.1940000057220459 C3.864000082015991,1.319000005722046 2.805999994277954,1.9950000047683716 2.0339999198913574,2.490000009536743 C1.2000000476837158,3.0230000019073486 0.8309999704360962,3.2939999103546143 0.8309999704360962,4.151000022888184 C0.8309999704360962,4.151000022888184 0.8309999704360962,5.138000011444092 0.8309999704360962,5.138000011444092z'
                  ></path>
                </g>
                <g
                  opacity='1'
                  transform='matrix(1,0,0,1,14.336999893188477,20.33799934387207)'
                >
                  <path
                    fill='rgb(51,60,74)'
                    fill-opacity='1'
                    d=' M0,-1.5269999504089355 C-0.843999981880188,-1.5269999504089355 -1.5269999504089355,-0.8429999947547913 -1.5269999504089355,0 C-1.5269999504089355,0.8429999947547913 -0.843999981880188,1.5269999504089355 0,1.5269999504089355 C0.843999981880188,1.5269999504089355 1.5269999504089355,0.8429999947547913 1.5269999504089355,0 C1.5269999504089355,-0.8429999947547913 0.843999981880188,-1.5269999504089355 0,-1.5269999504089355z'
                  ></path>
                </g>
              </g>
            </g>
          </svg>

          <p className='text-[#4e5968] text-xl text-center font-semibold'>
            검색 결과가 없어요
          </p>
          <p className='text-[#6b7684] font-light text-[0.9rem] text-center leading-6'>
            단어의 철자를 다시 확인해 주세요. <br />
            또는 단어의 수를 줄이거나, 일반적인 검색어로 다시 검색해 보세요.
          </p>
        </div>
      )}

      {isSuccessSearchResult && tagQuery && (
        <div>
          <h2 className='font-bold text-lg text-[#333d4b]'>검색된 태그</h2>
          <Link
            href={`/community/feed?tag=${'테스트'}`}
            className='w-full flex justify-between items-center mt-3 bg-[#f9fafb] p-4 rounded-md'
          >
            <div className='flex items-center gap-x-3'>
              <div
                className='w-fit flex justify-center items-center p-1 rounded-full'
                style={{ background: 'rgba(2, 32, 71, 0.05' }}
              >
                <svg
                  width='24'
                  height='24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  data-v-9b82dcfc=''
                  className=''
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M10.216 5.015a1 1 0 00-1.159.812L8.69 7.909H7a1 1 0 100 2h1.337l-.705 4H6a1 1 0 100 2h1.28l-.307 1.735a1 1 0 001.97.348l.367-2.083h3.969l-.306 1.735a1 1 0 101.97.348l.367-2.083H17a1 1 0 100-2h-1.338l.705-4h1.634a1 1 0 100-2h-1.28l.305-1.735a1 1 0 10-1.97-.347l-.367 2.082h-3.968l.306-1.735a1 1 0 00-.811-1.159zm3.415 8.894l.706-4h-3.969l-.705 4h3.968z'
                    fill='#98A4B7'
                    data-v-9b82dcfc=''
                  ></path>
                </svg>
              </div>
              <div className='flex flex-col items-start text-[#333d4b] font-medium'>
                <span className='text-sm'>{tagQuery}</span>
                <span className='text-xs font-light'>게시글 3개</span>
              </div>
            </div>

            <div>
              {tagSubscribedData.isSubscribed ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpenBottomDrawer(true);
                  }}
                  className='relative w-24 flex justify-center items-center gap-x-[0.175rem] px-7 py-2 rounded-full border border-[#3a8af9]'
                >
                  {tagSubscribedData.isReceiveNotification ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='17.5'
                      viewBox='0 -960 960 960'
                      width='17.5'
                      fill='#3a8af9'
                      className='absolute left-[0.6rem]'
                    >
                      <path d='M200-200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h40q17 0 28.5 11.5T800-240q0 17-11.5 28.5T760-200H200ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Z' />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='17.5'
                      viewBox='0 -960 960 960'
                      width='17.5'
                      fill='#3a8af9'
                      className='absolute left-[0.6rem]'
                    >
                      <path d='M646-200H200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-33 8.5-65t25.5-61l126 126H288L84-764q-11-11-11-28t11-28q11-11 28-11t28 11l680 680q11 11 11.5 27.5T820-84q-11 11-28 11t-28-11L646-200Zm74-251q0 12-7 22t-18 15q-11 5-23 2.5T652-422L367-707q-7-7-10-15t-3-17q0-11 5.5-21.5T375-776q11-5 22-9t23-7v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 85t50 147v109ZM480-80q-30 0-53.5-16.5T403-141q0-8 6.5-13.5T424-160h112q8 0 14.5 5.5T557-141q0 28-23.5 44.5T480-80Z' />
                    </svg>
                  )}

                  <span className='text-[0.8rem] font-medium text-[#3a8af9]'>
                    구독중
                  </span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='25'
                    viewBox='0 -960 960 960'
                    width='25'
                    fill='#3a8af9'
                    className='absolute right-[0.375rem]'
                  >
                    <path d='M480-372.92q-7.23 0-13.46-2.31t-11.85-7.92L274.92-562.92q-8.3-8.31-8.5-20.89-.19-12.57 8.5-21.27 8.7-8.69 21.08-8.69 12.38 0 21.08 8.69L480-442.15l162.92-162.93q8.31-8.3 20.89-8.5 12.57-.19 21.27 8.5 8.69 8.7 8.69 21.08 0 12.38-8.69 21.08L505.31-383.15q-5.62 5.61-11.85 7.92-6.23 2.31-13.46 2.31Z' />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpenSubscribeCompleteToast(false);
                    setIsOpenUnSubscribeCompleteToast(false);

                    setTimeout(() => {
                      setIsOpenSubscribeCompleteToast(true);
                    }, 50);

                    setTagSubscribedData((prevData) => ({
                      ...prevData,
                      isSubscribed: true,
                    }));
                  }}
                  className='flex justify-center items-center gap-x-[0.175rem] px-4 py-2 rounded-md bg-[#3a8af9] hover:bg-[#1b64da]'
                >
                  <span className='text-[0.8rem] font-medium text-white whitespace-nowrap'>
                    구독하기
                  </span>
                </button>
              )}
            </div>
          </Link>
        </div>
      )}

      {isSuccessSearchResult && (query || tagQuery) && (
        <div className='mt-1'>
          <h2 className='font-bold text-lg text-[#333d4b]'>연관 검색 태그</h2>
          <RelatedSearchTagList />
        </div>
      )}

      {isSuccessSearchResult && (query || tagQuery) && (
        <div>
          <h2 className='font-bold text-lg text-[#333d4b]'>커뮤니티 게시글</h2>
          <RelatedSearchPostList searchQuery={searchQuery} />
        </div>
      )}

      {!isSuccessSearchResult && (
        <>
          <div>
            <h2 className='font-bold text-lg text-[#333d4b]'>HOT 태그</h2>
            <HotTagList />
          </div>

          <SwiperBanner />

          <div>
            <h2 className='font-bold text-lg text-[#333d4b]'>실시간 인기 글</h2>
            <HotPostList searchQuery={searchQuery} />
          </div>
        </>
      )}

      {(isOpenSubscribeCompleteToast || isOpenUnSubscribeCompleteToast) && (
        <Toast
          className={`w-fit fixed bottom-14 left-14 bg-[#222222] py-3 pr-5 ${
            isToastClosing ? 'toast-fade-out' : 'toast-fade-in'
          }`}
        >
          <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-green-500 dark:bg-green-800 dark:text-green-200'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='27.5px'
              viewBox='0 -960 960 960'
              width='27.5px'
              fill='#75d5ad'
            >
              <path d='m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z' />
            </svg>
          </div>
          <div className='ml-1 text-[0.825rem] font-medium text-white'>
            {isOpenSubscribeCompleteToast ? (
              <>&quot;{tagQuery}&quot; 구독이 완료되었습니다</>
            ) : (
              <>&quot;{tagQuery}&quot; 구독이 취소되었습니다</>
            )}
          </div>
        </Toast>
      )}

      {(isOpenBottomDrawer || isBottomDrawerClosing) && (
        <div
          className={`z-10 fixed top-0 left-0 flex justify-center place-items-end w-screen h-full bg-[#111827] bg-opacity-50 ${
            isBottomDrawerClosing ? 'fade-out' : 'fade-in'
          } `}
        >
          <div
            ref={drawerRef}
            className={`w-[40rem] h-fit bg-white rounded-t-2xl p-4 pb-8 ${
              isBottomDrawerClosing
                ? 'bottom-drawer-slide-down'
                : 'bottom-drawer-slide-up'
            }`}
          >
            <div className='flex justify-end'>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  closeDrawer();
                }}
                className='p-2'
              >
                <svg
                  stroke='currentColor'
                  fill='none'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                  className='w-6 h-6'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  ></path>
                </svg>
              </button>
            </div>

            <div className='flex flex-col gap-y-3'>
              <div className='flex flex-col items-start gap-y-1 pb-4 border-b'>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setTagSubscribedData((prevData) => ({
                      ...prevData,
                      isReceiveNotification: true,
                    }));

                    handleButtonInBottomDrawaberClick();
                  }}
                  className='w-full py-2 flex items-center gap-x-2'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='20'
                    viewBox='0 -960 960 960'
                    width='20'
                    fill={`${
                      tagSubscribedData.isReceiveNotification
                        ? '#5f646b'
                        : '#a0a5ac'
                    }`}
                  >
                    <path d='M200-200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h40q17 0 28.5 11.5T800-240q0 17-11.5 28.5T760-200H200ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Z' />
                  </svg>
                  <span
                    className={`relative flex items-center text-[0.825rem] ${
                      tagSubscribedData.isReceiveNotification
                        ? 'font-bold'
                        : 'font-medium'
                    }`}
                  >
                    새 글 알림 받기
                    {tagSubscribedData.isReceiveNotification && (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='24px'
                        viewBox='0 -960 960 960'
                        width='24px'
                        fill='#3a8af9'
                        className='absolute right-[-2rem]'
                      >
                        <path d='m382-373.98 333.93-333.93q17.05-16.96 40.18-16.96t40.09 16.75q16.95 16.74 16.95 40.13 0 23.38-16.95 40.34L421.63-253.33q-16.77 16.96-39.54 16.96-22.76 0-39.72-16.96l-176.8-176.56q-16.96-16.93-16.58-40.12.38-23.19 17.13-40.14 16.98-17.2 40.25-17.2 23.26 0 40.22 17.2L382-373.98Z' />
                      </svg>
                    )}
                  </span>
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setTagSubscribedData((prevData) => ({
                      ...prevData,
                      isReceiveNotification: false,
                    }));

                    handleButtonInBottomDrawaberClick();
                  }}
                  className='w-full py-2 flex items-center gap-x-2'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='20'
                    viewBox='0 -960 960 960'
                    width='20'
                    fill={`${
                      !tagSubscribedData.isReceiveNotification
                        ? '#5f646b'
                        : '#a0a5ac'
                    }`}
                  >
                    <path d='M646-200H200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-33 8.5-65t25.5-61l126 126H288L84-764q-11-11-11-28t11-28q11-11 28-11t28 11l680 680q11 11 11.5 27.5T820-84q-11 11-28 11t-28-11L646-200Zm74-251q0 12-7 22t-18 15q-11 5-23 2.5T652-422L367-707q-7-7-10-15t-3-17q0-11 5.5-21.5T375-776q11-5 22-9t23-7v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 85t50 147v109ZM480-80q-30 0-53.5-16.5T403-141q0-8 6.5-13.5T424-160h112q8 0 14.5 5.5T557-141q0 28-23.5 44.5T480-80Z' />
                  </svg>
                  <span
                    className={`relative flex items-center text-[0.825rem] ${
                      !tagSubscribedData.isReceiveNotification
                        ? 'font-bold'
                        : 'font-medium'
                    }`}
                  >
                    새 글 알림 끄기
                    {!tagSubscribedData.isReceiveNotification && (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='24px'
                        viewBox='0 -960 960 960'
                        width='24px'
                        fill='#3a8af9'
                        className='absolute right-[-2rem]'
                      >
                        <path d='m382-373.98 333.93-333.93q17.05-16.96 40.18-16.96t40.09 16.75q16.95 16.74 16.95 40.13 0 23.38-16.95 40.34L421.63-253.33q-16.77 16.96-39.54 16.96-22.76 0-39.72-16.96l-176.8-176.56q-16.96-16.93-16.58-40.12.38-23.19 17.13-40.14 16.98-17.2 40.25-17.2 23.26 0 40.22 17.2L382-373.98Z' />
                      </svg>
                    )}
                  </span>
                </button>
              </div>

              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    setIsOpenSubscribeCompleteToast(false);
                    setIsOpenUnSubscribeCompleteToast(false);

                    setTimeout(() => {
                      setIsOpenUnSubscribeCompleteToast(true);
                    }, 50);

                    setTagSubscribedData((prevData) => ({
                      ...prevData,
                      isSubscribed: false,
                    }));

                    closeDrawer();
                  }}
                  className='w-full flex items-center gap-x-2 py-2'
                >
                  <span className='text-[0.825rem] font-medium'>구독 취소</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
