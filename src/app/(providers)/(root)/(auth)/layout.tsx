import Footer from '@/components/common/Footer';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className=" w-[1280px] min-h-screen border-x-2 h-screen  bg-custom-green-300  border-x-custom-green-700 mx-auto">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default layout;
