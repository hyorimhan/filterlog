'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

function Header() {
  const router = useRouter();
  const closeWindow = () => {
    router.replace('/main');
  };
  return (
    <div className="title-bar">
      <div className="title-bar-text">filter log</div>
      <div className="title-bar-controls">
        <button aria-label="Close" onClick={closeWindow}></button>
      </div>
    </div>
  );
}

export default Header;
