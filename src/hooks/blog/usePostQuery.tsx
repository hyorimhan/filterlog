import {
  detailOfficialPosts,
  myPostDetail,
  showOfficialPostInfo,
} from '@/service/post';
import {useQuery} from '@tanstack/react-query';

export const usePostQuery = ({post_id}: {post_id: string}) => {
  const {data: detailOfficialPost, isLoading} = useQuery({
    queryKey: ['detailOfficialPost', post_id],
    queryFn: () => detailOfficialPosts({post_id}),
  });

  const {data: detailMyPost, isLoading: myPostLoading} = useQuery({
    queryKey: ['postDetail', post_id],
    queryFn: () => myPostDetail(post_id),
  });

  return {
    detailOfficialPost,
    isLoading,
    myPostLoading,
    detailMyPost,
  };
};

export const useCategoryPost = (category: string) => {
  const {data: showOfficialPost, isLoading: categoryLoading} = useQuery({
    queryKey: ['showOfficialPost', category],
    queryFn: () => showOfficialPostInfo(category),
  });
  return {
    showOfficialPost,
    categoryLoading,
  };
};
