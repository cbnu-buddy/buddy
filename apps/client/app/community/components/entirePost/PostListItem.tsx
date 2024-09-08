import { PostInfo } from '@/types/post';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import testImg from '@/public/images/test.jpg';
import Link from 'next/link';
import { timeAgo } from '@/utils/formatDate';

interface TagPostListItemProps {
  postInfo: PostInfo;
  index: number;
  length: number;
}

export default function PostListItem(props: TagPostListItemProps) {
  const { postInfo, index, length } = props;

  const router = useRouter();

  return (
    <Link
      href={`/community/post/${postInfo.postId}`}
      className='flex justify-between h-[5.5rem] px-[0.9rem] bg-[#f9fafb] rounded-md hover:scale-105 hover:bg-[#f2f4f6] duration-200'
    >
      <div className='w-full flex justify-between'>
        <div className='w-full flex flex-col justify-start gap-y-1 py-3'>
          <div className='flex items-center gap-x-[0.375rem]'>
            <div className='relative w-[30px] h-[30px]'>
              <Image
                src='https://avatars.githubusercontent.com/u/119295431?v=4'
                alt='profileImage'
                fill
                quality={100}
                className='rounded-full'
              />
            </div>
            <span className='text-xs text-[#4e5968]'>
              {postInfo.author.username}
            </span>
          </div>
          <p className='text-[#333d4b] font-medium'>{postInfo.title}</p>
        </div>

        <div className='flex flex-col justify-between py-3'>
          <div className='text-xs text-[#4e5968] text-right'>
            {timeAgo(postInfo.createdAt)}
          </div>
          <div className='relative w-[85px] h-[45px]'>
            <Image
              src={testImg}
              alt='main_1Image'
              fill
              quality={100}
              className='rounded-[0.275rem]'
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
