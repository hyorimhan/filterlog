import { existingMyEmotion, myEmotion } from '@/service/blog';
import Confirm from '@/utils/Confirm';
import useUserInfo from '@/zustand/useUserInfo';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function Emotion({ blog_id }: { blog_id: string }) {
  const user = useUserInfo((state) => state.user);
  const user_id = user?.id;
  const [selected, setSelected] = useState<string>();
  const { register } = useForm();
  const queryClient = useQueryClient();

  // 이미 등록된 감정이 있는지
  const { data: emotionData, isLoading } = useQuery({
    queryKey: ['emotionData', user_id],
    queryFn: () => existingMyEmotion({ user_id: user_id as string, blog_id }),
    enabled: !!user_id,
  });

  const mutation = useMutation({
    mutationFn: (emotion: string) =>
      myEmotion({ user_id: user_id as string, blog_id, emotion }),
    onSuccess: (data) => {
      queryClient.setQueryData(['emotionData', user_id], data.emotion);
      alert(data.message);
    },
  });

  if (isLoading) {
    return '로딩중';
  }

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selected) {
      return alert('감정을 선택해주세요');
    }
    Confirm({
      title: '내 오늘 기분은?',
      message: '정말 선택하시겠습니까? 선택시 수정 불가능합니다',
      onClick: () => mutation.mutate(selected),
    });
  };

  return (
    <div className="flex flex-col items-center rounded-lg  justify-center w-full h-[300px] bg-custom-green-300 ">
      <div className="text-lg mb-5">내 오늘 기분은?</div>
      {emotionData ? (
        <>
          <Image
            src={`/emotion/${emotionData.emotion}.svg`}
            alt={emotionData.emotion}
            width={100}
            height={100}
            onClick={() => setSelected(emotionData.emotion)}
            className={`cursor-pointer hover:brightness-110 `}
          />
          <div className="mt-3">{emotionData.emotion}</div>
        </>
      ) : (
        <form className="border-2 flex-col w-full h-[300px] flex justify-center items-center ">
          <div className="text-lg">내 오늘 기분은?</div>
          <div className="flex gap-5 mt-10">
            {['sad', 'angry', 'soso', 'smile', 'happy'].map((emotion) => (
              <div key={emotion}>
                <input
                  type="radio"
                  id={emotion}
                  value={emotion}
                  className="mr-2"
                  {...register('mood')}
                />
                <Image
                  src={`/emotion/${emotion}.svg`}
                  alt={emotion}
                  width={100}
                  height={100}
                  onClick={() => setSelected(emotion)}
                  className={`cursor-pointer hover:brightness-110 ${
                    selected === emotion
                      ? 'border-2 rounded-full border-custom-green-700'
                      : ''
                  }`}
                />
              </div>
            ))}
          </div>
          <button className="mt-5" onClick={handleConfirm}>
            선택
          </button>
        </form>
      )}
    </div>
  );
}

export default Emotion;
