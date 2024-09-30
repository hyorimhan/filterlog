import useWindowStore from '@/zustand/useWindowStore';
import Image from 'next/image';
import React from 'react';

function NotePad() {
  const addWindow = useWindowStore((state) => state.addWindow);
  const doubleClick = () => {
    addWindow({
      title: '메모장',
      initialPath: 'NotePad',
      width: 500,
      height: 300,
      position: { x: 50, y: 50 },
      zIndex: 1,
    });
  };
  return (
    <div
      className="flex flex-col justify-center items-center my-8"
      onDoubleClick={doubleClick}
    >
      <Image src={'/main/NotePad.png'} alt="IE" width={40} height={40} />
      <div className="font-tahoma text-xs text-custome-white-50 mt-1 ">
        <p className="text-shadow font-gulim">메모장</p>
      </div>
    </div>
  );
}

export default NotePad;
