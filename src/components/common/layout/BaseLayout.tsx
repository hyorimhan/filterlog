import Footer from '../footer/Footer';
import BlogHeader from './BlogHeader';
import Header from './Header';

type baseLayoutType = {
  children: React.ReactNode;
  withHeader: boolean;
  withFooter: boolean;
  withBlogHeader: boolean;
  divClassName: string;
  mainClassName: string;
};

function BaseLayout({
  children,
  withHeader,
  withFooter,
  withBlogHeader,
  divClassName,
  mainClassName,
}: baseLayoutType) {
  return (
    <>
      <div className={divClassName}>
        {withHeader && <Header />}
        <main className={mainClassName}>
          {withBlogHeader && <BlogHeader />}
          {children}
        </main>
      </div>
      {withFooter && <Footer />}
    </>
  );
}

export default BaseLayout;
