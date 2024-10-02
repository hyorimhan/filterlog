import Header from '@/components/common/Header';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className="border w-[1280px] border-y-custom-green-700">
        {children}
      </main>
    </div>
  );
}

export default layout;
