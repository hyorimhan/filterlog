'use client';
import SignUp from '@/components/auth/SignUp';
import Image from 'next/image';
import React from 'react';

const SignUpPage = () => {
  return (
    <div>
      <Image
        src={'/signup/signUp.png'}
        width={1000}
        height={300}
        alt="signUp"
        className="mx-auto "
      />
      <div className="flex justify-center mt-10">
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
