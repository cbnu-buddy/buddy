import React from 'react';

export default function EmptySearchTagListItem() {
  return (
    <div className='w-full bg-white hover:bg-[#f2f4f6] p-[0.4rem] rounded-md'>
      <span className='text-[#888e96] text-[0.825rem] font-extralight'>
        검색 결과가 없습니다.
      </span>
    </div>
  );
}
