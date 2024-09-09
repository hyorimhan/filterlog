import dynamic from 'next/dynamic';
import React from 'react';
import Draggable from 'react-draggable';
import 'xp.css/dist/XP.css';

function MyComContent({ initialPath, position, title, id, width, height }) {
  const DynamicContent = dynamic(
    () => import(`../../app/(providers)/(root)/${initialPath}/pages`)
  );
  return (
    <Draggable defaultPosition={position} bounds="body">
      <div className="windows" style={{ width, height }}>
        <div className="title-bar">
          <div className="title-bar-text"> {title}</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>
        <div>
          <DynamicContent id={id} />
        </div>
      </div>
    </Draggable>
  );
}

export default MyComContent;
