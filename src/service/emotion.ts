import { userEmotionType } from '@/types/userBlog';
import axios from 'axios';

//내 기분 등록
export const myEmotion = async ({
  user_id,
  blog_id,
  emotion,
}: userEmotionType) => {
  const response = await axios.post('/api/emotion', {
    user_id,
    blog_id,
    emotion,
  });
  return response.data;
};

// 등록된 감정
export const existingMyEmotion = async ({
  ownerId,
  blog_id,
  date,
}: {
  ownerId: string;
  blog_id: string;
  date: string;
}) => {
  const response = await axios.get('/api/emotion', {
    params: { ownerId, blog_id, date },
  });
  return response.data;
};

// 총 감정
export const totalMyEmotion = async ({ ownerId }: { ownerId: string }) => {
  const response = await axios.get('/api/emotion', {
    params: { ownerId, action: 'getTotalEmotions' },
  });
  return response.data;
};
