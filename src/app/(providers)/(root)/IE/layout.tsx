import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen  ">
      <Header />
      <main className="border-2 min-h-screen w-[1280px] mx-auto border-y-custom-green-700 border-x-custom-green-700">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default layout;
