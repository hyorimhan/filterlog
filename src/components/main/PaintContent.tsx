import useWindowStore, { windowType } from '@/zustand/useWindowStore';
import React from 'react';
import BaseWindow from '../common/BaseWindow';

function PaintContent({ ...props }: Readonly<windowType>) {
  const isFocused = useWindowStore(
    (state) => state.windows[props.id]?.isFocused
  );
  return (
    <BaseWindow className={`window ${isFocused ? 'focused' : ''} `} {...props}>
      <div className="w-full h-full relative">
        <iframe
          src="https://jspaint.app"
          title="paint"
          className="block w-full h-full"
          style={{ backgroundColor: 'rgb(192,192,192)' }}
        />
        {!isFocused && (
          <div
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: 'auto' }}
          />
        )}
      </div>
    </BaseWindow>
  );
}

export default PaintContent;
