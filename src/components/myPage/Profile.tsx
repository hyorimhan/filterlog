'use client';
import {
  getBlogProfile,
  profileImgUpdate,
  profileImgUpload,
  userProfileImg,
} from '@/service/auth';
import { existingBlog, updateBlogInfo } from '@/service/blog';
import { blogInfoType, blogInfoUpdateType, updateBlog } from '@/types/userBlog';
import useUserInfo from '@/zustand/useUserInfo';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
// import React, { useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { FaPen } from 'react-icons/fa';
import Loading from '../common/Loading';
import toast from 'react-hot-toast';
// import useBlogInfo from '@/zustand/useBlogInfo';
import { blogDescriptionValidate, blogNameValidate } from './profileValidate';

function Profile() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const user = useUserInfo((state) => state.user);
  // const { blogInfo } = useBlogInfo();
  // console.log(blogInfo);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // useEffect(() => {
  //   if (!blogInfo) {
  //     toast.error('블로그 먼저 생성해주세요');
  //     router.replace('/blog');
  //   }
  // }, [blogInfo, router]);
  const { data: existingData, isLoading: existingLoading } = useQuery({
    queryKey: ['existingData', user?.id],
    queryFn: () => existingBlog(user?.id as string),
    enabled: !!user?.id,
  });
  const { data: profileImg, isLoading: profileLoading } = useQuery({
    queryKey: ['profileImg', user?.id],
    queryFn: () => {
      if (!user?.id) return null;
      return userProfileImg(user?.id);
    },
    enabled: !!user?.id,
    staleTime: 5000,
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

  if (isLoading || profileLoading || existingLoading) {
    return <Loading />;
  }
  if (!existingData) {
    toast.error('블로그 먼저 생성해주세요');
    router.replace('/blog');
    return null;
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    if (file.size > 5 * 1024 * 1024 || !file.type.startsWith('image/')) {
      toast.error('5mb 이하의 이미지 파일만 업로드 가능합니다');
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setImgPreview(previewUrl);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', user?.id);

    setIsUploading(true);
    try {
      if (!profileImg) {
        await profileImgUpload(formData);
      } else {
        await profileImgUpdate(formData);
      }
      await queryClient.invalidateQueries({
        queryKey: ['profileImg', user.id],
      });
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
        toast.success(response.message);
        // queryClient.invalidateQueries({ queryKey: ['blogProfile'] });
        await queryClient.invalidateQueries({ queryKey: ['userData'] });
        await queryClient.invalidateQueries({ queryKey: ['profileData'] });

        router.replace(`/blog/${getProfile?.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateError = (errors: FieldErrors<updateBlog>) => {
    if (errors.nickname?.message) {
      toast.error(errors.nickname.message);
      return;
    }
    if (errors.blog_name?.message) {
      toast.error(errors.blog_name.message);
      return;
    }
    if (errors.description?.message) {
      toast.error(errors.description.message);
      return;
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mt-5  mx-auto">
      <label htmlFor="profile-upload" className="cursor-pointer relative ">
        <Image
          src={imgPreview ? imgPreview : profileImg || '/profile/profile.svg'}
          alt="profileimg"
          width={100}
          height={100}
          className="w-[100px] h-[100px] rounded-full border-2 border-custom-green-600  hover:brightness-75"
        />
        <span className="flex">
          <span className="absolute bottom-9 left-4 font-galmuri text-custom-green-700 font-semibold">
            이미지 변경
          </span>
          <span className="absolute right-2 bottom-9.5 text-custom-green-700  ">
            <FaPen />
          </span>
        </span>

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
        onSubmit={handleSubmit(updateProfile, updateError)}
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
          <div>*최소 3자 ~ 최대 30자</div>
        </div>

        <div className="flex flex-col my-3">
          <label htmlFor="blog_name" id="blog_name" className="text-sm">
            블로그 이름
          </label>
          <input
            type="text"
            id="blog_name"
            {...register('blog_name', blogNameValidate())}
            defaultValue={getProfile?.blog_name ?? ''}
            className="text-sm"
          />
          <div>*최소 2자 ~ 최대 30자</div>
        </div>

        <div className="flex flex-col my-3">
          <label htmlFor="description" id="description" className="text-sm">
            블로그 설명
          </label>
          <input
            type="text"
            id="description"
            {...register('description', blogDescriptionValidate())}
            defaultValue={getProfile?.description ?? ''}
            className="text-sm"
          />
          <div>*최소 2자 ~ 최대 50자</div>
        </div>

        <button className="my-5" disabled={isUploading}>
          {isUploading ? '이미지 업로드 중...' : '수정'}
        </button>
      </form>
    </div>
  );
}

export default Profile;
