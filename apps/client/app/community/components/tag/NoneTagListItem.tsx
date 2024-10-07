import Image from 'next/image';
import React from 'react';
import warningGrayImg from '@/public/images/warning_icon_gray.png';

export default function NoneTagListItem() {
  return (
    <div className='mt-5 mb-2 w-full flex flex-col gap-y-3 items-center'>
      <Image
        src={warningGrayImg}
        alt='warning icon image'
        width={35}
        height={35}
        quality={100}
      />
      <p className='text-[#9b9b9b] text-xs'>등록된 태그 정보가 없습니다</p>
    </div>
  );
}
