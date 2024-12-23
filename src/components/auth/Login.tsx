import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '@/constants/auth';
import { login } from '@/service/auth';
import { loginType } from '@/types/userForm';
import useUserInfo from '@/zustand/useUserInfo';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { FieldErrors, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function Login({ showSignUp = true }: Readonly<{ showSignUp: boolean }>) {
  const { register, handleSubmit, reset } = useForm<loginType>();
  const { saveUser } = useUserInfo();
  const queryClient = useQueryClient();

  const loginForm = async (data: loginType) => {
    try {
      const response = await login(data);
      if (response.error) {
        toast.error(response.error);
        reset();
        return;
      }
      if (response.data.user) {
        saveUser(response.data.user);
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['userData'] }),
          queryClient.invalidateQueries({ queryKey: ['user'] }),
        ]);

        toast.success(response.message);
      } else {
        toast.error('아이디, 비밀번호를 다시 확인해주세요');
      }
    } catch (error) {
      toast.error('오류가 발생했습니다');
    }
  };

  const handleError = (errors: FieldErrors) => {
    Object.values(errors).forEach((error) => {
      if (error?.message) alert(error.message);
    });
  };
  return (
    <div className="font-dotum flex flex-col items-center justify-center">
      <div className="mt-[30%]" />
      <form onSubmit={handleSubmit(loginForm, handleError)}>
        <div className="flex">
          <div className="mr-3">
            <div className="mb-[6px]">
              {/* <label htmlFor="email"></label> */}
              <input
                id="email"
                type="email"
                placeholder="아이디"
                aria-label="email"
                autoFocus
                className="w-[150px] h-6"
                {...register('email', EMAIL_VALIDATION())}
              />
            </div>
            <div>
              {/* <label htmlFor="password"></label> */}
              <input
                type="password"
                placeholder="비밀번호"
                aria-label="password"
                className="w-[150px] h-6"
                {...register('password', PASSWORD_VALIDATION())}
              />
            </div>
          </div>
          <button type="submit" className="w-[75px] font-galmuri">
            로그인
          </button>
        </div>
      </form>
      {showSignUp && (
        <Link href={'/signup'}>
          <div className="focus:outline-none font-galmuri border-t-[1px] mt-10 w-full text-center pt-6 text-black ">
            회원가입
          </div>
        </Link>
      )}
    </div>
  );
}

export default Login;
