'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function NoticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className='mx-auto mt-16 w-[42.5rem] mb-24'>
      <h1
        className='text-2xl font-semibold'
        data-aos='fade-up'
        data-aos-easing='ease-out'
        data-aos-duration='400'
      >
        공지사항
      </h1>
      {children}
    </div>
  );
}
