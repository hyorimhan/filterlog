'use client';

import InternetExplorer from '@/components/main/InternetExplorer';
import NotePad from '@/components/main/NotePad';
import NotePadContent from '@/components/main/NotePadContent';

import Paint from '@/components/main/Paint';
import useWindowStore from '@/zustand/useWindowStore';
import IEContent from '@/components/main/IEContent';
import PaintContent from '@/components/main/PaintContent';
import NotionContent from '@/components/main/NotionContent';
import Notion from '@/components/main/Notion';

const MainPage = () => {
  const windows = useWindowStore((state) => state.windows);
  const windowsArray = Object.values(windows);
  const IEwindow = windowsArray.find((window) => window.initialPath === 'IE');
  const notePadWindow = windowsArray.find(
    (windows) => windows.initialPath === 'NotePad'
  );
  const paintWindow = windowsArray.find(
    (window) => window.initialPath === 'Paint'
  );
  const notionWindow = windowsArray.find(
    (window) => window.initialPath === 'Notion'
  );

  return (
    <div className="ml-10 mt-10 w-20">
      <InternetExplorer />
      <NotePad />
      <Paint />
      <Notion />
      {IEwindow && <IEContent key={IEwindow.id} {...IEwindow} />}
      {notePadWindow && (
        <NotePadContent key={notePadWindow.id} {...notePadWindow} />
      )}
      {paintWindow && <PaintContent key={paintWindow.id} {...paintWindow} />}
      {notionWindow && (
        <NotionContent key={notionWindow.id} {...notionWindow} />
      )}
    </div>
  );
};

export default MainPage;
