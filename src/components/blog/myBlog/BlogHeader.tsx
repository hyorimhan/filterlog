'use client';

import React from 'react';

function BlogHeader({ description }: { description: string }) {
  return (
    <>
      <div className="h-12 text-sm border-2 font-medium border-y-custom-green-700 mb-1 flex justify-center items-center">
        <span> {description}</span>
      </div>
    </>
  );
}

export default BlogHeader;
