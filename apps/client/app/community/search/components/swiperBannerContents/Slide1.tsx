import Image from 'next/image';
import { FC } from 'react';
import communitySearchBanner from '@/public/images/community_search_banner.png';

interface Slide1Props {
  handlePrev: () => void;
  handleNext: () => void;
}

export const Slide1: FC<Slide1Props> = ({ handlePrev, handleNext }) => {
  return (
    <a
      target='_blank'
      href='https://www.youtube.com/watch?v=v7cqB-Ga_V8'
      className='flex w-full h-[90px]'
    >
      <Image
        src={communitySearchBanner}
        alt='communitySearchBannerImage'
        fill
        // 이미지 비율 유지하며 부모 요소에 맞춤
        quality={100}
        className='rounded-md'
      />
    </a>
  );
};
