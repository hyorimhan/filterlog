import { Database } from './supabase';

export type createBlogType = {
  blog_name: string;
  description: string;
  user_id: string;
  nickname: string;
};

export type blogType = Database['public']['Tables']['blog']['Row'];

export type blogParams = {
  params: {
    id: string;
  };
};

export type blogPostType = {
  title: string;
  content: string;
  nickname: string;
  blog_name: string;
  blog_id: string;
};

export type postFormType = Omit<blogPostType, 'post' | 'nickname' | 'blog_id'>;

export type postListType = {
  title: string | null;
  content: string | null;
  created_at: string;
  id: string;
};

export type userEmotionType = {
  user_id: string;
  blog_id: string;
  emotion: string;
};

export type totalEmotionType = {
  totalCount: number;
  emotionCounts: { [key: string]: number };
};
