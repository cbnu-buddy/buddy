'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import { useState } from 'react';
import { Slide1 } from './swiperBannerContents/Slide1';
import { Slide2 } from './swiperBannerContents/Slide2';
import { Slide3 } from './swiperBannerContents/Slide3';

import SwiperCore from 'swiper';
import SwiperClass from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function SwiperBanner() {
  SwiperCore.use([Keyboard, Autoplay]);

  const [swiper, setSwiper] = useState<SwiperClass>(); // -> 슬라이드용

  const handlePrev = () => {
    swiper?.slidePrev();
  };
  const handleNext = () => {
    swiper?.slideNext();
  };

  const slideData = [
    {
      id: 1,
      component: () => (
        <Slide1 handlePrev={handlePrev} handleNext={handleNext} />
      ),
    },
    {
      id: 2,
      component: () => (
        <Slide2 handlePrev={handlePrev} handleNext={handleNext} />
      ),
    },
    {
      id: 3,
      component: () => (
        <Slide3 handlePrev={handlePrev} handleNext={handleNext} />
      ),
    },
  ];

  return (
    <div className='swiper-container w-full'>
      <Swiper
        loop={true} // 슬라이드 루프
        speed={1500}
        spaceBetween={50} // 슬라이스 사이 간격
        slidesPerView={1} // 보여질 슬라이스 수
        keyboard={{
          enabled: true,
        }}
        onSwiper={(e) => {
          setSwiper(e);
        }}
        autoplay={{
          delay: 5000,
        }}
      >
        {slideData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <slide.component />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
