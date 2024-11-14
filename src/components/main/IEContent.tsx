import useWindowStore, { windowType } from '@/zustand/useWindowStore';
// import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { memo, useRef } from 'react';
import Draggable from 'react-draggable';
import 'xp.css/dist/XP.css';

function IEContent({
  initialPath,
  position,
  title,
  id,
  width,
  height,
}: windowType) {
  const nodeRef = useRef(null);

  // Zustand 상태에서 addWindow와 focusWindow 가져오기
  const focusWindow = useWindowStore((state) => state.focusWindow);
  // const isFocused = useWindowStore((state) => state.windows[id]?.isFocused);
  const zIndex = useWindowStore((state) => state.windows[id]?.zIndex || 1); // 기본 z-index 1
  const deleteWindow = useWindowStore((state) => state.deleteWindow);

  return (
    <Draggable
      defaultPosition={position}
      bounds="body"
      nodeRef={nodeRef}
      cancel=".title-bar-controls, .window-body"
      onStart={() => focusWindow(id)} // 창 클릭 시 focusWindow 호출
    >
      <div
        ref={nodeRef}
        className={`window`}
        style={{
          width,
          height,
          zIndex,
          position: 'relative', // z-index가 적용되도록 position 설정
        }}
      >
        <div className="title-bar" onMouseDown={() => focusWindow(id)}>
          <div className="title-bar-text">{title}</div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={() => deleteWindow(id)} />
          </div>
        </div>
        <div className="flex justify-center mt-20 font-dotum text-sm ">
          Filter Log
        </div>
        <Link
          href={initialPath}
          className="flex justify-center font-dotum text-xs mt-2"
        >
          <div className="hover:text-blue-600">&gt; 접속</div>
        </Link>
        <Link
          href={'/signup'}
          className="flex justify-center font-dotum text-xs mt-2"
        >
          <div className="hover:text-blue-600">&gt; 회원가입</div>
        </Link>
      </div>
    </Draggable>
  );
}

export default memo(IEContent);
