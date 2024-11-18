import Image from 'next/image';
import React from 'react';

function Magazine() {
  return (
    <div className="grid grid-cols-2  ">
      <div className=" space-y-3 w-full font-galmuri mb-1 ">
        <p className="mt-5 text-center text-[16px] font-bold">
          FilterLog Magazine
        </p>
        <div className="border-[3px] border-custom-green-600 p-2 rounded-lg mx-1 mt-2">
          <div className="text-sm font-semibold ">
            💌 별빛 속에 숨겨진 내 운명은?
          </div>
          <div className="space-y-2 mt-2">
            <p className="indent-7">내 별자리별 성격은?</p>
            <p className="indent-7">내 별자리별 연애운은?</p>
          </div>
        </div>
        <div className="border-[3px] border-custom-green-600 rounded-lg mx-1  p-2">
          <div className="text-sm font-semibold">💌 혈액형 완전정복 스페셜</div>
          <div className="mt-2 space-y-2">
            <p className="indent-7">혈액형별 스타일! 내 스타일은?</p>
            <p className="indent-7">♡₊˚BLOOD TYPE으로 보는 러브 스토리˚₊♡</p>
          </div>
        </div>
        <div className="border-[3px] border-custom-green-600 rounded-lg mx-1  p-2">
          <div className="text-sm font-semibold">
            💌 내 숨겨진 속마음 대공개!
          </div>

          <div className="mt-2 space-y-2">
            <p className="indent-7">내 마음을 CHECK! 상황별 심리테스트</p>
          </div>
        </div>
        <div className="border-[3px] border-custom-green-600 rounded-lg mx-1  p-2">
          <div className="text-sm font-semibold">
            💌 너의 ESC에서 나온 건 뭐야?
          </div>
          <div className="mt-2 space-y-2">
            <p className="indent-7">오늘 밤 내 꿈에 나올 연예인은?</p>
            <p className="indent-7">간단하게 확인하는 오늘의 운세!</p>
          </div>
        </div>
        <div className="border-[3px] border-custom-green-600 rounded-lg mx-1  p-2">
          <div className="text-sm font-semibold">
            💌 싸이월드 얼짱 나미애를 만나다!
          </div>
          <div className="mt-2 space-y-2">
            <p className="indent-7">포토샵 없이 예쁘게 나오는 촬영 꿀팁</p>
            <p className="indent-7">얼짱들이 만든 메이크업/패션 유행</p>
          </div>
        </div>
      </div>

      <Image
        src={'/magazine4.svg'}
        alt="magazine"
        width={500}
        height={500}
        className=" h-full flex items-center"
      />
    </div>
  );
}

export default Magazine;
