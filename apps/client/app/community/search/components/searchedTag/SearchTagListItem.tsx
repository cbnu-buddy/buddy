import React from 'react';
import { useRouter } from 'next/navigation';
import { TagInfo } from '@/types/tag';

interface HotTagListItemProps {
  tagInfo: TagInfo;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setIsSUccessSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
  itemRef: React.RefObject<HTMLButtonElement>; // Add this line
  className: string; // Add this line
}

export default function SearchTagListItem(props: HotTagListItemProps) {
  const {
    tagInfo,
    setSearchQuery,
    setIsSUccessSearchResult,
    itemRef,
    className,
  } = props; // Add itemRef and className

  const router = useRouter();

  return (
    <button
      ref={itemRef} // Add this line
      onClick={() => {
        setSearchQuery(tagInfo.tag);
        router.push(`/community/search?tag=${encodeURIComponent(tagInfo.tag)}`);
        setIsSUccessSearchResult(true);
      }}
      className={`w-full flex items-center gap-x-3 bg-white hover:bg-[#f2f4f6] focus:bg-[#f2f4f6] focus:outline-none p-[0.4rem] rounded-md ${className}`} // Add className
    >
      <svg
        width='32.5'
        height='32.5'
        fill='#8994a2'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        data-v-9b82dcfc=''
        className='p-[0.325rem] rounded-full'
        style={{ background: 'rgba(2, 32, 71, 0.05' }}
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10.216 5.015a1 1 0 00-1.159.812L8.69 7.909H7a1 1 0 100 2h1.337l-.705 4H6a1 1 0 100 2h1.28l-.307 1.735a1 1 0 001.97.348l.367-2.083h3.969l-.306 1.735a1 1 0 101.97.348l.367-2.083H17a1 1 0 100-2h-1.338l.705-4h1.634a1 1 0 100-2h-1.28l.305-1.735a1 1 0 10-1.97-.347l-.367 2.082h-3.968l.306-1.735a1 1 0 00-.811-1.159zm3.415 8.894l.706-4h-3.969l-.705 4h3.968z'
          fill='#8994a2'
          stroke='#8994a2'
          strokeWidth='0.1'
        ></path>
      </svg>

      <span className='text-inherit font-medium'>{tagInfo.tag}</span>
    </button>
  );
}
