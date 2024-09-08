import { PostInfo } from '@/types/post';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import testImg from '@/public/images/test.jpg';
import Link from 'next/link';
import { TagInfo } from '@/types/tag';

interface TagListItemProps {
  tagInfo: TagInfo;
  index: number;
  length: number;
  selectedTagInfo: TagInfo;
  setSelectedTagInfo: React.Dispatch<React.SetStateAction<TagInfo>>;
}

export default function TagListItem(props: TagListItemProps) {
  const { tagInfo, index, length, selectedTagInfo, setSelectedTagInfo } = props;

  const router = useRouter();

  const isSelectedTag: boolean = tagInfo.tagId === selectedTagInfo.tagId;

  return (
    <button
      key={tagInfo.tagId}
      onClick={() => {
        setSelectedTagInfo(tagInfo);
      }}
      className={`w-fit flex justify-center items-center pl-2 pr-[0.825rem] py-[0.325rem] ${
        !isSelectedTag ? 'bg-[#e8f3ff] hover:bg-[#c9e2ff]' : 'bg-[#3183f6]'
      }  rounded-full`}
    >
      <svg
        width='20'
        height='20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        data-v-9b82dcfc=''
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10.216 5.015a1 1 0 00-1.159.812L8.69 7.909H7a1 1 0 100 2h1.337l-.705 4H6a1 1 0 100 2h1.28l-.307 1.735a1 1 0 001.97.348l.367-2.083h3.969l-.306 1.735a1 1 0 101.97.348l.367-2.083H17a1 1 0 100-2h-1.338l.705-4h1.634a1 1 0 100-2h-1.28l.305-1.735a1 1 0 10-1.97-.347l-.367 2.082h-3.968l.306-1.735a1 1 0 00-.811-1.159zm3.415 8.894l.706-4h-3.969l-.705 4h3.968z'
          data-v-9b82dcfc=''
          className={`${isSelectedTag ? 'fill-white' : 'fill-[#3a8af9] '}`}
        ></path>
      </svg>
      <span
        className={`${
          !isSelectedTag ? 'text-[#3a8af9]' : 'text-white'
        }  font-medium`}
      >
        {tagInfo.tag}
      </span>
    </button>
  );
}
