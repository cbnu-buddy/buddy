import Image from 'next/image';
import { useRouter } from 'next/navigation';
import testImg from '@/public/images/test.jpg';
import { TagInfo } from '@/types/tag';
import Link from 'next/link';

interface HotTagListItemProps {
  tagInfo: TagInfo;
}

export default function HotTagListItem(props: HotTagListItemProps) {
  const { tagInfo } = props;

  const router = useRouter();

  return (
    <Link
      href={`/community/feed?tag=${tagInfo.tag}`}
      className='flex items-center gap-x-3 h-[2.6rem]'
    >
      <div
        className='flex justify-center items-center p-1 rounded-full'
        style={{ background: 'rgba(2, 32, 71, 0.05' }}
      >
        <svg
          width='24'
          height='24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          data-v-9b82dcfc=''
          className=''
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M10.216 5.015a1 1 0 00-1.159.812L8.69 7.909H7a1 1 0 100 2h1.337l-.705 4H6a1 1 0 100 2h1.28l-.307 1.735a1 1 0 001.97.348l.367-2.083h3.969l-.306 1.735a1 1 0 101.97.348l.367-2.083H17a1 1 0 100-2h-1.338l.705-4h1.634a1 1 0 100-2h-1.28l.305-1.735a1 1 0 10-1.97-.347l-.367 2.082h-3.968l.306-1.735a1 1 0 00-.811-1.159zm3.415 8.894l.706-4h-3.969l-.705 4h3.968z'
            fill='#98A4B7'
            data-v-9b82dcfc=''
          ></path>
        </svg>
      </div>
      <div className='w-full overflow-hidden whitespace-nowrap text-ellipsis text-[0.825rem] text-[#333d4b] font-medium'>
        {tagInfo.tag}
      </div>
    </Link>
  );
}
