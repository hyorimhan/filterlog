import Detail from '@/components/official/Detail';
import { blogParams } from '@/types/userBlog';
import React from 'react';

function DetailPage({ params }: Readonly<blogParams>) {
  return <Detail params={params} />;
}

export default DetailPage;
