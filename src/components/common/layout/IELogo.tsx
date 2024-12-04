import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function IELogo() {
  return (
    <Link
      href={'/IE'}
      className="h-[120px] focus:outline-none mx-auto flex  justify-center items-center  bg-custom-green-300  "
    >
      <Image
        src={'/logo/filTextLogo2.svg'}
        alt="filterlogLogo"
        width={500}
        height={500}
        className="w-[380px] h-[120px] mx-auto border-0 pb-3 my-auto bg-custom-green-300 object-cover "
      />
    </Link>
  );
}

export default IELogo;
