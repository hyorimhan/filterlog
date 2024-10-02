import QueryProvider from './_providers/QueryProvider';
import Footer from '@/components/common/Footer';

function ProvidersLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <div
        className={` font-medium  w-full h-screen flex flex-col  bg-center bg-no-repeat bg-cover`}
      >
        <main className="flex-grow overflow-hidden font-dotum">{children}</main>
        <Footer />
      </div>
    </QueryProvider>
  );
}

export default ProvidersLayout;
