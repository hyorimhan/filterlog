'use client';
import useWindowStore from '@/zustand/useWindowStore';
import Image from 'next/image';

function IE() {
  const addWindow = useWindowStore((state) => state.addWindow);

  const doubleClick = () => {
    addWindow({
      title: 'Internet Explorer',
      initialPath: '/IE',
      width: 800,
      height: 600,
      position: { x: 50, y: 50 },
    });
  };
  return (
    <>
      <div
        className="flex flex-col justify-center items-center"
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

export default IE;
