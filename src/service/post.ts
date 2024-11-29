import { createClient } from '@/supabase/client';
import { blogPostType, officialPostType } from '@/types/userBlog';
import axios from 'axios';

const supabase = createClient();

// 글 작성
export const blogPost = async ({
  blog_name,
  nickname,
  content,
  title,
  blog_id,
  img_url,
  user_id,
}: blogPostType) => {
  const response = await axios.post('/api/blog/write', {
    blog_name,
    nickname,
    content,
    title,
    blog_id,
    img_url,
    user_id,
  });
  return response.data;
};

export const myPostList = async ({
  blog_id,
  page,
  limit,
  year,
  month,
}: {
  blog_id: string;
  page: number;
  limit: number;
  year: string;
  month: string;
}) => {
  const response = await axios.get('/api/blog/post', {
    params: { blog_id, page, limit, year, month },
  });
  return response.data;
};

export const myPostDetail = async (post_id: string) => {
  const response = await axios.get(`/api/blog/post/${post_id}`, {
    params: { post_id },
  });
  return response.data;
};

// 글 삭제 (URL 경로 전달 -parmas)
export const deletePost = async (id: string) => {
  const response = await axios.delete(`/api/blog/post/${id}`);
  return response.data;
};

export const updatePost = async ({
  post_id,
  title,
  content,
  img_url,
}: {
  post_id: string;
  title: string;
  content: string;
  img_url: string[] | string | null;
}) => {
  const response = await axios.patch(`/api/blog/post/${post_id}`, {
    title,
    content,
    post_id,
    img_url,
  });
  return response.data;
};

export const allPosts = async () => {
  const { data, error } = await supabase
    .from('post')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error();
  }
  return data;
};

export const addOfficialPost = async ({
  title,
  description,
  owner_id,
  img_url,
  category,
}: officialPostType) => {
  const response = await axios.post('/api/blog/officialPost/write', {
    title,
    description,
    owner_id,
    img_url,
    category,
  });
  return response.data;
};

export const allOfficialPost = async ({
  category,
  page,
}: {
  category: string;
  page: number;
}) => {
  const response = await axios.get('/api/blog/officialPost/', {
    params: { category, page },
  });

  return response.data;
};

export const showOfficialPostInfo = async (category: string) => {
  const { data, error } = await supabase
    .from('official')
    .select('*')
    .eq('category', category);

  if (error) {
    console.log(error);
  }

  return data;
};

export const detailOfficialPosts = async ({ post_id }: { post_id: string }) => {
  const response = await axios.get(`/api/blog/officialPost/${post_id}`, {
    params: { post_id },
  });
  return response.data;
};
