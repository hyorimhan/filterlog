import { sIgnUp } from '@/app/service/auth';
import { createClient } from '@/supabase/client';
import { signUpType } from '@/types/userForm';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { nicknameConfirm } from '../../service/auth';

const supabase = createClient();

async function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<signUpType>();

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
      alert(errors.passwordConfim?.message);
    }
  };
  return (
    <form>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          className="border-2 rounded-md border-custom-green-600"
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          className="border-2 rounded-md border-custom-green-600"
        />
      </div>
      <div>
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          type="password"
          id="passwordConfirm"
          className="border-2 rounded-md border-custom-green-600"
        />
      </div>
      <div>
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          id="nickname"
          className="border-2 rounded-md border-custom-green-600"
        />
      </div>
      <button type="submit">회원가입</button>
    </form>
  );
}

export default SignUp;
