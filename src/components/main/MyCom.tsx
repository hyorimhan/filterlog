import useWindowStore from '@/zustand/useWindowStore';
import Image from 'next/image';
import React from 'react';

function MyCom() {
  const addWindow = useWindowStore((state) => state.addWindow);
  const doubleClick = () => {
    addWindow({
      title: '내 컴퓨터',
      initialPath: '/MyComputer',
      width: 800,
      height: 600,
      position: { x: 20, y: 20 },
    });
  };
  return (
    <div
      className="flex flex-col justify-center items-center my-8"
      onDoubleClick={doubleClick}
    >
      <Image src={'/main/My Computer.png'} alt="IE" width={40} height={40} />
      <div className="font-tahoma text-xs text-custome-white-50 mt-1 ">
        <p className="text-shadow font-gulim">내 컴퓨터</p>
      </div>
    </div>
  );
}

export default MyCom;
