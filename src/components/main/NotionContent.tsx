import useWindowStore, { windowType } from '@/zustand/useWindowStore';
import React from 'react';
import BaseWindow from '../common/BaseWindow';
import Link from 'next/link';

function NotionContent({ ...props }: Readonly<windowType>) {
  const isFocused = useWindowStore(
    (state) => state.windows[props.id]?.isFocused
  );
  return (
    <BaseWindow className={`window ${isFocused ? 'focused' : ''} `} {...props}>
      <div className="w-full h-full px-1 pb-[22px] ">
        <Link
          href="https://unique-tub-287.notion.site/Filter-Log-152d070c588d80bfb715fa9f37278a81?pvs=4"
          target="_blank"
          className="flex flex-col justify-center items-center mt-[30%]  font-galmuri"
        >
          <span className="text-lg">Filter Log 노션</span>
          <span className="text-sm text-black">
            {' '}
            -기획 의도, 진행 상황, 트러블 슈팅 등-
          </span>
        </Link>
      </div>
    </BaseWindow>
  );
}

export default NotionContent;
