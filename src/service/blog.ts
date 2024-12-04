import { createClient } from '@/supabase/client';
import { blogInfoUpdateType, createBlogType } from '@/types/userBlog';
import axios from 'axios';

const supabase = createClient();

// 블로그 생성
export const createBlog = async ({
  blog_name,
  description,
  user_id,
  nickname,
}: createBlogType) => {
  const response = await axios.post('/api/blog/create', {
    blog_name,
    description,
    user_id,
    nickname,
  });
  return response.data;
};

// 이미 생성된 블로그가 있는지 확인
export const existingBlog = async (user_id: string) => {
  if (!user_id) {
    return null;
  }
  const { data: existing } = await supabase
    .from('blog')
    .select('*')
    .eq('user_id', user_id)
    .single();

  return existing;
};

//블로그 id로 특정 블로그 정보 가져오기
export const getBlogId = async (blog_id: string) => {
  const { data, error } = await supabase
    .from('blog')
    .select('*')
    .eq('id', blog_id)
    .single();

  if (error) {
    console.log(error);
    return null;
  }

  return data;
};

// post id로 특정 블로그 정보 가져오기
export const postBlogInfo = async (post_id: string) => {
  const { data, error } = await supabase
    .from('post')
    .select(
      `
      *,
      blog!post_blog_id_fkey(description, blog_name)
    `
    )
    .eq('id', post_id)
    .maybeSingle();

  if (error) {
    console.log(error);
    return null;
  }

  return data;
};

export const updateBlogInfo = async ({
  nickname,
  blog_name,
  description,
  user_id,
}: blogInfoUpdateType) => {
  const response = await axios.patch('/api/auth/profile', {
    nickname,
    blog_name,
    description,
    user_id,
  });
  return response.data;
};

export const allUsers = async (page: number) => {
  const pagePost = 10;
  const from = page * pagePost;
  const to = from + pagePost - 1;
  const { data, count, error } = await supabase
    .from('blog')
    .select('*', { count: 'exact' })
    .range(from, to);
  if (error) {
    throw new Error();
  }
  return { data, count: count ?? 0 };
};
