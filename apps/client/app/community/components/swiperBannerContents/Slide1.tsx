import Image from 'next/image';
import { FC } from 'react';
import communityBannerImg from '@/public/images/community_banner.png';

interface Slide1Props {
  handlePrev: () => void;
  handleNext: () => void;
}

export const Slide1: FC<Slide1Props> = ({ handlePrev, handleNext }) => {
  return (
    <a
      target='_blank'
      href='https://youtu.be/Gl_LxjQ_Luo?si=nTWjc-8V4qIjhBau'
      className='flex w-full h-[90px]'
    >
      <Image
        src={communityBannerImg}
        alt='communityBannerImage'
        fill
        // 이미지 비율 유지하며 부모 요소에 맞춤
        quality={100}
        className='rounded-md object-cover'
      />
    </a>
  );
};
