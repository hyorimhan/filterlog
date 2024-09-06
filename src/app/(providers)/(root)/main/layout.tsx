import { Libre_Franklin } from 'next/font/google';

const libreFranklin = Libre_Franklin({ subsets: ['latin'] });
function layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${libreFranklin.className} font-medium bg-bg-main w-full h-screen  bg-center bg-no-repeat bg-cover`}
    >
      {children}
    </div>
  );
}

export default layout;
