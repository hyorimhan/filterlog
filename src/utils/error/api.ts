import { NextResponse } from 'next/server';

export const handleError = (message: string) => {
  return NextResponse.json({ message });
};

export const handleNetworkError = () => {
  return NextResponse.json({ error: '네트워크 오류가 발생했습니다' });
};

export const handleSuccess = (message: string, data?: unknown) => {
  return NextResponse.json({ message, data });
};

export const handleSignUpError = (message: string) => {
  return NextResponse.json({
    message: message.includes('already registered')
      ? '이미 가입된 이메일입니다'
      : message,
  });
};
