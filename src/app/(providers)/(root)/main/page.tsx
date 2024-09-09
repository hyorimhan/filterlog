'use client';
import IE from '@/components/main/IE';
import IEContent from '@/components/main/IEContent';
import MyCom from '@/components/main/MyCom';
import Paint from '@/components/main/Paint';
import useWindowStore from '@/zustand/useWindowStore';
import React from 'react';

const MainPage = () => {
  const windows = useWindowStore((state) => state.windows);
  return (
    <div className="ml-10 mt-10 w-20">
      <IE />
      <MyCom />
      <Paint />
      {Object.values(windows).map((window) => (
        <IEContent key={window.id} {...window} />
      ))}
    </div>
  );
};

export default MainPage;
