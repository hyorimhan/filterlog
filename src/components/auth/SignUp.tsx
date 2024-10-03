import { signUpType } from '@/types/userForm';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { sIgnUp } from '../../service/auth';
import {
  emailValidate,
  nicknameValidate,
  passwordConfirmValidate,
  passwordValidate,
} from './AuthValidate';

function SignUp() {
  const { register, handleSubmit, watch } = useForm<signUpType>();

  const router = useRouter();
  const password = watch('password');
  const signUpSubmit = async (data: signUpType) => {
    const response = await sIgnUp(data);

    if (response) {
      alert(response.message);
      router.replace('/IE');
    }
  };

  const handleError = (errors: FieldErrors) => {
    if (errors.email?.message) {
      alert(errors.email.message);
    }
    if (errors.password?.message) {
      alert(errors.password.message);
    }
    if (errors.passwordConfirm?.message) {
      alert(errors.passwordConfirm?.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(signUpSubmit, handleError)}
      className="flex flex-col items-center"
    >
      <div className="flex flex-col items-center">
        <label htmlFor="email" className="text-sm font-dotum">
          이메일
        </label>
        <input
          type="email"
          id="email"
          {...register('email', emailValidate())}
          className="w-52 my-2 ml-2 text-sm"
        />
      </div>
      <div className="flex flex-col items-center mt-5">
        <label htmlFor="password" className="text-sm font-dotum">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          {...register('password', passwordValidate())}
          className="w-52 ml-2 text-sm"
        />
      </div>
      <div className="flex flex-col items-center mt-5">
        <label htmlFor="passwordConfirm" className="text-sm font-dotum">
          비밀번호 확인
        </label>
        <input
          type="password"
          id="passwordConfirm"
          {...register('passwordConfirm', passwordConfirmValidate(password))}
          className="w-52 my-2 ml-2 text-sm"
        />
      </div>
      <div className="flex flex-col items-center mt-5">
        <label htmlFor="nickname" className="text-sm font-dotum">
          닉네임
        </label>
        <input
          type="text"
          id="nickname"
          {...register('nickname', nicknameValidate())}
          className="w-52 ml-2 text-sm font-dotum"
        />
      </div>
      <button type="submit" className="my-2 mt-5 h-10">
        회원가입
      </button>
    </form>
  );
}

export default SignUp;
