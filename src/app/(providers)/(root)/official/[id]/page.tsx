import Detail from '@/components/official/Detail';
import { blogParams } from '@/types/userBlog';
import React from 'react';

function DetailPage({ params }: blogParams) {
  return (
    <div>
      <Detail params={params} />
    </div>
  );
}

export default DetailPage;
