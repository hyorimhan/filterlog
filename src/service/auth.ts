import { createClient } from '@/supabase/client';
import { Database } from '@/types/supabase';
import axios from 'axios';

export const sIgnUp = async ({
  email,
  password,
  nickname,
}: Database['public']['Tables']['users']['Insert'] & { password: string }) => {
  // const response = await axios.post('/api/auth/signup', {
  //   email,
  //   password,
  //   nickname,
  // });
  // return response.data;
  try {
    const response = await axios.post('/api/auth/signup', {
      email,
      password,
      nickname,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios 에러:', error.response?.data || error.message);
    } else {
      console.error('알 수 없는 에러:', error);
    }
    throw error;
  }
};

export const nicknameConfirm = async () => {
  const supabase = createClient();

  const { data: nickname } = await supabase.from('users').select('*');
  return nickname;
};
