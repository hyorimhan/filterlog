'use client';
import Login from '@/components/auth/Login';
import User from '@/components/auth/User';
import Ad from '@/components/common/Ad';
import MainSwiper from '@/components/IE/MainSwiper';
import TodayBlogger from '@/components/IE/TodayBlogger';
import useUserInfo from '@/zustand/useUserInfo';

import YoutubePlayList from '@/components/blog/myBlog/YoutubePlayList';
import Magazine from '@/components/IE/Magazine';

const HomePage = () => {
  const user = useUserInfo((state) => state.user);

  return (
    <>
      <div className=" grid-cols-[2fr_6fr_2fr]  grid mt-1">
        <section className=" h-[280px] w-[275px]  border-r-custom-green-700 border-2 border-y-custom-green-700">
          {user && user.email ? <User /> : <Login />}
        </section>
        <section className="w-[720px] h-[280px] ">
          <MainSwiper />
        </section>
        <section className="border-gray-300 h-[280px]  w-[275px] text-black ">
          <TodayBlogger />
        </section>
      </div>
      <div className=" grid-cols-[2fr_6fr_2fr]  grid mt-1">
        <section className=" h-[280px] w-[275px]  border-r-custom-green-700 border-2 border-y-custom-green-700">
          <Ad />
        </section>
        <section className="w-[720px] h-[280px]  mx-auto">
          <div className=" h-[560px]">
            <Magazine />
          </div>
        </section>
        <section className="font-galmuri text-sm text-center h-[280px] w-[275px]   border-2 border-y-custom-green-700 border-l-custom-green-700 ">
          <div className=" mt-5 text-sm border-dashed border-b-2 pb-1 border-custom-green-400 mx-3">
            👑순위👑
          </div>
          <div className="space-y-10 mt-9 ml-3">
            <div className="flex justify-start items-center ">
              <span className="w-10">글</span>
              <span>👑</span>
              <div className="">뫄뫄님</div>
              <div>2개</div>
            </div>
            <div className="flex justify-start items-center">
              <span className="w-10">댓글</span>
              <span>👑</span>
            </div>
            <div className=" flex justify-start items-center ">
              <span className="w-10 ">감정 기록</span>
              <span>👑</span>
            </div>
          </div>
        </section>
      </div>
      <div className=" grid-cols-[2fr_6fr_2fr]  grid mt-1">
        <section className="font-galmuri text-center h-[280px] w-[275px]  border-r-custom-green-700 border-2 border-y-custom-green-700">
          <div className=" mt-2 text-sm border-dashed border-b-2 pb-1 border-custom-green-400 mx-3">
            공지
          </div>
        </section>
        <section className="w-[720px] h-[280px]  mx-auto"></section>
        <section className="border-gray-300 h-[280px]  w-[275px] text-black ">
          <YoutubePlayList />
        </section>
      </div>
    </>
  );
};

export default HomePage;
