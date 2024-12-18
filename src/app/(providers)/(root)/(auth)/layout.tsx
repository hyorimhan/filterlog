import BaseLayout from '@/components/common/layout/BaseLayout';
import { layoutStyle } from '@/styles/layout';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <BaseLayout
      withHeader={true}
      withFooter={true}
      withBlogHeader={false}
      mainClassName={`${layoutStyle.main} border-x-2 h-screen  bg-custom-green-300`}
      divClassName={layoutStyle.div_container}
    >
      {children}
    </BaseLayout>
  );
}

export default layout;
