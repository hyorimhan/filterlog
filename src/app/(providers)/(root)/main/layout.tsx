import Footer from '@/components/common/footer/Footer';
import { Libre_Franklin } from 'next/font/google';

const libreFranklin = Libre_Franklin({ subsets: ['latin'] });
function layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${libreFranklin.className} font-medium bg-bg-main w-full h-screen flex flex-col  bg-center bg-no-repeat bg-cover`}
    >
      <main className="flex-grow overflow-hidden"> {children}</main>
      <Footer />
    </div>
  );
}

export default layout;
