import Link from 'next/link';
import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { emailValidate, passwordValidate } from './AuthValidate';
import { login } from '@/service/auth';
import { loginType } from '@/types/userForm';
import useUserInfo from '@/zustand/useUserInfo';
import { usePathname, useRouter } from 'next/navigation';

function Login() {
  const router = useRouter();
  const pathname = usePathname();
  const { register, handleSubmit, reset } = useForm<loginType>();
  const saveUser = useUserInfo((state) => state.saveUser);
  const loginForm = async (data: loginType) => {
    try {
      const response = await login(data);

      if (response.error) {
        alert(response.error);
        reset();
        return;
      }
      if (response.user) {
        alert('로그인 되었습니다');
        saveUser(response.user);
        router.replace(pathname);
      } else {
        alert('아이디, 비밀번호를 다시 확인해주세요');
      }
    } catch (error) {
      alert('오류가 발생했습니다');
    }
  };

  const loginError = (errors: FieldErrors<loginType>) => {
    if (errors.email?.message) {
      alert(errors.email.message);
      return;
    }
    if (errors.password?.message) {
      alert(errors.password.message);
      return;
    }
  };
  return (
    <div className="font-dotum flex flex-col items-center justify-center">
      <div className="mt-[30%]" />
      <form onSubmit={handleSubmit(loginForm, loginError)}>
        <div className="flex">
          <div className="mr-3">
            <div className="mb-[6px]">
              <label htmlFor="email"></label>
              <input
                id="email"
                type="email"
                placeholder="아이디"
                autoFocus
                className="w-[150px] h-6"
                {...register('email', emailValidate())}
              />
            </div>
            <div>
              <label htmlFor="password"></label>
              <input
                type="password"
                placeholder="비밀번호"
                className="w-[150px] h-6"
                {...register('password', passwordValidate())}
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
