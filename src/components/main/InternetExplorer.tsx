'use client';

import { memo } from 'react';
import MainIcon from '../common/MainIcon';

function InternetExplorer() {
  return (
    <MainIcon
      windowTitle="Internet Explorer"
      title="Internet"
      plusTitle="Explorer"
      path="/IE"
      imgUrl="/main/IE.png"
    />
  );
}

export default memo(InternetExplorer);
