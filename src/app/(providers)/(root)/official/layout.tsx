import BaseLayout from '@/components/common/BaseLayout';
// import Footer from '@/components/common/footer/Footer';
// import Header from '@/components/common/Header';
import { layoutStyle } from '@/styles/layout';
// import Image from 'next/image';
// import Link from 'next/link';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BaseLayout
        withBlogHeader={false}
        withFooter={true}
        withHeader={true}
        mainClassName={`${layoutStyle.main}${layoutStyle.main_bg}`}
        divClassName={layoutStyle.div_container}
      >
        {children}
      </BaseLayout>

      {/* <div className="w-full h-screen   font-galmuri">
        <Header />
        <Link
          href={'/IE'}
          className="h-[120px] focus:outline-none w-[1280px] mx-auto flex  justify-center items-center border-b-0 border-t-0 bg-custom-green-300 border-2 border-custom-green-700"
        >
          <Image
            src={'/logo/filTextLogo2.svg'}
            alt="filterlogLogo"
            width={500}
            height={500}
            className="w-[380px] h-[120px] mx-auto border-0 pb-3 my-auto bg-custom-green-300 object-cover "
          />
        </Link>

        <main className="border-2 border-t-0 pb-20 min-h-screen bg-bg-blog bg-no-repeat bg-right-bottom overflow-hidden w-[1280px] mx-auto border-x-custom-green-700">
          {children}
        </main>
      </div>
      <Footer /> */}
    </>
  );
}

export default layout;
