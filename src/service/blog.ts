import { createClient } from '@/supabase/client';
import { createBlogType } from '@/types/userBlog';
import { User } from '@supabase/supabase-js';
import axios from 'axios';

const supabase = createClient();
export const createBlog = async ({
  blog_name,
  description,
}: createBlogType) => {
  const response = await axios.post('/api/blog', { blog_name, description });
  return response.data;
};

export const existingBlog = async (user: User | null) => {
  if (!user || !user.id) {
    throw new Error('로그인 정보가 없습니다');
  }
  const { data: existing, error: existingError } = await supabase
    .from('blog')
    .select('*')
    .eq('user_id', user?.id)
    .single();

  if (existingError) {
    alert('블로그는 인당 1개만 만들 수 있습니다');
    return;
  }
  return existing;
};
