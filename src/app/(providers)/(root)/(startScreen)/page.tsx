import Logo from '@/components/common/Logo';
import Question from '@/components/startScreen/Question';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const StartScreen = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="relative bg-custom-blue-1000 w-full h-[110px] flex-shrink-0">
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-custom-blue-500 to-transparent"></div>
      </div>

      <div className="bg-gradient-to-br from-blue-300 via-custom-blue-600 to-custom-blue-600 w-full flex-grow  flex justify-center items-center ">
        <div className="grid grid-cols-2 w-[1120px] h-full ">
          <div className="flex flex-col items-end  justify-center relative h-full">
            <div className="absolute top-0 right-0 bottom-0  w-px bg-gradient-to-b from-transparent via-white to-transparent"></div>

            <Logo w={50} h={50} style="mr-10" />
            <div className="mr-8">
              <div className="flex justify-end">
                <div className="text-5xl text-custome-white-50 text-left">
                  Filter
                </div>
                <div className="mb-7 ml-2 text-3xl text-custome-orange-1">
                  log
                </div>
              </div>
              <div className="text-xl font-gulim text-custome-white-50">
                시작하려면 사용자 이름을 클릭하십시오.
              </div>
            </div>
          </div>
          {/* <div className="flex  items-center p-3 rounded-md justify-start bg-custom-blue-600 hover:bg-gradient-to-l from-custom-blue-600 to-custom-blue-900 self-center ml-10 cursor-pointer "> */}
          <div
            className="flex items-center p-3 rounded-md justify-start 
                    bg-custom-blue-600
                    hover:bg-gradient-to-l from-custom-blue-600 to-custom-blue-900
                    transition-all duration-500 ease-in-out
                    bg-[length:200%_100%] bg-left hover:bg-right
                    self-center ml-10"
          >
            <Image
              src={'/profile.jpg'}
              alt="profile"
              width={70}
              height={70}
              className="w-[70px] h-[70px] object-cover border-2 border-blue-200 rounded-md"
            />
            <span className="font-gulim text-custome-white-50 ml-5">
              사용자
            </span>
            <span className="flex gap-1 ml-5 ">
              <Link href={'/main'}>
                <Image
                  src={'/startScreen/Go.png'}
                  alt="profile"
                  width={30}
                  height={30}
                />
              </Link>
              <Question />
            </span>
          </div>
        </div>
      </div>

      <div className="relative bg-custom-blue-1000 w-full h-[110px] flex-shrink-0">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-custome-orange-2 to-transparent"></div>
      </div>
    </div>
  );
};

export default StartScreen;
