'use client';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const url = `filterlog.kro.kr${pathname}`;

  const closeWindow = () => {
    router.replace('/main');
  };

  return (
    <>
      <div className="title-bar ">
        <div className="title-bar-text">filter log</div>
        <div className="title-bar-controls">
          <button aria-label="Close" onClick={closeWindow}></button>
        </div>
      </div>

      <div className="font-tahoma flex px-3 text-xs  bg-header w-full h-[27px] border border-r-2 border-l-2   border-b-2 border-b-border-beige ">
        <span className="my-auto">Address</span>
        <div className="w-full h-[25px] text-xs flex ml-3   bg-white border border-url-border">
          <Image
            src={'/header/urlIE.png'}
            alt="urlIE"
            width={15}
            height={15}
            className="mr-1 w-[15px] h-[15px] my-auto"
          />
          {/* <span className="my-auto">{url}</span> */}
          <input type="text" className="my-auto w-full mr-1" value={url} />
          <Image
            src={'/header/urlBtn.png'}
            alt="urlBtn"
            width={15}
            height={15}
            className="w-[15px] h-[15px] my-auto ml-auto mr-1 hover:brightness-110 hover:cursor-pointer"
          />
        </div>
        <Image
          src={'/logo/filTextLogo2.svg'}
          alt="textLogo"
          width={180}
          height={20}
          className=" object-cover h-full ml-3 "
        />
      </div>
      <div className="h-[150px] w-[1280px] mx-auto border-b-0 border-t-0 bg-custom-green-300 border-2 border-x-custom-green-700">
        <Image
          src={'/logo/filTextLogo1.svg'}
          alt="filterlogLogo"
          width={500}
          height={500}
          className="w-[380px] h-[150px] mx-auto border-0 pb-3 my-auto bg-custom-green-300 object-cover "
        />
      </div>
    </>
  );
}

export default Header;
