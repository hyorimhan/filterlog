'use client';
import Login from '@/components/auth/Login';
import User from '@/components/auth/User';
import MainSwiper from '@/components/IE/MainSwiper';
import useUserInfo from '@/zustand/useUserInfo';
import Image from 'next/image';

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
        <section className=" h-[280px] w-[275px]  border-r-custom-green-700 border-2 border-y-custom-green-700">
          {user && user.email ? <User email={user.email} /> : <Login />}
        </section>
        <section className="w-[720px] h-[280px]  mx-auto">
          <MainSwiper />
        </section>
        <section className="border-gray-300 h-[280px]  w-[275px] text-black ">
          {user?.email}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
