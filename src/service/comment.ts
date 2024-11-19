import { commentsType } from '@/types/userBlog';
import axios from 'axios';

export const addComment = async ({
  user_id,
  post_id,
  content,
  nickname,
}: commentsType) => {
  const response = await axios.post(`/api/blog/comments/${post_id}`, {
    user_id,
    content,
    nickname,
    post_id,
  });
  return response.data;
};

export const commentList = async ({
  post_id,
  page,
  limit,
}: {
  post_id: string;
  page: number;
  limit: number;
}) => {
  const response = await axios.get(`/api/blog/comments/${post_id}`, {
    params: { post_id, page, limit },
  });

  return response.data;
};

export const deleteComments = async (id: string) => {
  const response = await axios.delete(`/api/blog/comments/${id}`);
  return response.data;
};

export const updateComments = async ({
  id,
  content,
}: {
  id: string;
  content: string;
}) => {
  const response = await axios.patch(`/api/blog/comments/${id}`, { content });
  return response.data;
};
