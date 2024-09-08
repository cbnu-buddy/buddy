'use client';

import React from 'react';
import Lottie from 'react-lottie-player';
import checkLottieJson from '@/public/json/check.json';

export default function LottieCheck() {
  return (
    <Lottie
      loop={false}
      speed={0.5}
      animationData={checkLottieJson}
      play
      className=''
    />
  );
}
