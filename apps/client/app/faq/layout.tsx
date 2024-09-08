'use client';

import Image from 'next/image';
import magnifierImg from '@/public/images/magnifier.png';
import phoneCallImg from '@/public/images/phone_call.png';
import { FaqTabNameStore } from '@/store/faq/FaqTabName';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import AOS from 'aos';

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  const faqTabName = FaqTabNameStore((state: any) => state.tabName);
  const updateFaqTabName = FaqTabNameStore((state: any) => state.updateTabName);

  const params: any = useParams();
  const faqId = parseInt(params.faqId);

  useEffect(() => {
    if (faqId >= 1 && faqId <= 7) updateFaqTabName('topQuestion');
    else if (faqId >= 8 && faqId <= 13) updateFaqTabName('party');
    else if (faqId >= 14 && faqId <= 20) updateFaqTabName('partyLeader');
    else if (faqId >= 21 && faqId <= 27) updateFaqTabName('partyMember');
    else if (faqId >= 28 && faqId <= 37)
      updateFaqTabName('paymentAndAccumulation');
    else if (faqId >= 38 && faqId <= 42) updateFaqTabName('couponAndPoint');
    else if (faqId >= 43 && faqId <= 50) updateFaqTabName('useBuddy');
  }, [faqId, updateFaqTabName]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center from-[#d0d8f4] to-[#c7def3] bg-[url('/images/faq_page_background.png')] bg-cover bg-center">
        <div className='relative grid grid-cols-1 gap-y-6 w-[42.5rem] py-[5rem]'>
          <h1
            className='text-2xl font-semibold text-[#062e6f]'
            data-aos='fade-zoom-in'
            data-aos-easing='ease-out'
            data-aos-duration='900'
          >
            무엇을 도와드릴까요?
          </h1>
          <div className='relative'>
            <input
              type='text'
              placeholder='무엇이든 찾아보세요'
              className='w-full border-none rounded-lg pl-[2.5rem] py-[0.75rem] placeholder-[#b9b9b9] focus:ring-0'
            />
            <Image
              src={magnifierImg}
              alt='magnifier Image'
              width={20}
              height={0}
              quality={100}
              className='absolute top-[1rem] left-4'
            />
          </div>
          <div className='w-full mx-auto absolute bottom-[1.25rem] mt-3 flex justify-center items-center gap-x-1 text-center'>
            <button
              className={`${
                faqTabName === 'topQuestion'
                  ? 'text-blue-700 font-semibold'
                  : 'text-[#4a4a4a]'
              } w-20 py-2`}
              onClick={() => updateFaqTabName('topQuestion')}
            >
              질문 TOP
            </button>
            <button
              className={`${
                faqTabName === 'party'
                  ? 'text-blue-700 font-semibold'
                  : 'text-[#4a4a4a]'
              } w-20 py-2`}
              onClick={() => updateFaqTabName('party')}
            >
              파티
            </button>
            <button
              className={`${
                faqTabName === 'partyLeader'
                  ? 'text-blue-700 font-semibold'
                  : 'text-[#4a4a4a]'
              } w-20 py-2`}
              onClick={() => updateFaqTabName('partyLeader')}
            >
              파티장
            </button>
            <button
              className={`${
                faqTabName === 'partyMember'
                  ? 'text-blue-700 font-semibold'
                  : 'text-[#4a4a4a]'
              } w-20 py-2`}
              onClick={() => updateFaqTabName('partyMember')}
            >
              파티원
            </button>
            <button
              className={`${
                faqTabName === 'paymentAndAccumulation'
                  ? 'text-blue-700 font-semibold'
                  : 'text-[#4a4a4a]'
              } w-20 py-2`}
              onClick={() => updateFaqTabName('paymentAndAccumulation')}
            >
              결제/적립
            </button>
            <button
              className={`${
                faqTabName === 'couponAndPoint'
                  ? 'text-blue-700 font-semibold'
                  : 'text-[#4a4a4a]'
              } w-20 py-2`}
              onClick={() => updateFaqTabName('couponAndPoint')}
            >
              쿠폰/포인트
            </button>
            <button
              className={`${
                faqTabName === 'useBuddy'
                  ? 'text-blue-700 font-semibold'
                  : 'text-[#4a4a4a]'
              } w-20 py-2`}
              onClick={() => updateFaqTabName('useBuddy')}
            >
              버디 이용
            </button>
          </div>
        </div>
      </div>

      {children}

      <div className='mt-[5rem] bg-[#eff6f3]'>
        <div className='relative flex mx-auto w-[40rem] '>
          <div className='grid grid-cols-1 gap-y-3  py-10'>
            <h1 className='text-2xl font-semibold tracking-wide text-[#323a48]'>
              문제가 아직 해결되지 않았다면 <br />
              언제든 연락해 주세요.
            </h1>
            <p className='text-[#727f89] text-base'>버디 고객센터</p>
            <div className='mt-8 flex gap-x-9'>
              <div>
                <p className='text-[#727f89] text-sm font-light'>
                  피해・사기 상담
                </p>
                <p className='text-[#4b5563] text-lg font-medium'>1551-4501</p>
              </div>
              <div className='border-[0.5px] border-[#d9e1df]' />
              <div>
                <p className='text-[#727f89] text-sm font-light'>일반 상담</p>
                <p className='text-[#4b5563] text-lg font-medium'>1522-4502</p>
              </div>
            </div>
          </div>

          <Image
            src={phoneCallImg}
            alt='phoneCallImage'
            width={115}
            height={0}
            quality={100}
            className='absolute right-16 bottom-0'
          />
        </div>
      </div>
    </div>
  );
}
