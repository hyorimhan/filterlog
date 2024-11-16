'use client';

import FilterLog from './FilterLog';
import PrivacyPolicy from './PrivacyPolicy';
import Support from './Support';

function IEFooter() {
  return (
    <div className="h-24 flex flex-col justify-center w-full items-center bg-gray-200">
      <div className="flex mb-2 space-x-3">
        <p onClick={FilterLog} className="cursor-pointer">
          FilterLog 소개{' '}
        </p>
        <p onClick={Support} className="cursor-pointer">
          문의
        </p>
        <p onClick={PrivacyPolicy} className="cursor-pointer">
          개인정보 처리방침
        </p>
      </div>
      <p>Copyright © 2024 FilterLog. All rights reserved.</p>
    </div>
  );
}

export default IEFooter;
