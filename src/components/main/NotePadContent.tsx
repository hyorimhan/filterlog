import 'xp.css/dist/XP.css';
import BaseWindow, { windowType } from '../common/BaseWindow';
import useWindowStore from '@/zustand/useWindowStore';
import { DEFAULT_VALUE } from '@/constants/notePad';

function NotePadContent({ ...props }: Readonly<windowType>) {
  const isFocused = useWindowStore(
    (state) => state.windows[props.id]?.isFocused
  );
  return (
    <BaseWindow className={`window ${isFocused ? 'focused' : ''} `} {...props}>
      <div className="w-full h-full px-1 pb-[22px] ">
        <textarea
          className="w-full h-full resize-none text-sm"
          spellCheck="false"
          defaultValue={DEFAULT_VALUE()}
        />
      </div>
    </BaseWindow>
  );
}

export default NotePadContent;
