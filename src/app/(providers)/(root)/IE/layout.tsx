import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Image from 'next/image';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen  ">
      <Header />
      <div className="h-[150px] w-[1280px] mx-auto flex  justify-center items-center border-b-0 border-t-0 bg-custom-green-300 border-2 border-x-custom-green-700">
        <Image
          src={'/logo/filTextLogo1.svg'}
          alt="filterlogLogo"
          width={500}
          height={500}
          className="w-[380px] h-[150px] mx-auto border-0 pb-3 my-auto bg-custom-green-300 object-cover "
        />
      </div>
      <main className="border-2 min-h-screen w-[1280px] mx-auto border-y-custom-green-700 border-x-custom-green-700">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default layout;
