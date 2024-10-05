'use client';
import Login from '@/components/auth/Login';
import User from '@/components/auth/User';
import Ad from '@/components/common/Ad';
import MainSwiper from '@/components/IE/MainSwiper';
import useUserInfo from '@/zustand/useUserInfo';

const HomePage = () => {
  const user = useUserInfo((state) => state.user);

  return (
    <>
      <div className="flex mt-1">
        <section className=" h-[280px] w-[275px]  border-r-custom-green-700 border-2 border-y-custom-green-700">
          {user && user.email ? <User email={user.email} /> : <Login />}
        </section>
        <section className="w-[720px] h-[280px] ">
          <MainSwiper />
        </section>
        <section className="border-gray-300 h-[280px]  w-[275px] text-black ">
          {user?.email}
        </section>
      </div>
      <div className="flex mt-1">
        <section className=" h-[280px] w-[275px]  border-r-custom-green-700 border-2 border-y-custom-green-700">
          <Ad />
        </section>
        <section className="w-[720px] h-[280px]  mx-auto">
          <div className="bg-slate-400">hi</div>
        </section>
        <section className="border-gray-300 h-[280px]  w-[275px] text-black ">
          {user?.email}
        </section>
      </div>
    </>
  );
};

export default HomePage;
