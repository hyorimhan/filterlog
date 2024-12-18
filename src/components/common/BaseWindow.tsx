import useWindowStore from '@/zustand/useWindowStore';
import React, { useRef } from 'react';
import Draggable from 'react-draggable';

export type windowType = {
  id: string;
  title: string;
  initialPath?: string;
  width: number;
  height: number;
  position: { x: number; y: number };
  isFocused?: boolean;
  zIndex: number;
};

export interface BaseWindowType extends windowType {
  children: React.ReactNode;
  className: string;
}
function BaseWindow({
  children,
  className,
  ...props
}: Readonly<BaseWindowType>) {
  const nodeRef = useRef(null);

  const focusWindow = useWindowStore((state) => state.focusWindow);
  const zIndex = useWindowStore(
    (state) => state.windows[props.id]?.zIndex || 1
  );
  const deleteWindow = useWindowStore((state) => state.deleteWindow);

  return (
    <Draggable
      defaultPosition={props.position}
      bounds="body"
      nodeRef={nodeRef}
      cancel=".title-bar-controls, .window-body"
      onStart={() => focusWindow(props.id)}
    >
      <div
        ref={nodeRef}
        className={className}
        style={{
          width: props.width,
          height: props.height,
          zIndex,
          position: 'relative',
        }}
      >
        <div className="title-bar" onMouseDown={() => focusWindow(props.id)}>
          <div className="title-bar-text">{props.title}</div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={() => deleteWindow(props.id)} />
          </div>
        </div>
        {children}
      </div>
    </Draggable>
  );
}

export default BaseWindow;
