'use client';
import React, { useState } from 'react';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import { useForm } from 'react-hook-form';
import useUserInfo from '@/zustand/useUserInfo';
import { blogParams } from '@/types/userBlog';
import { addComment, commentList, deleteComments } from '@/service/blog';
import { useQuery } from '@tanstack/react-query';
import Confirm from '@/utils/Confirm';

interface CommentFormData {
  content: string;
}

function Comment({ params }: blogParams) {
  const { register, handleSubmit, reset } = useForm<CommentFormData>();
  const { user, nickname } = useUserInfo();
  const post_id = params.id;
  const [commentRegister, setCommentRegister] = useState<boolean>(false);

  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments', post_id],
    queryFn: () => commentList(post_id),
  });

  if (isLoading) {
    return '로딩중';
  }

  const registerComment = async (data: CommentFormData) => {
    if (user?.id && nickname) {
      setCommentRegister(true);
      const response = await addComment({
        content: data.content,
        user_id: user?.id,
        nickname,
        post_id,
      });
      if (response) {
        alert(response.message);
        reset();
        setCommentRegister(false);
      }
    }
  };
  return (
    <div className="w-full text-center min-h-screen  mt-20">
      <div className="border-b text-sm ">
        <div>
          {comments?.map((comment) => (
            <div
              key={comment.id}
              className="border-y-2 h-auto mt-1 w-full  border-y-custom-green-600"
            >
              <div className=" flex h-24 flex-col items-start justify-center w-full  ">
                <span className="ml-auto  text-xs">
                  {comment.created_at.slice(0, 10)}
                </span>

                <div className="text-custom-green-700">
                  🍀{comment.nickname}
                </div>
                <div className="my-5 ml-5"> {comment.content}</div>
              </div>
              <div className="mb-1 gap-1 flex justify-end">
                <button>수정</button>
                <button
                  onClick={() => {
                    Confirm({
                      title: '댓글 삭제',
                      message: '정말 댓글을 삭제하시겠습니까?',
                      onClick: async () => {
                        try {
                          await deleteComments(comment.id);

                          alert('댓글이 삭제되었습니다');
                        } catch (error) {
                          alert('오류가 발생했습니다');
                        }
                      },
                    });
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Accordion>
        <AccordionItem header="댓글 작성" className="mt-5">
          <div className="border-y-2 h-40 mt-5  border-y-custom-green-600">
            <form onSubmit={handleSubmit(registerComment)} className="h-full">
              <input
                id="content"
                type="textarea"
                className="w-full h-full"
                autoFocus
                placeholder="댓글을 작성해주세요"
                {...register('content')}
              />
              <button
                type="submit"
                className="mt-5 "
                disabled={commentRegister}
              >
                등록
              </button>
            </form>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Comment;
