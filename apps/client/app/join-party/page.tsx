'use client';

import Image, { StaticImageData } from 'next/image';
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import hotImg from '@/public/images/hot.png';
import eventImg from '@/public/images/event.png';
import newImg from '@/public/images/new.png';
import SelectMembershipPlanModal from './components/SelectMembershipPlanModal';
import { PartySelectedPlanInfoStore } from '@/store/party/PartySelectedPlanInfo';
import { partySelectedPlanInfos } from '@/data/partySelectedPlanInfos';
import { PartySelectedPlanInfo } from '../../types/partySelectedPlan';

export default function JoinParty() {
  const [categoryTabName, setCategoryTabName] = useState('all');

  const updateSelectedPlanInfo = PartySelectedPlanInfoStore(
    (state: any) => state.updateSelectedPlanInfo
  );

  const [openSelectMembershipPlanModal, setOpenSelectMembershipPlanModal] =
    useState<string | undefined>();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className='flex justify-center bg-[#f4f4f9] text-center'>
      <div className='w-[55rem] mt-10 mb-[3rem]'>
        <h1 className='text-[1.375rem] leading-[2] font-semibold'>
          어떤 파티를 찾고 있나요?
        </h1>

        <div className='relative mx-auto w-fit'>
          <div className='w-full mt-6 flex justify-center items-center gap-x-1 text-center'>
            <button
              className={`${
                categoryTabName === 'all'
                  ? 'text-blue-700 font-semibold'
                  : 'text-[#4a4a4a]'
              } w-20 py-2 duration-300`}
              onClick={() => setCategoryTabName('all')}
            >
              전체
            </button>
            <button
              className={`${
                categoryTabName === 'media'
                  ? 'text-blue-700 font-semibold'
                  : 'text-[#4a4a4a]'
              } w-20 py-2`}
              onClick={() => setCategoryTabName('media')}
            >
              영상
            </button>
            <button
              className={`${
                categoryTabName === 'book'
                  ? 'text-blue-700 font-semibold'
                  : 'text-[#4a4a4a]'
              } w-20 py-2`}
              onClick={() => setCategoryTabName('book')}
            >
              도서
            </button>
            <button
              className={`${
                categoryTabName === 'music'
                  ? 'text-blue-700 font-semibold'
                  : 'text-[#4a4a4a]'
              } w-20 py-2`}
              onClick={() => setCategoryTabName('music')}
            >
              음악
            </button>
          </div>
          <div
            className={`absolute border-b-2 border-blue-700 w-7 duration-300 rounded-md ${
              categoryTabName === 'all'
                ? 'left-[1.625rem]'
                : categoryTabName === 'media'
                ? 'left-[6.85rem]'
                : categoryTabName === 'book'
                ? 'left-[12.075rem]'
                : 'left-[17.35rem]'
            }`}
          />
        </div>

        <div
          className='grid grid-cols-6 gap-x-3 gap-y-3 mt-7'
          data-aos='fade-up'
          data-aos-easing='ease-out'
          data-aos-duration='375'
        >
          {partySelectedPlanInfos.map(
            (partySelectedPlanInfo: PartySelectedPlanInfo, idx) =>
              (categoryTabName === partySelectedPlanInfo.category ||
                categoryTabName === 'all') && (
                <button
                  key={idx}
                  className='flex flex-col items-center p-2 bg-white rounded-lg h-44 w-32 hover:scale-105 duration-300 ease-out'
                  onClick={() => {
                    setOpenSelectMembershipPlanModal('default');
                    updateSelectedPlanInfo(partySelectedPlanInfo);
                  }}
                >
                  <Image
                    src={partySelectedPlanInfo.iconImg}
                    alt={partySelectedPlanInfo.iconImgAlt}
                    width={85}
                    height={0}
                    quality={100}
                    className='
          mt-3'
                  />
                  <p className='mt-3'>{partySelectedPlanInfo.name}</p>
                  <p className='mt-[0.375rem] text-[#8b8b8b] text-[0.5rem] leading-[1] line-through font-extralight'>
                    월{' '}
                    {partySelectedPlanInfo.planDetailInfos[
                      partySelectedPlanInfo.planDetailInfos.length - 1
                    ].price.toLocaleString()}
                    원
                  </p>
                  <p className='flex items-center gap-1 mt-1 text-[#656565] text-xs font-medium'>
                    {(
                      partySelectedPlanInfo.planDetailInfos[
                        partySelectedPlanInfo.planDetailInfos.length - 1
                      ].price /
                      partySelectedPlanInfo.planDetailInfos[
                        partySelectedPlanInfo.planDetailInfos.length - 1
                      ].maxPartyMemberNum
                    ).toLocaleString()}
                    원{' '}
                    {partySelectedPlanInfo.tagName === 'hot' ? (
                      <span>
                        <Image
                          src={hotImg}
                          alt='hot image'
                          width={35}
                          height={0}
                          quality={100}
                          className=''
                        />
                      </span>
                    ) : partySelectedPlanInfo.tagName === 'event' ? (
                      <span>
                        <Image
                          src={eventImg}
                          alt='event image'
                          width={35}
                          height={0}
                          quality={100}
                          className=''
                        />
                      </span>
                    ) : null}
                  </p>
                </button>
              )
          )}

          {openSelectMembershipPlanModal && (
            <SelectMembershipPlanModal
              openSelectMembershipPlanModal={openSelectMembershipPlanModal}
              setOpenSelectMembershipPlanModal={
                setOpenSelectMembershipPlanModal
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
