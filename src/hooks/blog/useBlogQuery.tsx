import {allUsers, existingBlog, getBlogId} from '@/service/blog';
import {useQuery} from '@tanstack/react-query';

export const useBlogQuery = ({user_id}: {user_id: string}) => {
  const {data: existingData, isLoading} = useQuery({
    queryKey: ['existingData', user_id],
    queryFn: () => existingBlog(user_id),
    enabled: !!user_id,
    gcTime: 0,
  });
  return {
    existingData,
    isLoading,
  };
};

export const useBlogInfoQuery = (blog_id: string) => {
  const {data: blogData, isLoading} = useQuery({
    queryKey: ['blog', blog_id],
    queryFn: () => getBlogId(blog_id),
    enabled: !!blog_id,
  });
  return {
    blogData,
    isLoading,
  };
};

export const useBloggerQuery = (currentPage: number) => {
  const {data: allUserData, isLoading} = useQuery({
    queryKey: ['allUserData'],
    queryFn: () => allUsers(currentPage),
  });
  return {
    allUserData,
    isLoading,
  };
};
