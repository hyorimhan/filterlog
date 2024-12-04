import { Database } from './supabase';

export type createBlogType = {
  blog_name: string;
  description: string;
  user_id: string;
  nickname: string | null;
};

export type blogType = Database['public']['Tables']['blog']['Row'];
export type UserTableType = Database['public']['Tables']['users']['Row'];
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

export type userProfileType = Omit<createBlogType, 'user_id'>;

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

export type useBlogType = {
  ownerId: string | null;
  saveOwnerId: (info: string | null) => void;
  blogInfo: blogInfoType | null;
  saveBlogInfo: (info: blogInfoType | null) => void;
};

export interface editorProps {
  isUpdate: boolean;
  defaultTitle: string;
  defaultContent: string;
  defaultImg: string[];
  post_id: string;
  cancelBtn: () => void;
}

export type blogInfoType = {
  nickname: string | null;
  description: string | null;
  blog_name: string | null;
  user_id: string | null;
  profile_img: string | null;
  id: string;
};

export type blogInfoUpdateType = Omit<blogInfoType, 'id'>;

export type commentsType = {
  user_id: string;
  post_id: string;
  content: string;
  nickname: string;
};

export type searchType = {
  searchWord: string;
  selectedYear: string;
  selectedMonth: string;
  currentPage: number;
  setSearchWord: (searchWord: string) => void;
  setSelectedYear: (selectedYear: string) => void;
  setSelectedMonth: (selectedMonth: string) => void;
  setCurrentPage: (currentPage: number) => void;
};

export type addOfficialPostType = {
  title: string;
  description: string;
  owner_id: string;
  img_url: string[] | string | null;
  category: string;
  id: string;
};
export type officialPostType = Omit<addOfficialPostType, 'id'>;

export type SelectOfficialPostType = addOfficialPostType & {
  created_at: string;
};

export type updateBlog = Omit<createBlogType, 'user_id'>;
