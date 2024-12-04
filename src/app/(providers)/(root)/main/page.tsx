'use client';

import IE from '@/components/main/IE';
import IEContent from '@/components/main/IEContent';

import NotePad from '@/components/main/NotePad';
import NotePadContent from '@/components/main/NotePadContent';

import Paint from '@/components/main/Paint';
import useWindowStore from '@/zustand/useWindowStore';

const MainPage = () => {
  const windows = useWindowStore((state) => state.windows);
  const windowsArray = Object.values(windows);
  const IEwindow = windowsArray.find((window) => window.initialPath === '/IE');
  const NotePadWindow = windowsArray.find(
    (windows) => windows.initialPath === 'NotePad'
  );

  return (
    <div className="ml-10 mt-10 w-20">
      <IE />
      <NotePad />
      <Paint />
      {IEwindow && <IEContent key={IEwindow.id} {...IEwindow} />}
      {NotePadWindow && (
        <NotePadContent key={NotePadWindow.id} {...NotePadWindow} />
      )}
    </div>
  );
};

export default MainPage;
