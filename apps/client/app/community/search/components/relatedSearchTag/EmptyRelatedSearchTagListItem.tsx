import Image from 'next/image';
import React from 'react';
import warningGrayImg from '@/public/images/warning_icon_gray.png';

export default function EmptyRelatedSearchTagListItem() {
  return (
    <div className='mt-16 mb-4 flex flex-col gap-y-3 items-center'>
      <Image
        src={warningGrayImg}
        alt='warning icon image'
        width={35}
        height={35}
        quality={100}
      />
      <p className='text-[#9b9b9b] text-xs'>연관 태그 정보가 없습니다</p>
    </div>
  );
}
