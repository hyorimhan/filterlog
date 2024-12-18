'use client';
import Login from '@/components/auth/Login';
import Ad from '@/components/common/Ad';
import MainSwiper from '@/components/IE/MainSwiper';
import useUserInfo from '@/zustand/useUserInfo';

import MyInfo from '@/components/auth/MyInfo';
import ThreeBlogger from '@/components/IE/blogger/ThreeBlogger';
import Magazine from '@/components/IE/Magazine';
import Notice from '@/components/IE/Notice';
import RecentPosts from '@/components/IE/RecentPosts';
import YoutubePlayList from '@/components/IE/video/YoutubePlayList';

const HomePage = () => {
  const { user } = useUserInfo();

  return (
    <>
      <div className=" grid-cols-[2fr_6fr_2fr]  grid overflow-hidden ">
        <section className=" h-[280px] w-[280px]  border-l-0 border-t-0 border-r-custom-green-700 border-2 border-y-custom-green-700">
          {!user ? <Login showSignUp={true} /> : <MyInfo />}
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
          <div className=" h-[560px] relative z-10">
            <Magazine />
          </div>
        </section>
        <section className=" text-sm text-center h-[280px] w-[280px]   border-2 border-y-custom-green-700 border-l-custom-green-700 border-y-0 border-r-0 ">
          <div className=" mt-5 text-sm border-dashed border-b-2 pb-1 border-custom-green-400 mx-3">
            최신 글
          </div>
          <RecentPosts />
        </section>
      </div>
      <div className=" grid-cols-[2fr_6fr_2fr]  grid  overflow-hidden">
        <section className=" text-center h-[280px] w-[280px]  border-r-custom-green-700 border-2 border-b-custom-green-700 border-t-0 border-l-0 border-r-0">
          <YoutubePlayList />
        </section>
        <section className="w-[720px] h-[280px]"></section>
        <section className="text-center h-[280px] w-[280px]   border-custom-green-700 border-2 border-y-custom-green-700  border-r-0">
          <Notice />
        </section>
      </div>
    </>
  );
};

export default HomePage;
