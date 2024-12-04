import {
  EMAIL_VALIDATION,
  NICKNAME_VALIDATION,
  PASSWORD_CONFIRM_VALIDATION,
  PASSWORD_VALIDATION,
} from '@/constants/auth';
import { signUpType } from '@/types/userForm';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FieldErrors, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { sIgnUp } from '../../service/auth';

function SignUp() {
  const { register, handleSubmit, watch } = useForm<signUpType>();
  const queryClient = useQueryClient();
  const router = useRouter();
  const password = watch('password');

  const signUpSubmit = async (data: signUpType) => {
    const response = await sIgnUp(data);

    if (response) {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ['userData'] });
      router.replace('/IE');
    }
  };
  const handleError = (errors: FieldErrors) => {
    Object.values(errors).forEach((error) => {
      if (error?.message) alert(error.message);
    });
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
          {...register('email', EMAIL_VALIDATION())}
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
          {...register('password', PASSWORD_VALIDATION())}
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
          {...register(
            'passwordConfirm',
            PASSWORD_CONFIRM_VALIDATION(password)
          )}
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
          {...register('nickname', NICKNAME_VALIDATION())}
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
