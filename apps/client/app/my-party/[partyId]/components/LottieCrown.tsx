'use client';

import React from 'react';
import Lottie from 'react-lottie-player';
import crownLottieJson from '@/public/json/crown.json';

export default function LottieCrown() {
  return (
    <Lottie
      loop
      speed={0.5}
      animationData={crownLottieJson}
      play
      className='scale-[0.3] absolute top-[-2.75rem] left-[-2.75rem]'
    />
  );
}
