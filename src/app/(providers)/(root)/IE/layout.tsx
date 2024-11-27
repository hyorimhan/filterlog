import IEFooter from '@/components/common/footer/footerLinks/IEFooter';
import BaseLayout from '@/components/common/layout/BaseLayout';
import IEnav from '@/components/common/layout/IEnav';
import { layoutStyle } from '@/styles/layout';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BaseLayout
        withBlogHeader={false}
        withFooter={true}
        withHeader={true}
        mainClassName={`${layoutStyle.main} border-2 border-y-custom-green-700 `}
        divClassName={layoutStyle.div_container}
      >
        <IEnav />
        {children}
        <IEFooter />
      </BaseLayout>
    </>
  );
}

export default layout;
