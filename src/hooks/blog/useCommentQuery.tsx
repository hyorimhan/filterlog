import {commentList} from '@/service/comment';
import {useQuery} from '@tanstack/react-query';

interface CommentFormData {
  content: string;
  id: string;
  created_at: string;
  nickname: string;
  user_id: string;
}
interface CommentQueryResult {
  data: CommentFormData[];
  count: number;
  limit: number;
  page: number;
}

export const useCommentQuery = ({
  post_id,
  limit,
  page,
}: {
  post_id: string;
  limit: number;
  page: number;
}) => {
  const {data: comments, isLoading} = useQuery<CommentQueryResult>({
    queryKey: ['comments', post_id],
    queryFn: () => commentList({post_id, limit, page}),
    enabled: !!post_id,
  });
  return {
    comments,
    isLoading,
  };
};
