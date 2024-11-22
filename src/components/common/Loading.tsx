import React from 'react';
import { ColorRing } from 'react-loader-spinner';

function Loading() {
  return (
    <div className="flex justify-center items-center fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-[1000]">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#4F7670', '#659F7C', '#92BEA9', '#C5DEDA', '#849b87']}
      />
    </div>
  );
}

export default Loading;
