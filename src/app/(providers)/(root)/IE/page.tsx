'use client';
import Login from '@/components/auth/Login';
import User from '@/components/auth/User';
import Ad from '@/components/common/Ad';
import MainSwiper from '@/components/IE/MainSwiper';
import useUserInfo from '@/zustand/useUserInfo';

import Magazine from '@/components/IE/Magazine';
import YoutubePlayList from '@/components/IE/video/YoutubePlayList';
import ThreeBlogger from '@/components/IE/blogger/ThreeBlogger';
import RecentPosts from '@/components/IE/RecentPosts';

const HomePage = () => {
  const user = useUserInfo((state) => state.user);

  return (
    <>
      <div className=" grid-cols-[2fr_6fr_2fr]  grid overflow-hidden ">
        <section className=" h-[280px] w-[280px]  border-l-0 border-t-0 border-r-custom-green-700 border-2 border-y-custom-green-700">
          {user && user.email ? <User /> : <Login />}
        </section>
        <section className="w-[720px] h-[280px] ">
          <MainSwiper />
        </section>
        <section className="border-t-0 border-r-0  border-2  border-l-custom-green-700 border-y-custom-green-700  h-[280px]  w-[280px] text-black ">
          <ThreeBlogger />
        </section>
      </div>
      <div className=" grid-cols-[2fr_6fr_2fr]  grid ">
        <section className=" h-[280px] w-[280px]  border-r-custom-green-700 border-2 border-y-custom-green-700 border-t-0 border-l-0 ">
          <Ad />
        </section>
        <section className="w-[720px] h-[280px]  ">
          <div className=" h-[560px] ">
            <Magazine />
          </div>
        </section>
        <section className="font-galmuri text-sm text-center h-[280px] w-[280px]   border-2 border-y-custom-green-700 border-l-custom-green-700 border-y-0 border-r-0 ">
          <div className=" mt-5 text-sm border-dashed border-b-2 pb-1 border-custom-green-400 mx-3">
            최신 글
          </div>
          <RecentPosts />
        </section>
      </div>
      <div className=" grid-cols-[2fr_6fr_2fr]  grid  overflow-hidden">
        <section className="font-galmuri text-center h-[280px] w-[280px]  border-r-custom-green-700 border-2 border-b-custom-green-700 border-t-0 border-l-0 border-r-0">
          <YoutubePlayList />
        </section>
        <section className="w-[720px] h-[280px]"></section>
        <section className="font-galmuri text-center h-[280px] w-[280px]   border-custom-green-700 border-2 border-y-custom-green-700  border-r-0">
          <div className=" mt-2 text-sm border-dashed border-b-2 pb-1 border-custom-green-400 mx-3 ">
            공지
          </div>
          <div className="border-2 border-custom-green-300 mx-2 my-2">
            방구 쿠션 줍기 않기 운동
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
