import { createClient } from '@/supabase/client';
import { Database } from '@/types/supabase';
import { userProfileType } from '@/types/userBlog';
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

//로그인한 유저 블로그 정보 가져오기
export const getBlogProfile = async (user_id: string) => {
  if (!user_id) return null;
  const { data, error } = await supabase
    .from('blog')
    .select('*')
    .eq('user_id', user_id)
    .single();
  if (error) {
    console.log(error);
    return null;
  }
  return data;
};

//로그아웃
export const logout = async () => {
  const response = await axios.delete('/api/auth/logout');
  return response.data;
};

export const updateProfile = async ({
  nickname,
  blog_name,
  description,
}: userProfileType) => {
  const response = await axios.patch('/api/auth/profile', {
    nickname,
    description,
    blog_name,
  });
  return response.data;
};

export const porfileImg = async (formData: FormData) => {
  const resposne = await axios.post('/api/auth/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return resposne.data;
};
