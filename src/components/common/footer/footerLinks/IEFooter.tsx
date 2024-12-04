'use client';

import FilterLog from './FilterLog';
import PrivacyPolicy from './PrivacyPolicy';
import Support from './Support';

function IEFooter() {
  return (
    <div className="h-24 flex flex-col justify-center w-full items-center bg-gray-200">
      <div className="flex mb-2 space-x-3">
        <div onClick={FilterLog} className="cursor-pointer">
          FilterLog 소개{' '}
        </div>
        <div onClick={Support} className="cursor-pointer">
          문의
        </div>
        <div onClick={PrivacyPolicy} className="cursor-pointer">
          개인정보 처리방침
        </div>
      </div>
      <p>Copyright © 2024 FilterLog. All rights reserved.</p>
    </div>
  );
}

export default IEFooter;
