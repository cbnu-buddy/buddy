import Image from 'next/image';
import React from 'react';
import warningGrayImg from '@/public/images/warning_icon_gray.png';

export default function EmptyFeedPostListItem() {
  return (
    <div className='mt-20 w-full flex flex-col gap-y-3 items-center'>
      <Image
        src={warningGrayImg}
        alt='warning icon image'
        width={35}
        height={35}
        quality={100}
      />
      <p className='text-[#9b9b9b] text-xs'>등록된 게시글 정보가 없습니다</p>
    </div>
  );
}
