'use client';

import React from 'react';
import Lottie from 'react-lottie-player';
import dotLoadingLottieJson from '@/public/json/dot_loading.json';

export default function LottieDotLoading() {
  return (
    <Lottie
      loop
      animationData={dotLoadingLottieJson}
      play
      className='w-14 absolute right-0 bottom-[-0.25rem]'
    />
  );
}
