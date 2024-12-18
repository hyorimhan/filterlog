'use client';

import InternetExplorer from '@/components/main/InternetExplorer';
import NotePad from '@/components/main/NotePad';
import NotePadContent from '@/components/main/NotePadContent';

import Paint from '@/components/main/Paint';
import useWindowStore from '@/zustand/useWindowStore';
import IeContent from '@/components/main/IEContent';
import IEContent from '@/components/main/IEContent';

const MainPage = () => {
  const windows = useWindowStore((state) => state.windows);
  const windowsArray = Object.values(windows);
  const IEwindow = windowsArray.find((window) => window.initialPath === '/IE');
  const NotePadWindow = windowsArray.find(
    (windows) => windows.initialPath === 'NotePad'
  );

  return (
    <div className="ml-10 mt-10 w-20">
      <InternetExplorer />
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
