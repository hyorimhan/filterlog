'use client';
import SignUp from '@/components/auth/SignUp';
import Image from 'next/image';
import React from 'react';

const SignUpPage = () => {
  return (
    <>
      <Image
        src={'/signup/signUp.png'}
        width={1000}
        height={300}
        alt="signUp"
        className="mx-auto"
      />
      <SignUp />
    </>
  );
};

export default SignUpPage;
