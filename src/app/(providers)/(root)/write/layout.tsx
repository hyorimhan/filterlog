import BlogHeader from '@/components/common/BlogHeader';
import Footer from '@/components/common/footer/Footer';
import Header from '@/components/common/Header';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full h-screen   font-galmuri">
        <Header />

        <main className="border-2 pb-20 min-h-screen bg-bg-blog bg-no-repeat bg-right-bottom overflow-hidden w-[1280px] mx-auto border-x-custom-green-700">
          <BlogHeader />
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default layout;
