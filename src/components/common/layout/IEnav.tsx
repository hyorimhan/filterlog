import Link from 'next/link';
import IELogo from './IELogo';

function IEnav() {
  const navLinks = [
    {
      href: '/official?tab=tab-A&category=magazine',
      text: '매거진',
    },
    {
      href: '/official?tab=tab-B&category=notice',
      text: '공지',
    },
    {
      href: '/official?tab=tab-C&category=event',
      text: '이벤트',
    },
  ];
  return (
    <>
      <IELogo />
      <div className=" h-1 flex justify-center mx-auto bg-gradient-to-b from-custom-white-50  border-y-0 via-custom-green-700 to-custom-white-50"></div>
      <div className="h-[50px] font-galmuri space-x-5 mx-auto flex  justify-center items-center  border-y-0 bg-custom-green-400  ">
        {navLinks.map((nav) => (
          <Link
            key={nav.text}
            href={nav.href}
            className="focus:outline-none px-2 py-1 hover:brightness-105 shadow-md rounded-lg bg-custom-green-300 text-sm text-black "
          >
            {nav.text}
          </Link>
        ))}
      </div>
    </>
  );
}

export default IEnav;
