export default function Loading() {
  return (
    <div className='w-20 h-20 mx-auto flex justify-center items-center text-3xl font-thin animate-spin my-[15rem]'>
      <svg
        viewBox='0 0 32 32'
        className='w-7 h-7 flex justify-center items-center text-3xl font-thin animate-spin'
      >
        <circle
          cx='16'
          cy='16'
          fill='none'
          r='14'
          strokeWidth='2'
          style={{ stroke: 'rgb(130, 130, 130)', opacity: 0.2 }}
        ></circle>
        <circle
          cx='16'
          cy='16'
          fill='none'
          r='14'
          strokeWidth='2'
          style={{
            stroke: 'rgb(80, 80, 80)',
            strokeDasharray: 80,
            strokeDashoffset: 60,
          }}
        ></circle>
      </svg>
    </div>
  );
}
