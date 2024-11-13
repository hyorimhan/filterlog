import Image from 'next/image';
import React from 'react';

function Magazine() {
  return (
    <div className="flex justify-end  ">
      <div className=" space-y-3 w-full font-galmuri  mr-1">
        <p className="mt-5 text-center">FilterLog Magazine</p>
        <p className="border-[3px] border-custom-pink-200 p-2 rounded-lg mx-1 mt-2">
          <p className="text-sm">💌 별빛 속에 숨겨진 내 운명은?</p>
          <div className="space-y-2 mt-2">
            <p className="indent-7">내 별자리별 성격은?</p>
            <p className="indent-7">내 별자리별 연애운은?</p>
          </div>
        </p>
        <p className="border-[3px] border-custom-pink-200 rounded-lg mx-1  p-2">
          <p className="text-sm">💌 혈액형 완전정복 스페셜</p>
          <div className="mt-2 space-y-2">
            <p className="indent-7">혈액형별 스타일! 내 스타일은?</p>
            <p className="indent-7">♡₊˚BLOOD TYPE으로 보는 러브 스토리˚₊♡</p>
          </div>
        </p>
        <p className="border-[3px] border-custom-pink-200 rounded-lg mx-1  p-2">
          <p className="text-sm">💌 내 숨겨진 속마음 대공개!</p>

          <div className="mt-2 space-y-2">
            <p className="indent-7">내 마음을 CHECK! 상황별 심리테스트</p>
          </div>
        </p>
      </div>
      <Image
        src={'/magazine2.svg'}
        alt="magazine"
        width={400}
        height={300}
        className=" h-[560px]  "
      />
    </div>
  );
}

export default Magazine;
