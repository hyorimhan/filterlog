'use client';

import { memo } from 'react';
import MainIcon from '../common/MainIcon';

function InternetExplorer() {
  return (
    <MainIcon
      windowTitle="Internet Explorer"
      title="Internet"
      plusTitle="Explorer"
      path="IE"
      imgUrl="/main/IE.png"
      width={300}
      height={300}
    />
  );
}

export default memo(InternetExplorer);
