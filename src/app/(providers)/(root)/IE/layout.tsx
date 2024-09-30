import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className={` font-medium  w-full h-screen flex flex-col  bg-center bg-no-repeat bg-cover`}
      >
        <Header />
        <main className="flex-grow overflow-hidden font-dotum">{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default layout;
