'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import { useState } from 'react';
import { Slide1 } from './swiperBannerContents/Slide1';
import { Slide2 } from './swiperBannerContents/Slide2';

import SwiperCore from 'swiper';
import SwiperClass from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function SwiperBanner() {
  SwiperCore.use([Keyboard, Autoplay]);

  const [swiper, setSwiper] = useState<SwiperClass>(); // -> 슬라이드용
  const [currentSlide, setCurrentSlide] = useState(1); // 현재 슬라이드 번호 저장

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
  ];

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentSlide(swiper.realIndex + 1);
  };

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
        onSlideChange={handleSlideChange} // 슬라이드 변경 시 이벤트 핸들러 추가
      >
        {slideData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <slide.component />
          </SwiperSlide>
        ))}

        <div
          className='absolute right-[0.5rem] bottom-[0.5rem] w-10 h-[1.175rem] flex justify-center items-center rounded-xl z-10'
          style={{ background: 'rgba(16, 19, 34, 0.6)' }}
        >
          <span className='text-[0.5rem] text-white'>{`${currentSlide} / ${slideData.length}`}</span>
        </div>
      </Swiper>
    </div>
  );
}
