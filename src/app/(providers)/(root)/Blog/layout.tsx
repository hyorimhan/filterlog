import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full border-2 h-screen  border-x-border-blue  font-galmuri">
        <Header />
        <main className="border-2 min-h-screen overflow-hidden w-[1280px] mx-auto border-x-custom-green-700">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default layout;
