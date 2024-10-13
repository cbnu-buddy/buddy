import { PostInfo } from '@/types/post';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import testImg from '@/public/images/test.jpg';
import Link from 'next/link';

interface RelatedSearchPostListItemProps {
  postInfo: PostInfo;
  index: number;
  length: number;
}

export default function RelatedSearchPostListItem(
  props: RelatedSearchPostListItemProps
) {
  const { postInfo, index, length } = props;

  const router = useRouter();

  return (
    <Link
      href={`/community/post/${postInfo.postId}`}
      className='flex justify-between h-[4.75rem] px-[0.9rem] py-[0.175rem] bg-[#f9fafb] rounded-md hover:scale-105 hover:bg-[#f2f4f6] duration-200'
    >
      <div className='w-full flex justify-between'>
        <div className='w-full flex flex-col justify-between py-3 '>
          <p className='text-[#333d4b] font-medium'>{postInfo.title}</p>
          <div className='flex gap-x-2'>
            <div className='flex items-center gap-x-[0.15rem]'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='17.5'
                viewBox='0 -960 960 960'
                width='17.5'
                fill='#949aa1'
              >
                <path d='M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z' />
              </svg>
              <span className='text-[#949aa1] text-xs'>158</span>
            </div>

            <div className='flex items-center gap-x-[0.15rem]'>
              <svg
                data-v-ad2f40b4=''
                data-v-de3ba2dc=''
                width='17.5'
                height='17.5'
                fill='#b2b8bf'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 32 32'
                className='icon-color-navy06'
              >
                <path
                  data-v-ad2f40b4=''
                  data-v-de3ba2dc=''
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M13 5a9 9 0 00-5.79 15.89c.342 2.296-.657 4.867-1.055 5.773a.207.207 0 00.22.286c3.867-.575 6.027-2.341 7.22-3.949H19a9 9 0 100-18h-6z'
                  fill='#b2b8bf'
                ></path>
              </svg>
              <span className='text-[#8b95a1] text-xs'>5</span>
            </div>

            <div className='ml-[-0.25rem] flex items-center'>
              <svg
                width='32'
                height='32'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='scale-[0.6]'
              >
                <path
                  d='M27.661 15.92c0-.079 0-.079 0 0 0-2.222-.56-4.127-1.521-5.794-1.04-1.667-2.402-3.017-4.163-3.97-1.761-.952-3.763-1.428-6.004-1.428-2.242 0-4.244.476-6.005 1.508-1.761.952-3.122 2.302-4.163 4.048-.96 1.747-1.44 3.652-1.44 5.796 0 2.143.56 4.128 1.52 5.795 1.041 1.746 2.402 3.016 4.163 3.97 1.762.952 3.763 1.428 5.925 1.428H27.65l.01-11.352z'
                  fill='#FABA44'
                />
                <path
                  d='M12.105 19.98s.758.815 2.054.736c1.296-.078 1.86-.877 1.86-.877a1.126 1.126 0 00-.72-.446c-.878-.146-1.237-.153-2.164-.02-.409.06-.777.28-1.03.607z'
                  fill='#C53030'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M12.305 13.132c.177-.327.286-.7.31-1.102.077-1.373-.898-2.546-2.178-2.618-.691-.04-1.33.25-1.783.74a2.236 2.236 0 00-1.576-.795c-1.28-.072-2.381.983-2.459 2.356-.038.677.18 1.306.563 1.777.11.165.208.297.208.297s.336.358.559.581c.88.882 2.42 2.083 2.42 2.083s1.771-1.06 2.772-1.915l.13-.111c.142-.12.252-.212.404-.367.19-.193.293-.306.453-.524a.893.893 0 00.177-.402z'
                  fill='url(#paint0_linear_10118_43030)'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M22.851 13.132c.176-.327.286-.7.309-1.102.078-1.373-.897-2.546-2.178-2.618-.69-.04-1.329.25-1.782.74a2.236 2.236 0 00-1.576-.795c-1.28-.072-2.381.983-2.459 2.356-.038.677.18 1.306.563 1.777.11.165.207.297.207.297s.337.358.56.581c.88.882 2.419 2.083 2.419 2.083s1.772-1.06 2.773-1.915l.13-.111c.142-.12.252-.212.404-.367.19-.193.293-.306.453-.524a.893.893 0 00.177-.402z'
                  fill='url(#paint1_linear_10118_43030)'
                />
                <defs>
                  <linearGradient
                    id='paint0_linear_10118_43030'
                    x1='8.761'
                    y1='9.317'
                    x2='8.357'
                    y2='16.45'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#F09' />
                    <stop offset='1' stopColor='#F09' />
                  </linearGradient>
                  <linearGradient
                    id='paint1_linear_10118_43030'
                    x1='19.307'
                    y1='9.317'
                    x2='18.903'
                    y2='16.45'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#F09' />
                    <stop offset='1' stopColor='#F09' />
                  </linearGradient>
                </defs>
              </svg>
              <span className='ml-[-0.2rem] text-[#8b95a1] text-xs'>158</span>
            </div>
          </div>
          {/* <p className='text-xs text-[#4e5968]'>{postInfo.author.username}</p> */}
        </div>
        <div className='relative flex justify-center items-center'>
          <div className='relative w-[100px] h-[57.5px]'>
            <Image
              src={testImg}
              alt='main_1Image'
              fill
              // 이미지 비율 유지하며 부모 요소에 맞춤
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
