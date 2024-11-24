import Link from 'next/link';
import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { emailValidate, passwordValidate } from './AuthValidate';
import { login } from '@/service/auth';
import { loginType } from '@/types/userForm';
import useUserInfo from '@/zustand/useUserInfo';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

function Login({ showSignUp = true }: { showSignUp: boolean }) {
  const { register, handleSubmit, reset } = useForm<loginType>();
  const { saveUser } = useUserInfo();
  const queryClient = useQueryClient(); // 추가

  const loginForm = async (data: loginType) => {
    try {
      const response = await login(data);

      if (response.error) {
        toast.error(response.error);
        reset();
        return;
      }
      if (response.user) {
        saveUser(response.user);
        await queryClient.invalidateQueries({ queryKey: ['userData'] });
        await queryClient.invalidateQueries({ queryKey: ['user'] });

        toast.success(response.message);
      } else {
        toast.error('아이디, 비밀번호를 다시 확인해주세요');
      }
    } catch (error) {
      toast.error('오류가 발생했습니다');
    }
  };

  const loginError = (errors: FieldErrors<loginType>) => {
    if (errors.email?.message) {
      toast.error(errors.email.message);
      return;
    }
    if (errors.password?.message) {
      toast.error(errors.password.message);
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
      {showSignUp && (
        <Link href={'/signup'}>
          <div className="font-galmuri focus:outline-none border-t-[1px] mt-10 w-full text-center pt-6 text-black ">
            회원가입
          </div>
        </Link>
      )}
    </div>
  );
}

export default Login;
