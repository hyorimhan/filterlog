import { Libre_Franklin } from 'next/font/google';

const libreFranklin = Libre_Franklin({ subsets: ['latin'] });
function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${libreFranklin.className} font-medium `}>{children}</div>
  );
}

export default layout;
