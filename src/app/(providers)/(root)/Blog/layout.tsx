import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full h-screen   font-galmuri">
        <Header />
        <main className="border-2 pb-20 min-h-screen bg-bg-blog bg-no-repeat bg-right-bottom overflow-hidden w-[1280px] mx-auto border-x-custom-green-700">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default layout;
