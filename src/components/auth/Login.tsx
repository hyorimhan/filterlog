import React from 'react';
// import { useForm } from 'react-hook-form';

function Login() {
  // const { register, handleSubmit } = useForm();
  return (
    <div className="font-dotum flex flex-col items-center justify-center">
      <div className="text-center mt-[30%]">로그인</div>
      <form>
        <div>
          <label htmlFor="id">아이디</label>
          <input id="id" autoFocus />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input type="password" />
        </div>

        <button type="submit">로그인</button>
        <button>회원가입</button>
      </form>
    </div>
  );
}

export default Login;
