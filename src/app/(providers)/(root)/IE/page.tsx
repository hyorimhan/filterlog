'use client';
import Login from '@/components/auth/Login';
import User from '@/components/auth/User';
import MainSwiper from '@/components/IE/MainSwiper';
import useUserInfo from '@/zustand/useUserInfo';
import Image from 'next/image';
import React from 'react';
import 'xp.css/dist/XP.css';

const HomePage = () => {
  const user = useUserInfo((state) => state.user);
  return (
    <div>
      <div className="h-[150px] bg-custom-green-300 ">
        <Image
          src={'/logo/filTextLogo1.svg'}
          alt="filterlogLogo"
          width={500}
          height={500}
          className="w-[380px] h-[150px] mx-auto pb-3 my-auto bg-custom-green-300 object-cover "
        />
      </div>
      <div className="flex mt-1">
        <section className="border-gray-300 h-[280px] w-[275px] bg-slate-300">
          {!user ? <Login /> : <User />}
        </section>
        <section className="w-[720px] h-[280px]  mx-auto">
          <MainSwiper />
        </section>
        <section className="border-gray-300 h-[280px] w-[275px] bg-slate-300"></section>
      </div>
    </div>
  );
};

export default HomePage;
