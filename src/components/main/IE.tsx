'use client';
import useWindowStore from '@/zustand/useWindowStore';
import Image from 'next/image';
import { memo } from 'react';

function IE() {
  const addWindow = useWindowStore((state) => state.addWindow);

  const doubleClick = () => {
    addWindow({
      title: 'Internet Explorer',
      initialPath: '/IE',
      width: 300,
      height: 300,
      position: { x: 50, y: 50 },
      zIndex: 1,
    });
  };
  return (
    <>
      <div
        className="flex flex-col justify-center items-center cursor-pointer"
        onDoubleClick={doubleClick}
      >
        <Image src={'/main/IE.png'} alt="IE" width={40} height={40} />
        <div className="font-tahoma text-xs text-custome-white-50 mt-1 ">
          <p className="text-shadow">Internet</p>
          <p className="text-shadow">Explorer</p>
        </div>
      </div>
    </>
  );
}

export default memo(IE);
