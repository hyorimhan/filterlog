import { myEmotion } from '@/service/blog';
import { userEmotionType } from '@/types/userBlog';
import Confirm from '@/utils/Confirm';
import useUserInfo from '@/zustand/useUserInfo';
import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

function Emotion({ blog_id }: { blog_id: string }) {
  const user = useUserInfo((state) => state.user);
  const user_id = user?.id;
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<string>();
  const { register } = useForm();
  const todayEmotion = async () => {
    if (!user_id || !blog_id || !selected) {
      return alert('데이터가 없습니다');
    }
    const data: userEmotionType = {
      user_id,
      blog_id,
      emotion: selected,
    };

    const response = await myEmotion(data);

    if (response) {
      alert(response.message);

      // 감정 등록 후 emotionData 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['emotionData'], // 'emotionData' 키를 가진 쿼리만 무효화
        exact: true, // 정확히 일치하는 쿼리만 무효화
      });
    }
  };

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selected) {
      return alert('감정을 선택해주세요');
    }
    Confirm({
      title: '내 오늘 기분은?',
      message: '정말 선택하시겠습니까? 선택시 수정 불가능합니다',
      onClick: () => todayEmotion(),
    });
  };
  return (
    <form className="border-2 flex-col w-full h-[300px] flex justify-center items-center ">
      <div className="text-lg">내 오늘 기분은?</div>
      <div className="flex gap-5 mt-10">
        <input
          type="radio"
          id="sad"
          value="sad"
          className="mr-2"
          {...register('mood')}
        />
        <Image
          src="/emotion/sad.svg"
          alt="sad"
          width={100}
          height={100}
          onClick={() => setSelected('sad')}
          className={`cursor-pointer hover:brightness-110 ${
            selected === 'sad'
              ? 'border-2 rounded-full border-custom-green-700'
              : ''
          }`}
        />
        <input
          type="radio"
          id="angry"
          value="angry"
          className="mr-2"
          {...register('mood')}
        />
        <Image
          src="/emotion/angry.svg"
          alt="angry"
          width={100}
          height={100}
          onClick={() => setSelected('angry')}
          className={`cursor-pointer hover:brightness-110 ${
            selected === 'angry'
              ? 'border-2 rounded-full border-custom-green-700'
              : ''
          }`}
        />
        <input
          type="radio"
          id="soso"
          value="soso"
          className="mr-2"
          {...register('mood')}
        />
        <Image
          src="/emotion/soso.svg"
          alt="soso"
          width={100}
          height={100}
          onClick={() => setSelected('soso')}
          className={`cursor-pointer hover:brightness-110 ${
            selected === 'soso'
              ? 'border-2 rounded-full border-custom-green-700'
              : ''
          }`}
        />
        <input
          type="radio"
          id="smile"
          value="smile"
          className="mr-2"
          {...register('mood')}
        />
        <Image
          src="/emotion/smile.svg"
          alt="smile"
          width={100}
          height={100}
          onClick={() => setSelected('smile')}
          className={`cursor-pointer hover:brightness-110 ${
            selected === 'smile'
              ? 'border-2 rounded-full border-custom-green-700'
              : ''
          }`}
        />
        <input
          type="radio"
          id="happy"
          value="happy"
          className="mr-2"
          {...register('mood')}
        />
        <Image
          src="/emotion/happy.svg"
          alt="happy"
          width={100}
          height={100}
          onClick={() => setSelected('happy')}
          className={`cursor-pointer hover:brightness-110 ${
            selected === 'happy'
              ? 'border-2 rounded-full border-custom-green-700'
              : ''
          }`}
        />
      </div>
      <button className="mt-5" onClick={handleConfirm}>
        선택
      </button>
    </form>
  );
}

export default Emotion;
