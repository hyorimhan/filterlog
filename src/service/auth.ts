import { createClient } from '@/supabase/client';
import { Database } from '@/types/supabase';
import { loginType } from '@/types/userForm';
import axios from 'axios';

const supabase = createClient();

//회원가입
export const sIgnUp = async ({
  email,
  password,
  nickname,
}: Database['public']['Tables']['users']['Insert'] & { password: string }) => {
  const response = await axios.post('/api/auth/signup', {
    email,
    password,
    nickname,
  });
  return response.data;
};

//로그인
export const login = async ({ email, password }: loginType) => {
  const response = await axios.post('/api/auth/login', { email, password });
  return response.data;
};

//로그인한 유저 정보
export const userInfo = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

//로그인한 유저 닉네임 가져오기
export const profile = async (email: string) => {
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  return profile;
};

//로그아웃
export const logout = async () => {
  const response = await axios.delete('/api/auth/logout');
  return response.data;
};
