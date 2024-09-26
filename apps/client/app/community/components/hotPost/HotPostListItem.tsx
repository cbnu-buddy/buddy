import { PostInfo } from '@/types/post';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import testImg from '@/public/images/test.jpg';
import Link from 'next/link';

interface HotPostListItemProps {
  postInfo: PostInfo;
  index: number;
  length: number;
}

export default function HotPostListItem(props: HotPostListItemProps) {
  const { postInfo, index, length } = props;

  const router = useRouter();

  return (
    <Link
      href={`/community/post/${postInfo.postId}`}
      className='flex justify-between h-[5rem] px-[0.9rem] py-[0.175rem] bg-[#f9fafb] rounded-md hover:scale-105 hover:bg-[#f2f4f6] duration-200'
    >
      <div className='w-full flex justify-between'>
        <div className='w-full flex flex-col justify-between py-3 '>
          <p className='text-[#333d4b] font-medium'>{postInfo.title}</p>
          <p className='text-xs text-[#4e5968]'>{postInfo.author.username}</p>
        </div>
        <div className='relative flex justify-center items-center'>
          <div className='relative w-[100px] h-[65px]'>
            <Image
              src={testImg}
              alt='main_1Image'
              fill
              quality={100}
              className='rounded-md object-cover'
            />
            <div
              className='absolute right-[0.175rem] bottom-[0.175rem] w-6 h-5 flex justify-center items-center rounded-xl'
              style={{ background: 'rgba(16, 19, 34, 0.6)' }}
            >
              <span className='text-white text-xs'>
                {postInfo.postImagePathUrls.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
