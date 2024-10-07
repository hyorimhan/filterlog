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
