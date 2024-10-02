import Link from 'next/link';
import React from 'react';
// import { useForm } from 'react-hook-form';

function Login() {
  // const { register, handleSubmit } = useForm();
  return (
    <div className="font-dotum flex flex-col items-center justify-center">
      <div className="mt-[30%]"></div>
      <form>
        <div className="flex">
          <div className="mr-3">
            <div className="mb-[6px]">
              <label htmlFor="id"></label>
              <input
                id="id"
                placeholder="아이디"
                autoFocus
                className="w-[150px] h-6"
              />
            </div>
            <div>
              <label htmlFor="password"></label>
              <input
                type="password"
                placeholder="비밀번호"
                className="w-[150px] h-6"
              />
            </div>
          </div>
          <button type="submit" className="w-[75px]">
            로그인
          </button>
        </div>
      </form>
      <Link href={'/signup'}>
        <div className="border-t-[1px] mt-10 w-full text-center pt-6 ">
          회원가입
        </div>
      </Link>
    </div>
  );
}

export default Login;
