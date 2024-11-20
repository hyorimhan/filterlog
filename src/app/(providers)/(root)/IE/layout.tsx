import Header from '@/components/common/Header';
import Image from 'next/image';
import Footer from '@/components/common/footer/Footer';
import IEFooter from '@/components/common/footer/IEFooter';
import Link from 'next/link';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen  ">
      <Header />
      <div className="h-[120px] w-[1280px] mx-auto flex  justify-center items-center border-b-0 border-t-0 bg-custom-green-300 border-2 border-custom-green-700">
        <Image
          src={'/logo/filTextLogo2.svg'}
          alt="filterlogLogo"
          width={500}
          height={500}
          className="w-[380px] h-[120px] mx-auto border-0 pb-3 my-auto bg-custom-green-300 object-cover "
        />
      </div>
      <div className="w-[1280px] h-1 flex justify-center mx-auto bg-gradient-to-b from-custome-white-50 border-2 border-x-custom-green-700 border-y-0 via-custom-green-700 to-custome-white-50"></div>
      <div className="h-[50px] w-[1280px] font-galmuri space-x-5 mx-auto flex  justify-center items-center  border-y-0 bg-custom-green-400 border-2  border-x-custom-green-700 ">
        <Link
          href={'/official?tab=tab-A&category=magazine'}
          className="px-2 py-1 hover:brightness-105 shadow-md rounded-lg bg-custom-green-300 text-sm text-black "
        >
          매거진
        </Link>
        <Link
          href={'/official?tab=tab-B&category=notice'}
          className="px-2 py-1 hover:brightness-105  shadow-md rounded-lg bg-custom-green-300 text-sm text-black "
        >
          공지
        </Link>
        <Link
          href={'/official?tab=tab-C&category=event'}
          className="px-2 py-1 hover:brightness-105 shadow-md rounded-lg bg-custom-green-300 text-sm text-black "
        >
          이벤트
        </Link>
      </div>

      <main className="border-2 min-h-screen w-[1280px] mx-auto border-y-custom-green-700 border-x-custom-green-700">
        {children}
        <IEFooter />
      </main>
      <Footer />
    </div>
  );
}

export default layout;
