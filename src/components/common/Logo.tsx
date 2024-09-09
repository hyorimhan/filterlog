import Image from 'next/image';
import React from 'react';

function Logo({
  w,
  h,
  style,
}: {
  w: number;
  h: number;
  style: string | undefined;
}) {
  return (
    <Image
      src={'/logo/filterlog.svg'}
      alt="filterloglogo"
      width={w}
      height={h}
      className={style}
    />
  );
}

export default Logo;
