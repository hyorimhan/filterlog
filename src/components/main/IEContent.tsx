import useWindowStore from '@/zustand/useWindowStore';
import dynamic from 'next/dynamic';
// import { useRouter } from 'next/navigation';
import Draggable from 'react-draggable';
import 'xp.css/dist/XP.css';

function IEContent({
  id,
  title,
  initialPath,
  width,
  height,
  position,
  isFocused,
}) {
  // const router = useRouter();
  // const focusWindow = useWindowStore((state) => state.focusWindow);
  const DynamicComponent = dynamic(
    () => import(`../../app/(providers)/(root)${initialPath}/page`),
    {
      ssr: false,
      loading: () => <p>loading</p>,
    }
  );
  return (
    <Draggable
      defaultPosition={position}
      bounds="body"
      // onMouseDown={() => focusWindow(id)}
    >
      <div
        style={{ width, height, zIndex: isFocused ? 10 : 1 }}
        className={`window ${isFocused ? 'focused' : ''}`}
      >
        <div className="title-bar">
          <div className="title-bar-text"> {title}</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>
        <div>
          <DynamicComponent id={id} />
        </div>
      </div>
    </Draggable>
  );
}

export default IEContent;
