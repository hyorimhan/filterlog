import { createClient } from '@/supabase/client';
import { blogPostType, createBlogType } from '@/types/userBlog';
import { User } from '@supabase/supabase-js';
import axios from 'axios';

const supabase = createClient();

// 블로그 생성
export const createBlog = async ({
  blog_name,
  description,
  user_id,
  nickname,
}: createBlogType) => {
  const response = await axios.post('/api/post/blog', {
    blog_name,
    description,
    user_id,
    nickname,
  });
  return response.data;
};

// 이미 생성된 블로그가 있는지 확인
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

// 글 작성
export const blogPost = async ({
  blog_id,
  nickname,
  content,
  title,
}: blogPostType) => {
  const response = await axios.post('/api/post/write', {
    blog_id,
    nickname,
    content,
    title,
  });
  return response.data;
};
