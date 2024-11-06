'use clinet';
import {
  getBlogProfile,
  profileImgUpload,
  userProfileImg,
} from '@/service/auth';
import { updateBlogInfo } from '@/service/blog';
import { blogInfoType, blogInfoUpdateType } from '@/types/userBlog';
import useUserInfo from '@/zustand/useUserInfo';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
// import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function Profile() {
  const router = useRouter();
  const user = useUserInfo((state) => state.user);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { data: profileImg, isLoading: profileLoading } = useQuery({
    queryKey: ['profileImg'],
    queryFn: () => {
      if (!user?.id) return null;
      return userProfileImg(user?.id);
    },
    enabled: !!user?.id,
  });

  const { register, handleSubmit } = useForm<blogInfoUpdateType>();

  const { data: getProfile, isLoading } = useQuery<blogInfoType | null>({
    queryKey: ['getProfile', user?.id],
    queryFn: () => {
      if (!user?.id) return null;
      return getBlogProfile(user?.id);
    },
    enabled: !!user?.id,
  });

  if (isLoading || profileLoading) {
    return '로딩중';
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    if (file.size > 5 * 1024 * 1024 || !file.type.startsWith('image/')) {
      alert('5mb 이하의 이미지 파일만 업로드 가능합니다');
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setImgPreview(previewUrl);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', user?.id);

    setIsUploading(true);
    try {
      await profileImgUpload(formData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  const updateProfile = async (data: blogInfoUpdateType) => {
    try {
      if (!user?.id || !getProfile?.id) {
        throw new Error();
      }
      const response = await updateBlogInfo({
        ...data,
        user_id: user?.id,
      });
      if (response) {
        alert('업데이트 되었습니다');
        router.replace(`/blog/${getProfile?.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mt-5  mx-auto">
      <label htmlFor="profile-upload" className="cursor-pointer ">
        <Image
          src={imgPreview ? imgPreview : profileImg || '/profile/profile.svg'}
          alt="profileimg"
          width={100}
          height={100}
          className="rounded-full border-2 border-custom-green-600 hover:brightness-75"
        />

        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isUploading}
          className="hidden"
        />
      </label>

      {isUploading && '업로드 중'}
      <form
        className=" flex flex-col mt-5"
        onSubmit={handleSubmit(updateProfile)}
      >
        <div className="flex flex-col my-3 ">
          <label htmlFor="nickname" id="nickname" className="text-sm">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            {...register('nickname')}
            defaultValue={getProfile?.nickname as string}
            className="text-sm w-52"
          />
          <div>*최소 3자 ~ 최대 13자</div>
        </div>

        <div className="flex flex-col my-3">
          <label htmlFor="blog_name" id="blog_name" className="text-sm">
            블로그 이름
          </label>
          <input
            type="text"
            id="blog_name"
            {...register('blog_name')}
            defaultValue={getProfile?.blog_name ?? ''}
            className="text-sm"
          />
          <div>*최소 3자 ~ 최대 13자</div>
        </div>

        <div className="flex flex-col my-3">
          <label htmlFor="description" id="description" className="text-sm">
            블로그 설명
          </label>
          <input
            type="text"
            id="description"
            {...register('description')}
            defaultValue={getProfile?.description ?? ''}
            className="text-sm"
          />
          <div>*최소 3자 ~ 최대 13자</div>
        </div>

        <button className="my-5">수정</button>
      </form>
    </div>
  );
}

export default Profile;
