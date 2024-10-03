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
    <form onSubmit={handleSubmit(signUpSubmit, handleError)}>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          {...register('email', emailValidate())}
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          {...register('password', passwordValidate())}
        />
      </div>
      <div>
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          type="password"
          id="passwordConfirm"
          {...register('passwordConfirm', passwordConfirmValidate(password))}
        />
      </div>
      <div>
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          id="nickname"
          {...register('nickname', nicknameValidate())}
        />
      </div>
      <button type="submit">회원가입</button>
    </form>
  );
}

export default SignUp;
