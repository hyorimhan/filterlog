import { createClient } from '@/supabase/client';
import { Database } from '@/types/supabase';
import { loginType } from '@/types/userForm';
import axios from 'axios';

const supabase = createClient();

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

export const login = async ({ email, password }: loginType) => {
  const response = await axios.post('/api/auth/login', { email, password });
  return response.data;
};

export const userInfo = async () => {
  const { data: user } = await supabase.auth.getUser();
  return user.user;
};
