import { getUserProfile, userProfileImg } from '@/service/auth';
import { existingBlog } from '@/service/blog';
import { detailOfficialPost } from '@/service/post';
import { useQuery } from '@tanstack/react-query';
// import { blogType, UserTableType } from '../../types/userBlog';

// type userProfileType = {
//   profileData: UserTableType | null | undefined
//   profileImg: blogType | null | undefined
//   isLoading: boolean;
// };

export const UseProfileQuery = ({ user_id }: { user_id: string }) => {
  const { data: profileData } = useQuery({
    queryKey: ['profileData', user_id],
    queryFn: () => getUserProfile(user_id),
    enabled: Boolean(user_id),
  });
  // 유저 테이블

  const { data: profileImg, isLoading } = useQuery({
    queryKey: ['profileImg', user_id],
    queryFn: () => {
      if (!user_id) return null;
      return userProfileImg(user_id);
    },
    enabled: !!user_id,
  });
  // 블로그 테이블
  return {
    profileData,
    profileImg,
    isLoading,
  };
};

export const UsePostQuery = ({ post_id }: { post_id: string }) => {
  const { data: detailPost, isLoading } = useQuery({
    queryKey: ['detailPost', post_id],
    queryFn: () => detailOfficialPost({ post_id }),
  });
  return {
    detailPost,
    isLoading,
  };
};

export const UseBlogQuery = ({ user_id }: { user_id: string }) => {
  const { data: existingData, isLoading } = useQuery({
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
