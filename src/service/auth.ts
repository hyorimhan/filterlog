import { createClient } from '@/supabase/client';
import { Database } from '@/types/supabase';
import axios from 'axios';

const supabase = createClient();

export const sIgnUp = async ({
  email,
  password,
}: Database['public']['Tables']['users']['Insert'] & { password: string }) => {
  const response = await axios.post('/api/auth/signup', { email, password });
  return response.data;
};

export const nicknameConfirm = async () => {
  const { data: nickname } = await supabase.from('users').select('*');
  return nickname;
};
