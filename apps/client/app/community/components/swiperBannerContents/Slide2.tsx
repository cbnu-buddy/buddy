import Image from 'next/image';
import { FC } from 'react';
import communityBannerImg2 from '@/public/images/community_banner2.png';

interface Slide2Props {
  handlePrev: () => void;
  handleNext: () => void;
}

export const Slide2: FC<Slide2Props> = ({ handlePrev, handleNext }) => {
  return (
    <a
      target='_blank'
      href='https://youtu.be/nc_tUZmDbtE?si=HzfixQMRlIo4kIXi'
      className='flex w-full h-[90px]'
    >
      <Image
        src={communityBannerImg2}
        alt='communityBannerImage2'
        fill
        // 이미지 비율 유지하며 부모 요소에 맞춤
        quality={100}
        className='rounded-md object-cover'
      />
    </a>
  );
};
