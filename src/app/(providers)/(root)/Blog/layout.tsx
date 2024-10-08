import Footer from '@/components/common/Footer';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full border-2  border-x-border-blue h-full">
      <main className="border-2 h-full w-[1280px] mx-auto border-x-custom-green-700">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default layout;
