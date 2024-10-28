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
  img_url: string[] | string | null;
  user_id: string;
};

// export type postFormType = Omit<blogPostType, 'post' | 'nickname' | 'blog_id'>;

export type postListType = {
  title: string | null;
  content: string | null;
  created_at: string;
  id: string;
  img_url: string[] | string | null;
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

export type useBlogOwnerId = {
  ownerId: string | null;
  saveOwnerId: (info: string | null) => void;
};

export interface editorProps {
  isUpdate: boolean;
  defaultTitle: string;
  defaultContent: string;
  defaultImg: string[];
  post_id: string;
  cancelBtn: () => void;
}
