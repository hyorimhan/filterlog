import { windowType } from '@/zustand/useWindowStore';
import Link from 'next/link';
import 'xp.css/dist/XP.css';
import BaseWindow from '../common/BaseWindow';
import { memo } from 'react';

function IeContent({ ...props }: Readonly<windowType>) {
  return (
    <BaseWindow className="window" {...props}>
      <div className="flex justify-center mt-20 font-dotum text-sm ">
        Filter Log
      </div>
      <Link
        href={props.initialPath ?? ''}
        className="flex justify-center font-dotum focus:outline-none text-xs mt-2"
      >
        <div className="hover:text-blue-600 ">&gt; 접속</div>
      </Link>
      <Link
        href={'/signup'}
        className="flex justify-center focus:outline-none font-dotum text-xs mt-2"
      >
        <div className="hover:text-blue-600">&gt; 회원가입</div>
      </Link>
    </BaseWindow>
  );
}

export default memo(IeContent);
