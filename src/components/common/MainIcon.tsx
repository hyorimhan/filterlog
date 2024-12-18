import useWindowStore from '@/zustand/useWindowStore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function MainIcon({
  title,
  path,
  imgUrl,
  plusTitle,
  windowTitle,
}: {
  title: string;
  path: string;
  imgUrl: string;
  plusTitle?: string;
  windowTitle?: string;
}) {
  const addWindow = useWindowStore((state) => state.addWindow);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    const handleWindowClick = () => {
      setIsClicked(false);
    };
    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  const doubleClick = () => {
    addWindow({
      title: windowTitle ?? title,
      initialPath: path,
      width: 300,
      height: 300,
      position: { x: 50, y: 50 },
      zIndex: 1,
    });
  };

  return (
    <div
      className=" flex flex-col justify-center items-center cursor-pointer my-8"
      onDoubleClick={doubleClick}
      onClick={(e) => {
        e.stopPropagation();
        setIsClicked(true);
      }}
    >
      <div className={`${isClicked ? 'filter drop-shadow-[0_0_0_blue]' : ''}`}>
        <Image
          src={imgUrl}
          alt={imgUrl}
          width={40}
          height={40}
          className={isClicked ? 'opacity-50' : ''}
        />
      </div>
      <div
        className={`font-tahoma text-xs text-custom-white-50 mt-1 ${
          isClicked ? 'bg-bg-blue' : ''
        }`}
      >
        <p className="text-shadow">{title}</p>
        {plusTitle && <p className="text-shadow">{plusTitle}</p>}
      </div>
    </div>
  );
}

export default MainIcon;
