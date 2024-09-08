'use client';

import SwiperBanner from './components/SwiperBanner';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import main_1Img from '@/public/images/main_1.png';
import main_2Img from '@/public/images/main_2.png';
import main_3Img from '@/public/images/main_3.png';
import Link from 'next/link';
import ChannelService from '@/third-party/ChannelTalk';
import Footer from './components/Footer';

export default function Home() {
  const scrollRef: any = useRef(null);

  const handleButtonClick = () => {
    // 해당 요소로 스크롤
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const CT = new ChannelService();
    CT.loadScript();
    CT.boot({ pluginKey: process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY! });

    AOS.init();

    //for unmount
    return () => {
      CT.shutdown();
    };
  }, []);

  return (
    <div>
      <div className='relative flex flex-col items-center gap-7'>
        <SwiperBanner />
        <button className='mt-4' onClick={handleButtonClick}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='67.5'
            viewBox='0 -960 960 960'
            width='67.5'
            fill='#939baa'
            className='animate-[bounce_1.5s_infinite]'
          >
            <path d='M480-385.077q-6.462 0-11.923-2.115-5.462-2.116-10.692-7.346L281.846-570.077q-5.615-5.615-6-13.769-.385-8.154 6-14.539 6.385-6.384 14.154-6.384t14.154 6.384L480-428.539l169.846-169.846q5.615-5.615 13.769-6 8.154-.384 14.539 6 6.385 6.385 6.385 14.154 0 7.77-6.385 14.154L502.615-394.538q-5.23 5.23-10.692 7.346-5.461 2.115-11.923 2.115Z' />
          </svg>
        </button>

        <div className='mb-[-5.5rem]' ref={scrollRef} />

        <div className='w-[55rem] flex justify-between items-start mt-[10rem]'>
          <div
            className='flex flex-col justify-center gap-6 mt-20'
            data-aos='fade-up'
            data-aos-offset='300'
            data-aos-easing='ease-out'
            data-aos-duration='875'
          >
            <h1 className='text-[2.75rem] font-bold tracking-wide leading-[1.4] text-[#1a1f27]'>
              안전하고 편리하게, <br />
              매달 자동 정산.
            </h1>
            <p className='text-xl text-[#353d4a]'>
              월 단위 에스크로 시스템을 통해 금전 거래를 <br />
              안전하게 보장하고, 매달 버디 정산일에 <br />
              파티 요금을 자동으로 정산해요.
            </p>
          </div>
          <Image
            src={main_1Img}
            alt='main_1Image'
            width={300}
            height={0}
            quality={100}
            className='drop-shadow-2xl'
            data-aos='fade-up'
            data-aos-offset='300'
            data-aos-easing='ease-out'
            data-aos-duration='500'
          />
        </div>
        <div className='relative w-[55rem] flex justify-between items-center mt-[-7.5rem] mb-[7.5rem]'>
          <div
            data-aos='fade-up'
            data-aos-offset='300'
            data-aos-easing='ease-out'
            data-aos-duration='500'
          >
            <Image
              src={main_2Img}
              alt='main_2Image'
              width={300}
              height={0}
              quality={100}
              className='drop-shadow-2xl'
            />
            <Image
              src={main_3Img}
              alt='main_3Image'
              width={300}
              height={0}
              quality={100}
              className='absolute left-[8.75rem] top-[-1.75rem] drop-shadow-2xl'
            />
          </div>
          <div
            className='flex flex-col justify-center gap-6 mt-28 mr-5'
            data-aos='fade-up'
            data-aos-offset='200'
            data-aos-easing='ease-out'
            data-aos-duration='875'
          >
            <p className='text-xl text-[#353d4a]'>
              버디에서는 보증금과 위약금 정책을 <br />
              통해 파티원의 이탈을 최소화하여 <br />
              파티를 안정적으로 유지하고 있어요.
            </p>
          </div>
        </div>
        <div className='w-full flex justify-center items-start bg-[#f9fafb] py-[5rem] pb-[10rem]'>
          <div className='w-[55rem]'>
            <div
              className='flex flex-col justify-center gap-6 mt-20'
              data-aos='fade-up'
              data-aos-easing='ease-out'
              data-aos-duration='875'
            >
              <h1 className='text-[2.75rem] font-bold tracking-wide leading-[1.4] text-[#1a1f27]'>
                지금 바로, 버디에서 <br />
                새롭게 만나보세요
              </h1>
              <div className='grid grid-cols-2 gap-10 gap-y-24 mt-12'>
                <div className='flex flex-col gap-7'>
                  <Link
                    href='/add-party'
                    className='w-fit bg-[#f3f4f5] p-7 rounded-2xl hover:brightness-[96%]'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      className='w-12'
                    >
                      <g fill='#ffa3ab'>
                        <circle cx='7.5' cy='7.9' r='3.8'></circle>
                        <path d='M7.5 12.8c-5 0-7 3.4-7 5s4.2 2 7 2 7-.4 7-2-2-5-7-5z'></path>
                      </g>
                      <g fill='#ff2b4c'>
                        <circle cx='16.5' cy='7.9' r='3.8'></circle>
                        <path d='M16.5 12.8c-5 0-7 3.4-7 5s4.2 2 7 2 7-.4 7-2-2-5-7-5z'></path>
                      </g>
                    </svg>
                  </Link>
                  <div>
                    <h2 className='text-lg font-medium'>파티 만들기</h2>
                    <p className='text-[#8b95a1] text-base mt-2'>
                      홀로 이용하기엔 부담스러웠던 <br />
                      다양한 서비스를 공유해 보세요.
                    </p>
                  </div>
                </div>

                <div className='flex flex-col gap-7'>
                  <Link
                    href='/join-party'
                    className='w-fit bg-[#eaf3fe] p-[1.925rem] rounded-2xl hover:brightness-[96%]'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='47.5'
                      viewBox='0 -960 960 960'
                      width='47.5'
                      fill='#4696fc'
                    >
                      <path d='M440.01-489.609q-73.923 0-126.576-52.643-52.652-52.642-52.652-126.566 0-73.923 52.642-126.293 52.643-52.37 126.566-52.37t126.576 52.48q52.652 52.479 52.652 126.173 0 73.928-52.642 126.573-52.643 52.646-126.566 52.646ZM855.435-30.477l-84.739-84.173q-20.434 11.434-43.711 18.304-23.276 6.87-49.462 6.87-80.417 0-136.709-56.293-56.292-56.291-56.292-136.708t56.292-136.709q56.292-56.292 136.709-56.292t136.708 56.292q56.292 56.292 56.292 136.709 0 26.186-6.869 49.462-6.87 23.277-18.304 43.711l84.738 84.739q15.522 15.522 15.522 37.044t-15.522 37.044q-15.522 15.522-37.327 15.522-21.804 0-37.326-15.522ZM677.387-195.478q36.483 0 61.809-25.191 25.326-25.19 25.326-61.673 0-36.483-25.191-61.809-25.19-25.326-61.673-25.326-36.483 0-61.809 25.191-25.326 25.19-25.326 61.673 0 36.483 25.191 61.809 25.19 25.326 61.673 25.326ZM462.479-448.479q-56.131 67.088-58.392 156.675-2.261 89.588 45.957 160.632H206.783q-44.305 0-75.153-30.849-30.848-30.848-30.848-75.153v-25.347q0-39.223 20.108-72.677 20.109-33.454 54.631-50.715 51.566-26.566 124.327-46.544 72.761-19.978 162.631-16.022Z' />
                    </svg>
                  </Link>
                  <div>
                    <h2 className='text-lg font-medium'>파티 찾기</h2>
                    <p className='text-[#8b95a1] text-base mt-2'>
                      이용 서비스는 물론 파티 스케줄까지 <br />내 맘에 쏙 드는
                      파티를 찾아보세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
