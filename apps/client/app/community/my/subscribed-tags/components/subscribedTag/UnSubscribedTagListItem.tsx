import { MySubscribedTagInfo } from '@/types/tag';
import Link from 'next/link';

interface UnSubscribedTagListItemProps {
  setResData: React.Dispatch<React.SetStateAction<MySubscribedTagInfo[]>>;
  mySubscribedTagInfo: MySubscribedTagInfo;
  selectedTagInfo: {
    tagId: number;
    tag: string;
  };
  setSelectedTagInfo: React.Dispatch<
    React.SetStateAction<{
      tagId: number;
      tag: string;
      isReceiveNotification: boolean;
    }>
  >;
  setIsOpenSubscribeCompleteToast: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setIsOpenUnSubscribeCompleteToast: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function UnSubscribedTagListItem(
  props: UnSubscribedTagListItemProps
) {
  const {
    setResData,
    mySubscribedTagInfo,
    selectedTagInfo,
    setSelectedTagInfo,
    setIsOpenSubscribeCompleteToast,
    setIsOpenUnSubscribeCompleteToast,
  } = props;

  return (
    <Link
      href={`/community/feed?tag=${mySubscribedTagInfo.tag}`}
      className='w-full flex justify-between items-center bg-[#f9fafb] p-4 rounded-md'
    >
      <div className='flex items-center gap-x-3'>
        <div
          className='w-fit flex justify-center items-center p-1 rounded-full'
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
        <div className='flex flex-col items-start text-[#333d4b] font-medium'>
          <span className='text-sm'>{mySubscribedTagInfo.tag}</span>
          <span className='text-xs font-light'>게시글 3개</span>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpenSubscribeCompleteToast(false);
          setIsOpenUnSubscribeCompleteToast(false);

          setTimeout(() => {
            setIsOpenSubscribeCompleteToast(true);
          }, 50);

          setSelectedTagInfo(mySubscribedTagInfo);

          setResData((prevData) =>
            prevData.map((item) =>
              item.tagId === mySubscribedTagInfo.tagId
                ? {
                    ...item,
                    isSubscribed: true,
                  }
                : item
            )
          );
        }}
        className='relative w-24 flex justify-center items-center gap-x-[0.175rem] px-7 py-2 rounded-full bg-[#3a8af9] border border-[#3a8af9]'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='17.5'
          viewBox='0 -960 960 960'
          width='17.5'
          fill='white'
          className='absolute left-[0.6rem]'
        >
          <path d='M200-200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h40q17 0 28.5 11.5T800-240q0 17-11.5 28.5T760-200H200ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Z' />
        </svg>
        <span className='ml-3 text-[0.8rem] font-medium text-white whitespace-nowrap'>
          구독하기
        </span>
      </button>
    </Link>
  );
}
