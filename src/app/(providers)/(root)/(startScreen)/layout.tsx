import { Metadata } from 'next';
import { Libre_Franklin } from 'next/font/google';

const libreFranklin = Libre_Franklin({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '시작화면',
  description: 'Filter log의 시작화면입니다다',
};

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${libreFranklin.className} font-medium `}>{children}</div>
  );
}

export default layout;
