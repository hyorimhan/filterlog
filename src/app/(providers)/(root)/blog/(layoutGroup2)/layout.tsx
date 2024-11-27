import BaseLayout from '@/components/common/layout/BaseLayout';
import { layoutStyle } from '@/styles/layout';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <BaseLayout
      withBlogHeader={false}
      withFooter={true}
      withHeader={true}
      mainClassName={`${layoutStyle.main} ${layoutStyle.main_bg}`}
      divClassName={layoutStyle.div_container}
    >
      {children}
    </BaseLayout>
  );
}

export default layout;
