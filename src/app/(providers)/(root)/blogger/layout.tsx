import BaseLayout from '@/components/common/layout/BaseLayout';
import IELogo from '@/components/common/layout/IELogo';
import { layoutStyle } from '@/styles/layout';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <BaseLayout
      withBlogHeader={false}
      withFooter={true}
      withHeader={true}
      mainClassName={`${layoutStyle.main}${layoutStyle.main_bg} border-t-0`}
      divClassName={layoutStyle.div_container}
    >
      <IELogo />
      {children}
    </BaseLayout>
  );
}

export default layout;
