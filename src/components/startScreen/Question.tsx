import Image from 'next/image';
import React from 'react';

function Question() {
  return (
    <div className="relative group">
      <Image
        src={'/startScreen/Login Question.png'}
        alt="profile"
        width={30}
        height={30}
        // className="cursor-pointer relative z-10"
      />
      {/* <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 translate-y-[-70%] hidden group-hover:block transition-all duration-500 z-20 "> */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 translate-y-[-70%] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-500 ">
        <div className="relative bg-ballons p-2 rounded font-gulim text-xs whitespace-nowrap text-xs border border-black">
          <p>필터로그(FilterLog)는 당신의 일상을 선별적으로</p>
          <p> 공유하고 소통할 수 있는 window xp 스타일 블로그 플랫폼입니다.</p>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-x-[8px] border-x-transparent border-t-[8px] border-t-black" />
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-[-1px] w-0 h-0 border-x-[8px] border-x-transparent border-t-[8px] border-t-ballons" />
        </div>
      </div>
    </div>
  );
}

export default Question;
