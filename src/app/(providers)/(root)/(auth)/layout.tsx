import Header from '@/components/common/Header';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className=" w-[1280px] border-x-2 h-screen border-x-custom-green-700 mx-auto">
        {children}
      </main>
    </div>
  );
}

export default layout;
