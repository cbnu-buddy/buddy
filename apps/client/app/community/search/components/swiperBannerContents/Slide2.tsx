import Image from 'next/image';
import { FC } from 'react';
import communitySearchBanner2 from '@/public/images/community_search_banner2.png';

interface Slide2Props {
  handlePrev: () => void;
  handleNext: () => void;
}

export const Slide2: FC<Slide2Props> = ({ handlePrev, handleNext }) => {
  return (
    <a
      target='_blank'
      href='https://genietvmobile.com/bridge/?sw=app&type=appweb&url=https://view.seezntv.com/gtv_gw/webview/event/detail?event_id=E151&route=kinoad'
      className='flex w-full h-[90px]'
    >
      <Image
        src={communitySearchBanner2}
        alt='communitySearchBannerImage2'
        fill
        // 이미지 비율 유지하며 부모 요소에 맞춤
        quality={100}
        className='rounded-md object-cover'
      />
    </a>
  );
};
