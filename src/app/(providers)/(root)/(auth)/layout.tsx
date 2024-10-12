import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen">
      <Header />
      <main className=" w-[1280px] min-h-screen border-x-2 h-screen  bg-custom-green-300  border-x-custom-green-700 mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default layout;
