import useWindowStore, { windowType } from '@/zustand/useWindowStore';
// import dynamic from 'next/dynamic';
import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import 'xp.css/dist/XP.css';

function NotePadContent({
  position,
  title,
  id,
  width,
  height,
}: Readonly<windowType>) {
  const nodeRef = useRef(null);

  // Zustand 상태에서 addWindow와 focusWindow 가져오기
  const focusWindow = useWindowStore((state) => state.focusWindow);
  const isFocused = useWindowStore((state) => state.windows[id]?.isFocused);
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
        className={`window ${isFocused ? 'focused' : ''} `}
        style={{
          width,
          height,
          zIndex,
          position: 'relative', // z-index가 적용되도록 position 설정
        }}
      >
        <div className="title-bar" onMouseDown={() => focusWindow(id)}>
          <div className="title-bar-text">{title}</div>
          <div>
            <div className="title-bar-controls">
              <button aria-label="Close" onClick={() => deleteWindow(id)} />
            </div>
          </div>
        </div>

        <div className="w-full h-full px-1 pb-[22px] ">
          <textarea
            className="w-full h-full resize-none text-sm"
            spellCheck="false"
            defaultValue={`
              필터로그(FilterLog)는 사용자의 다양한 경험과 감정을 선택적으로 기록하고 체계적으로 정리하는 디지털 일지입니다. 
              Windows XP 시대의 컴퓨팅 분위기를 연상시키는 레트로한 디자인으로, 
              옛 추억을 되새기며 일상을 기록할 수 있도록 도와줍니다.
              
             windows xp 스타일 css를 사용한 비상업적 개인 프로젝트이며,
             자세한 내용은 Internet Explorer 내에서 확인하실 수 있습니다.

             그럼 지금 Internet Explorer을 클릭해보세요!
              `}
          />
        </div>
      </div>
    </Draggable>
  );
}

export default NotePadContent;
