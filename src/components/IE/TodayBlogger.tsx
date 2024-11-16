import React from 'react';

function TodayBlogger() {
  return (
    <div className="font-galmuri text-sm text-center pt-2 border-2 h-full border-l-custom-green-700 border-y-custom-green-700">
      <div className="border-dashed border-b-2 pb-1 border-custom-green-400 mx-3">
        <span className="flex justify-end cursor-pointer">more+</span>

        <span className="flex justify-center">이웃 찾기</span>
      </div>
    </div>
  );
}

export default TodayBlogger;
